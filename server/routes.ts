import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-config.js";
import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import MemoryStore from "memorystore";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import express from "express";
import { db } from './db.js';
import { sql, eq } from 'drizzle-orm';
import { mentor_applications } from './src/db/schema';
import bcrypt from 'bcrypt';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создаем директорию для загрузки резюме
const uploadDir = path.join(process.cwd(), 'uploads/resumes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Настройка multer для загрузки резюме
const multerStorage = multer.diskStorage({
  destination: function (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, uploadDir);
  },
  filename: function (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const resumeUpload = multer({ 
  storage: multerStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

interface ColumnInfo {
  column_name: string;
  data_type: string;
  is_nullable: string;
  column_default: string | null;
}

// Replace raw SQL queries with sql template literals
const tableColumnsQuery = sql`
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns
        WHERE table_name = 'mentor_applications'
  ORDER BY ordinal_position
`;

const tableInfo = await db.execute(sql`
  SELECT column_name, data_type, is_nullable
  FROM information_schema.columns
  WHERE table_name = 'mentor_applications'
  ORDER BY ordinal_position
    `);
    
if (tableInfo.rows.length > 0) {
      console.log("Table mentor_applications exists, checking structure...");
      
  const mandatoryColumns = await db.select()
    .from(sql`information_schema.columns`)
    .where(sql`table_name = 'mentor_applications'
        AND is_nullable = 'NO'
        AND column_default IS NULL
        AND column_name != 'id'`) as ColumnInfo[];
      
  console.log("Mandatory columns without defaults:", mandatoryColumns);
      
  for (const col of mandatoryColumns) {
    try {
      const columnName = col.column_name;
      const dataType = col.data_type;
      
      if (!columnName) {
        console.error("Column name is undefined, skipping...");
        continue;
      }

      console.log(`Processing column: ${columnName} (${dataType})`);
          const defaultValue = getDefaultValueForColumn(columnName, dataType);
      
          if (defaultValue) {
        const alterQuery = sql`
          ALTER TABLE mentor_applications
          ALTER COLUMN ${sql.identifier(columnName)} 
          SET DEFAULT ${sql.raw(defaultValue)}
        `;
        console.log("Executing alter query:", alterQuery);
        await db.execute(alterQuery);
            console.log(`Added default value ${defaultValue} to column ${columnName}`);
          } else {
        const dropNotNullQuery = sql`
          ALTER TABLE mentor_applications
          ALTER COLUMN ${sql.identifier(columnName)} 
          DROP NOT NULL
        `;
        console.log("Executing drop not null query:", dropNotNullQuery);
        await db.execute(dropNotNullQuery);
            console.log(`Made column ${columnName} nullable`);
          }
        } catch (alterError) {
          console.error(`Error modifying column ${col.column_name}:`, alterError);
        }
      }
      
  const updatedStructure = await db.select()
    .from(sql`information_schema.columns`)
    .where(sql`table_name = 'mentor_applications'`)
    .orderBy(sql`ordinal_position`) as ColumnInfo[];
  console.log("Updated mentor_applications table structure:", updatedStructure);
    }

// Функция для определения дефолтных значений по типу колонки
function getDefaultValueForColumn(columnName: string, dataType: string): string | null {
  if (!columnName || !dataType) {
    return null;
  }

  switch (columnName) {
    case 'company':
      return "'Independent'";
    case 'specialization':
      return "'General'";
    case 'availability':
      return "'1-2'";
    case 'status':
      return "'pending'";
    case 'experience':
      return "'1-3'";
    case 'languages':
      return "ARRAY[]::text[]";
    case 'skills':
      return "ARRAY[]::text[]";
    case 'bio':
    case 'message':
    case 'motivation':
      return "''";
    default:
      if (dataType.includes('text')) {
        return "''";
      } else if (dataType.includes('int')) {
        return "0";
      } else if (dataType.includes('bool')) {
        return "false";
      } else if (dataType.includes('timestamp')) {
        return "CURRENT_TIMESTAMP";
      } else if (dataType.includes('date')) {
        return "CURRENT_DATE";
      }
      return null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const SessionStore = MemoryStore(session);
  
  // Define validation schemas
  const insertUserSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
    firstName: z.string().min(1),
    lastName: z.string().nullable().optional(),
    email: z.string().email(),
    profileImage: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    location: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
    linkedin: z.string().nullable().optional(),
    github: z.string().nullable().optional(),
    telegram: z.string().nullable().optional(),
    whatsapp: z.string().nullable().optional(),
    bio: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    position: z.string().nullable().optional(),
  });

  const insertArticleSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    summary: z.string().min(1),
    category: z.string().min(1),
    imageUrl: z.string().nullable().optional(),
    authorName: z.string().min(1),
    authorImage: z.string().nullable().optional(),
    readTime: z.string().nullable().optional(),
    publishDate: z.string().nullable().optional(),
  });

  const insertCertificateSchema = z.object({
    userId: z.number(),
    title: z.string().min(1),
    issuer: z.string().min(1),
    issueDate: z.string().min(1),
    certificateUrl: z.string().nullable().optional(),
    certificateFile: z.string().nullable().optional(),
  });

  const insertCourseSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    imageUrl: z.string().nullable().optional(),
    category: z.string().min(1),
    provider: z.string().min(1),
    isPartnerCourse: z.boolean().optional(),
    contactInfo: z.string().nullable().optional(),
    progress: z.number().min(0).max(100).optional(),
  });

  const insertEnrollmentSchema = z.object({
    userId: z.number(),
    courseId: z.number(),
    progress: z.number().min(0).max(100).optional(),
    completed: z.boolean().optional(),
  });

  const insertMentorSchema = z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    company: z.string().min(1),
    profileImage: z.string().nullable().optional(),
    skills: z.array(z.string()).optional(),
    contactInfo: z.string().nullable().optional(),
  });

  const insertOpportunitySchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    company: z.string().min(1),
    logoUrl: z.string().nullable().optional(),
    type: z.string().min(1),
    location: z.string().min(1),
    duration: z.string().nullable().optional(),
    deadline: z.string().nullable().optional(),
  });
  
  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        sameSite: 'lax',
        path: '/'
      },
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      name: 'sessionId'
    })
  );
  
  // Configure passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure passport local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
      try {
          const user = await storage.getUserByEmail(email);
        
        if (!user) {
            return done(null, false, { message: "Invalid email or password" });
        }
        
          const isValidPassword = await bcrypt.compare(password, user.password);
          
          if (!isValidPassword) {
            return done(null, false, { message: "Invalid email or password" });
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
      }
    )
  );
  
  // Serialize user to the session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  // Deserialize user from the session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
  // Middleware для проверки авторизации
  function isAuthenticated(req: Request, res: Response, next: any) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  }
  
  // Error handling for Zod validation
  function validateRequest(schema: any, body: any): any {
    try {
      return schema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        throw new Error(validationError.message);
      }
      throw error;
    }
  }
  
  // API routes
  // Auth routes
  app.post("/api/register", async (req, res) => {
    try {
      const userData = validateRequest(insertUserSchema, req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Create initial stats for user
      await storage.createUserStats({
        userId: user.id,
        coursesInProgress: 0,
        certificatesEarned: 0,
        mentorSessions: 0,
        opportunitiesSaved: 0
      });
      
      // Login the user after registration
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in after registration" });
        }
        return res.status(201).json({ user: { ...user, password: undefined } });
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Direct auth registration endpoint (no Firebase)
  app.post("/api/register/direct", async (req, res) => {
    try {
      const { email, username, password, firstName, lastName } = req.body;
      
      if (!email || !username || !password) {
        return res.status(400).json({ message: "Missing required authentication data" });
      }
      
      // Check if user already exists by email
      const existingEmail = await storage.getUserByEmail(email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
      
      // Check if username is taken
      const existingUsername = await storage.getUserByUsername(username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already taken" });
      }
      
      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      // Create a new user
      const userData = {
        username,
        email,
        firstName: firstName || username,
        lastName: lastName || null,
        password: hashedPassword,
        profileImage: null
      };
      
      const user = await storage.createUser(userData);
      
      // Create initial stats for user
      await storage.createUserStats({
        userId: user.id,
        coursesInProgress: 0,
        certificatesEarned: 0,
        mentorSessions: 0,
        opportunitiesSaved: 0
      });
      
      // Login the user
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in after registration" });
        }
        return res.status(201).json({ 
          user: { ...user, password: undefined },
          message: "Registration successful"
        });
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(400).json({ message: error.message });
    }
  });
  
  // Direct auth login endpoint (no Firebase)
  app.post("/api/login/direct", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      console.log("Login attempt for email:", email);
      
      if (!email || !password) {
        console.log("Missing email or password");
        return res.status(400).json({ message: "Missing email or password" });
      }
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        console.log("User not found for email:", email);
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Check password using bcrypt
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        console.log("Invalid password for email:", email);
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Login the user and create session
      req.login(user, (err) => {
        if (err) {
          console.error("Session creation error:", err);
          return res.status(500).json({ message: "Error creating session" });
        }
        
        // Return user data without sensitive information
        const safeUser = {
          ...user,
          password: undefined
        };
        
        console.log("Login successful for email:", email);
        return res.json({ 
          user: safeUser,
          message: "Login successful"
        });
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // If this function gets called, authentication was successful
    // req.user contains the authenticated user
    res.json({ user: { ...req.user, password: undefined } });
  });
  
  app.post("/api/logout", (req, res) => {
    if (!req.user) {
      return res.status(200).json({ message: "Already logged out" });
    }
    
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Error during logout" });
      }
      
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).json({ message: "Error clearing session" });
        }
        
        res.clearCookie('connect.sid');
        res.json({ message: "Logged out successfully" });
      });
    });
  });
  
  app.get("/api/user", isAuthenticated, (req, res) => {
    // Return user data without sensitive information
    const safeUser = {
      ...req.user,
      password: undefined
    };
    
    res.json({ user: safeUser });
  });
  
  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(Number(req.params.id));
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Course enrollment endpoint
  app.post("/api/courses/:id/enroll", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const courseId = Number(req.params.id);
      
      if (!userId || !courseId) {
        return res.status(400).json({ message: "Invalid user ID or course ID" });
      }

      // Проверяем существование курса
      const course = await storage.getCourse(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Проверяем существующую запись
      const existingEnrollment = await storage.getEnrollment(userId, courseId);
      if (existingEnrollment) {
        return res.status(400).json({ message: "Already enrolled in this course" });
      }
      
      // Создаем запись
      const enrollment = await storage.createEnrollment({
        userId,
        courseId,
        progress: 0,
        completed: false
      });
      
      // Обновляем статистику пользователя
      try {
        const stats = await storage.getUserStats(userId);
        if (stats) {
          await storage.updateUserStats(userId, {
            coursesInProgress: (stats.coursesInProgress || 0) + 1
          });
        }
      } catch (statsError) {
        console.error('Error updating user stats:', statsError);
        // Не прерываем процесс записи на курс из-за ошибки статистики
      }
      
      res.status(201).json(enrollment);
    } catch (error: any) {
      console.error('Error in course enrollment:', error);
      res.status(400).json({ message: error.message || "Failed to enroll in course" });
    }
  });
  
  app.post("/api/courses", isAuthenticated, async (req, res) => {
    try {
      const courseData = validateRequest(insertCourseSchema, req.body);
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.get("/api/user/courses", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const courses = await storage.getUserCourses(userId);
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Enrollment routes
  app.post("/api/enrollments", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const enrollmentData = validateRequest(insertEnrollmentSchema, {
        ...req.body,
        userId
      });
      
      // Check if already enrolled
      const existingEnrollment = await storage.getEnrollment(
        enrollmentData.userId, 
        enrollmentData.courseId
      );
      
      if (existingEnrollment) {
        return res.status(400).json({ message: "Already enrolled in this course" });
      }
      
      const enrollment = await storage.createEnrollment(enrollmentData);
      
      // Award "Course Explorer" achievement if this is the first enrollment
      try {
        const userCourses = await storage.getUserCourses(userId);
        
        if (userCourses.length === 1) {
          // This is the first course enrollment, award the achievement
          const courseExplorerAchievement = await storage.getAchievementByName("Course Explorer");
          
          if (courseExplorerAchievement) {
            // Check if user already has this achievement
            const userAchievement = await storage.getUserAchievementProgress(userId, courseExplorerAchievement.id);
            
            if (!userAchievement) {
              await storage.completeUserAchievement(userId, courseExplorerAchievement.id, 1);
            }
          }
        }
        
        // Update user stats
        const stats = await storage.getUserStats(userId);
        if (stats) {
          await storage.updateUserStats(userId, {
            coursesInProgress: (stats.coursesInProgress || 0) + 1
          });
        }
      } catch (achievementError) {
        console.error("Error awarding achievement:", achievementError);
        // Don't fail the enrollment if achievement awarding fails
      }
      
      res.status(201).json(enrollment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.patch("/api/enrollments/:courseId/progress", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const courseId = Number(req.params.courseId);
      const { progress } = req.body;
      
      if (typeof progress !== "number" || progress < 0 || progress > 100) {
        return res.status(400).json({ message: "Progress must be a number between 0 and 100" });
      }
      
      // Get current enrollment to check if this is a completion
      const existingEnrollment = await storage.getEnrollment(userId, courseId);
      const wasComplete = existingEnrollment && existingEnrollment.progress === 100;
      
      const updatedEnrollment = await storage.updateEnrollmentProgress(
        userId,
        courseId,
        progress
      );
      
      if (!updatedEnrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }
      
      // If this is a completion (progress = 100) and it wasn't complete before
      if (progress === 100 && !wasComplete) {
        try {
          // Award "Course Completion" achievement
          const courseCompletionAchievement = await storage.getAchievementByName("Course Completion");
          
          if (courseCompletionAchievement) {
            // Check if user already has this achievement
            const userAchievement = await storage.getUserAchievementProgress(userId, courseCompletionAchievement.id);
            
            if (!userAchievement) {
              await storage.completeUserAchievement(userId, courseCompletionAchievement.id, 1);
            }
          }
          
          // Update user stats
          const stats = await storage.getUserStats(userId);
          if (stats) {
            await storage.updateUserStats(userId, {
              coursesInProgress: Math.max(0, (stats.coursesInProgress || 0) - 1),
              certificatesEarned: (stats.certificatesEarned || 0) + 1
            });
            
            // Automatically create a certificate for completed course
            const course = await storage.getCourse(courseId);
            if (course) {
              await storage.createCertificate({
                userId,
                title: `Certificate of Completion: ${course.title}`,
                issuer: "Portfol.IO",
                issueDate: new Date().toISOString(),
                certificateUrl: null
              });
            }
          }
        } catch (achievementError) {
          console.error("Error handling course completion:", achievementError);
          // Don't fail the progress update if achievements/certificates fail
        }
      }
      
      res.json(updatedEnrollment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Opportunity routes
  app.get("/api/opportunities", async (req, res) => {
    try {
      const opportunities = await storage.getOpportunities();
      res.json(opportunities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/opportunities/:id", async (req, res) => {
    try {
      const opportunity = await storage.getOpportunity(Number(req.params.id));
      if (!opportunity) {
        return res.status(404).json({ message: "Opportunity not found" });
      }
      res.json(opportunity);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Opportunity application endpoint
  app.post("/api/opportunities/:id/apply", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const opportunityId = Number(req.params.id);
      
      // Check if opportunity exists
      const opportunity = await storage.getOpportunity(opportunityId);
      if (!opportunity) {
        return res.status(404).json({ message: "Opportunity not found" });
      }
      
      // In a real app, we would save the application to a database
      // For now, just return a success response
      
      // Update user stats
      const stats = await storage.getUserStats(userId);
      if (stats) {
        await storage.updateUserStats(userId, {
          opportunitiesSaved: (stats.opportunitiesSaved || 0) + 1
        });
      }
      
      res.status(200).json({ 
        message: `Successfully applied to opportunity: ${opportunity.title}`,
        success: true
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.post("/api/opportunities", isAuthenticated, async (req, res) => {
    try {
      const opportunityData = validateRequest(insertOpportunitySchema, req.body);
      const opportunity = await storage.createOpportunity(opportunityData);
      res.status(201).json(opportunity);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Mentor routes
  app.get("/api/mentors", async (req, res) => {
    try {
      const mentors = await storage.getMentors();
      res.json(mentors);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/mentors/:id", async (req, res) => {
    try {
      const mentor = await storage.getMentor(Number(req.params.id));
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      res.json(mentor);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Book mentor session endpoint
  app.post("/api/mentors/:id/book", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const mentorId = Number(req.params.id);
      
      // Check if mentor exists
      const mentor = await storage.getMentor(mentorId);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      
      // In a real app, we would save the booking to a database
      // For now, just return a success response
      
      // Update user stats
      const stats = await storage.getUserStats(userId);
      if (stats) {
        await storage.updateUserStats(userId, {
          mentorSessions: (stats.mentorSessions || 0) + 1
        });
      }
      
      res.status(200).json({ 
        message: `Successfully booked session with mentor: ${mentor.name || mentor.title}`,
        success: true
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.post("/api/mentors", isAuthenticated, async (req, res) => {
    try {
      const mentorData = validateRequest(insertMentorSchema, req.body);
      const mentor = await storage.createMentor(mentorData);
      res.status(201).json(mentor);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Article routes
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getArticles();
      res.json(articles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const article = await storage.getArticle(Number(req.params.id));
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/articles", isAuthenticated, async (req, res) => {
    try {
      const articleData = validateRequest(insertArticleSchema, req.body);
      const article = await storage.createArticle(articleData);
      res.status(201).json(article);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Certificate routes
  app.get("/api/certificates", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const certificates = await storage.getUserCertificates(userId);
      res.json(certificates);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.post("/api/certificates", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const certificateData = validateRequest(insertCertificateSchema, {
        ...req.body,
        userId
      });
      
      const certificate = await storage.createCertificate(certificateData);
      
      // Award "Portfolio Builder" achievement if this is the first certificate
      try {
        const userCertificates = await storage.getUserCertificates(userId);
        
        if (userCertificates.length === 1) {
          // This is the first certificate, award the achievement
          const portfolioBuilderAchievement = await storage.getAchievementByName("Portfolio Builder");
          
          if (portfolioBuilderAchievement) {
            // Check if user already has this achievement
            const userAchievement = await storage.getUserAchievementProgress(userId, portfolioBuilderAchievement.id);
            
            if (!userAchievement) {
              await storage.completeUserAchievement(userId, portfolioBuilderAchievement.id, 1);
            }
          }
        }
      } catch (achievementError) {
        console.error("Error awarding achievement:", achievementError);
        // Don't fail the certificate creation if achievement awarding fails
      }
      
      res.status(201).json(certificate);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Certificate file upload endpoint
  app.post("/api/upload-certificate", isAuthenticated, resumeUpload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Return the file URL
      const fileUrl = `/uploads/certificates/${req.file.filename}`;
      res.json({ fileUrl });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Serve uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  
  // Stats routes
  app.get("/api/stats", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const stats = await storage.getUserStats(userId);
      
      if (!stats) {
        // Create stats if they don't exist
        const newStats = await storage.createUserStats({
          userId,
          coursesInProgress: 0,
          certificatesEarned: 0,
          mentorSessions: 0,
          opportunitiesSaved: 0
        });
        
        return res.json(newStats);
      }
      
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Achievement routes
  app.get("/api/achievements", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/achievements/all", isAuthenticated, async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Badge routes
  app.get("/api/badges", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const badges = await storage.getUserBadges(userId);
      res.json(badges);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/badges/all", isAuthenticated, async (req, res) => {
    try {
      const badges = await storage.getBadges();
      res.json(badges);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Update badge display preference
  app.patch("/api/badges/:badgeId/display", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const badgeId = parseInt(req.params.badgeId);
      const { displayOnProfile } = req.body;
      
      if (typeof displayOnProfile !== 'boolean') {
        return res.status(400).json({ message: "displayOnProfile must be a boolean" });
      }
      
      const badge = await storage.updateUserBadgeDisplay(userId, badgeId, displayOnProfile);
      
      if (!badge) {
        return res.status(404).json({ message: "Badge not found" });
      }
      
      res.json(badge);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Contact request route
  app.post('/api/db/contact', async (req, res) => {
    const { name, email, phone, subject, message, status } = req.body;
    
    try {
      // You need to add this method to your storage class
      const contactRequest = await storage.createContactRequest({
        name,
        email, 
        phone,
        subject,
        message,
        status,
      });
      
      return res.status(201).json(contactRequest);
    } catch (error: any) {
      console.error('Error creating contact request:', error);
      return res.status(500).json({ message: 'Failed to submit contact request' });
    }
  });
  
  // Полностью переписанный обработчик подписки на бюллетень без зависимости от pool или storage
  app.post("/api/newsletter-subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      // Валидация email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
      }
      
      // Используем прямые SQL-запросы через db.execute, не используя ни pool, ни storage
      // Проверка существующего email
      const checkResult = await db.execute(
        sql`SELECT id FROM newsletter_subscriptions WHERE LOWER(email) = LOWER(${email}) LIMIT 1`
      );
      
      // Проверяем результат
      if (checkResult && checkResult.rows && checkResult.rows.length > 0) {
        return res.status(200).json({ message: "Email already subscribed" });
      }
      
      // Добавление нового email
      await db.execute(
        sql`INSERT INTO newsletter_subscriptions (email, subscription_date) 
            VALUES (${email}, ${new Date()})`
      );
      
      res.status(201).json({ message: "Successfully subscribed" });
    } catch (error: any) {
      // Добавим больше информации в лог для диагностики
      console.error("Newsletter subscription error details:", {
        message: error.message,
        stack: error.stack,
        error
      });
      res.status(500).json({ message: "Subscription failed. Please try again later." });
    }
  });
  
  // Add a new route to check newsletter subscriptions - place this after the newsletter-subscribe endpoint
  app.get("/api/check-subscriptions", async (req, res) => {
    try {
      console.log("Checking all newsletter subscriptions");
      
      // Get all subscriptions from the database
      const result = await db.execute(
        sql`SELECT * FROM newsletter_subscriptions ORDER BY subscription_date DESC LIMIT 50`
      );
      
      // Return the subscriptions
      res.status(200).json({ 
        count: result.rows.length,
        subscriptions: result.rows
      });
    } catch (error: any) {
      console.error("Error checking subscriptions:", error);
      res.status(500).json({ message: "Failed to check subscriptions", error: error.message });
    }
  });
  
  // Обработчик заявок на менторство с загрузкой файлов
  app.post("/api/become-mentor", (req, res, next) => {
    console.log("Received request to /api/become-mentor");
    console.log("Request body keys:", Object.keys(req.body));
    resumeUpload.single('resume')(req, res, (err) => {
      if (err) {
        console.error("File upload error:", err);
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ 
            message: "Application submission failed", 
            error: "File size limit exceeded. Maximum file size is 10MB."
          });
        }
        return res.status(400).json({ 
          message: "Application submission failed", 
          error: err.message
        });
      }
      next();
    });
  }, async (req, res) => {
    try {
      console.log("Processing form data in /api/become-mentor");
      console.log("Request body:", req.body);
      
      const { 
        email, 
        firstName, 
        lastName, 
        phone, 
        education: title, 
        experience, 
        languages, 
        skills, 
        message,
        motivation,
        company = 'Independent',
        specialization = 'General',
        availability = '1-2'
      } = req.body;
      
      // Validate required fields
      if (!email || !firstName || !lastName) {
        console.error("Missing required fields:", { email, firstName, lastName });
        return res.status(400).json({
          message: "Validation failed",
          error: "Email, firstName, and lastName are required fields"
        });
      }
      
      // Check for motivation field
      if (!motivation && !message) {
        console.error("Motivation field missing in request");
        return res.status(400).json({
          message: "Validation failed",
          error: "Motivation field is required"
        });
      }
      
      // Format arrays
      const languagesArray = languages ? (Array.isArray(languages) ? languages : [languages]) : [];
      const skillsArray = skills ? (typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : Array.isArray(skills) ? skills : [skills]) : [];
      
      // Get resume file info
      const resumeFile = req.file ? req.file.filename : null;
      
      try {
        // Insert using drizzle-orm
        const result = await db.insert(mentor_applications).values({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || null,
          title: title || null,
          company: company,
          specialization: specialization,
          availability: availability,
          experience: experience || '1-3',
          languages: languagesArray,
          skills: skillsArray,
          bio: message || '',
          message: message || '',
          motivation: motivation || message || '',
          resume_file: resumeFile,
          status: 'pending'
        }).returning();
        
        res.json({ 
          success: true, 
          id: result[0].id,
          message: "Mentor application successfully submitted" 
        });
        
    } catch (dbError) {
        console.error("Database error details:", dbError);
        res.status(500).json({ 
          message: "Application submission failed", 
          error: String((dbError as any).message || "Unknown error")
        });
      }
    } catch (error) {
      console.error("Error processing mentor application:", error);
      res.status(500).json({ 
        message: "Application submission failed", 
        error: String((error as any).message || "Unknown error")
      });
    }
  });
  
  // JSON API для заявок на менторство
  app.post("/api/become-mentor-json", async (req, res) => {
    try {
      console.log("Received request to /api/become-mentor-json");
      console.log("Request body keys:", Object.keys(req.body));
      
      // Получаем данные из тела запроса в формате JSON
      const { 
        email, 
        firstName, 
        lastName, 
        phone, 
        education, 
        experience, 
        languages, 
        skills, 
        bio,
        message,
        motivation,
        company = 'Independent',
        specialization = 'General',
        availability = '1-2'  // Добавляем availability с дефолтным значением
      } = req.body;
      
      console.log("JSON API mentor application data:", { 
        email, 
        firstName, 
        lastName, 
        company,
        specialization,
        availability,
        motivation,
      });
      
      // Проверим, есть ли обязательные поля
      if (!email || !firstName || !lastName) {
        return res.status(400).json({
          message: "Validation failed",
          error: "Required fields missing"
        });
      }
      
      // Check for motivation field
      if (!motivation && !message && !bio) {
        console.error("Motivation field missing in request");
        return res.status(400).json({
          message: "Validation failed",
          error: "Motivation field is required"
        });
      }
      
      // Modified array formatting function
      const formatPgArray = (input: string | string[] | undefined): string => {
        if (!input) return "ARRAY[]::text[]";
        
        let items: string[] = [];
        if (Array.isArray(input)) {
          items = input;
        } else if (typeof input === 'string') {
          items = [input];
        }
        
        // Format as ARRAY constructor with properly escaped strings
        const escapedItems = items.map(item => `'${item.replace(/'/g, "''")}'`);
        return `ARRAY[${escapedItems.join(",")}]::text[]`;
      };
      
      // Escape single quotes in text fields to prevent SQL injection
      const escapeSql = (text: string | undefined): string => {
        if (!text) return '';
        return text.replace(/'/g, "''");
      };
      
      const fullName = escapeSql(`${firstName} ${lastName}`);
      const emailEscaped = escapeSql(email);
      const phoneEscaped = escapeSql(phone || '');
      const educationEscaped = escapeSql(education || '');
      const experienceEscaped = escapeSql(experience || '');
      const bioEscaped = escapeSql(bio || '');
      const motivationEscaped = escapeSql(motivation || message || bio || '');
      const companyEscaped = escapeSql(company) || 'Independent';
      const specializationEscaped = escapeSql(specialization) || 'General';
      
      // Format arrays properly
      const languagesFormatted = formatPgArray(languages);
      const skillsFormatted = formatPgArray(skills);
      
      // Сначала проверим структуру таблицы
      const tableColumnsQuery = sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_name = 'mentor_applications'
        ORDER BY ordinal_position
      `;
      const tableColumns = await db.execute(tableColumnsQuery);
      
      console.log("Table columns for JSON API:", tableColumns.rows);
      
      // Replace dynamic query construction with parameterized queries
      const insertQuery = sql`
        INSERT INTO mentor_applications 
        (first_name, last_name, email, phone, title, experience, languages, skills, bio, 
         company, specialization, motivation, availability) 
        VALUES (
          ${escapeSql(firstName)}, 
          ${escapeSql(lastName)}, 
          ${emailEscaped}, 
          ${phoneEscaped}, 
          ${educationEscaped}, 
          ${experienceEscaped}, 
          ${sql.raw(languagesFormatted)}, 
          ${sql.raw(skillsFormatted)}, 
          ${bioEscaped},
          ${companyEscaped},
          ${specializationEscaped},
          ${motivationEscaped},
          ${escapeSql(req.body.availability || '1-2')}
        ) 
        RETURNING id
      `;
      
      console.log("Executing JSON API query:", insertQuery);
      
      const result = await db.execute(insertQuery);
      
      res.json({ 
        success: true, 
        id: result.rows[0].id,
        message: "Mentor application successfully submitted" 
      });
    } catch (dbError) {
      console.error("Database error in JSON API:", dbError);
      res.status(500).json({ 
        message: "Application submission failed", 
        error: String((dbError as any).message || "Unknown error")
      });
    }
  });
  
  // Profile routes
  app.get("/api/profile/:userId", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Skills routes
  app.get("/api/profile/:userId/skills", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const skills = await storage.getUserSkills(userId);
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/profile/:userId/skills", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const skill = { ...req.body, userId };
      const result = await storage.createUserSkill(skill);
      res.json(result);
    } catch (error) {
      console.error("Error creating skill:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/profile/skills/:skillId", isAuthenticated, async (req, res) => {
    try {
      const skillId = parseInt(req.params.skillId);
      const result = await storage.updateUserSkill(skillId, req.body);
      if (!result) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error updating skill:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/profile/skills/:skillId", isAuthenticated, async (req, res) => {
    try {
      const skillId = parseInt(req.params.skillId);
      await storage.deleteUserSkill(skillId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Education routes
  app.get("/api/profile/:userId/education", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const education = await storage.getUserEducation(userId);
      res.json(education);
    } catch (error) {
      console.error("Error fetching education:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/profile/:userId/education", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const education = { ...req.body, userId };
      const result = await storage.createUserEducation(education);
      res.json(result);
    } catch (error) {
      console.error("Error creating education:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/profile/education/:educationId", isAuthenticated, async (req, res) => {
    try {
      const educationId = parseInt(req.params.educationId);
      const result = await storage.updateUserEducation(educationId, req.body);
      if (!result) {
        return res.status(404).json({ error: "Education not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error updating education:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/profile/education/:educationId", isAuthenticated, async (req, res) => {
    try {
      const educationId = parseInt(req.params.educationId);
      await storage.deleteUserEducation(educationId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting education:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Languages routes
  app.get("/api/profile/:userId/languages", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const languages = await storage.getUserLanguages(userId);
      res.json(languages);
    } catch (error) {
      console.error("Error fetching languages:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/profile/:userId/languages", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const language = { ...req.body, userId };
      const result = await storage.createUserLanguage(language);
      res.json(result);
    } catch (error) {
      console.error("Error creating language:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/profile/languages/:languageId", isAuthenticated, async (req, res) => {
    try {
      const languageId = parseInt(req.params.languageId);
      const result = await storage.updateUserLanguage(languageId, req.body);
      if (!result) {
        return res.status(404).json({ error: "Language not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error updating language:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/profile/languages/:languageId", isAuthenticated, async (req, res) => {
    try {
      const languageId = parseInt(req.params.languageId);
      await storage.deleteUserLanguage(languageId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting language:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Projects routes
  app.get("/api/profile/:userId/projects", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const projects = await storage.getUserProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/profile/:userId/projects", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const project = { ...req.body, userId };
      const result = await storage.createUserProject(project);
      res.json(result);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/profile/projects/:projectId", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const result = await storage.updateUserProject(projectId, req.body);
      if (!result) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/profile/projects/:projectId", isAuthenticated, async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      await storage.deleteUserProject(projectId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
