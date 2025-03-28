import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertCourseSchema, 
  insertEnrollmentSchema,
  insertOpportunitySchema,
  insertMentorSchema,
  insertArticleSchema,
  insertCertificateSchema,
  insertStatsSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import MemoryStore from "memorystore";

export async function registerRoutes(app: Express): Promise<Server> {
  const SessionStore = MemoryStore(session);
  
  // Configure session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "portfol-io-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
      store: new SessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );
  
  // Configure passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure passport local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        
        if (user.password !== password) { // In production, use bcrypt or similar for password hashing
          return done(null, false, { message: "Incorrect password" });
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
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
  
  // Authentication middleware
  function isAuthenticated(req: Request, res: Response, next: Function) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  }
  
  // Error handling for Zod validation
  function validateRequest(schema: any, body: any) {
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
      
      // Create a new user
      const userData = {
        username,
        email,
        firstName: firstName || username,
        lastName: lastName || null,
        password, // In production, hash this password
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
        return res.status(201).json({ user: { ...user, password: undefined } });
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Direct auth login endpoint (no Firebase)
  app.post("/api/login/direct", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
      }
      
      // Find user by email
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        return res.status(404).json({ message: "User not found. Please register first." });
      }
      
      // Check password
      if (user.password !== password) { // In production, use proper password comparison
        return res.status(401).json({ message: "Invalid password" });
      }
      
      // Login the user
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in" });
        }
        return res.json({ user: { ...user, password: undefined } });
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // If this function gets called, authentication was successful
    // req.user contains the authenticated user
    res.json({ user: { ...req.user, password: undefined } });
  });
  
  app.post("/api/logout", (req, res) => {
    req.logout(() => {
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
  
  app.get("/api/user", isAuthenticated, (req, res) => {
    // Return the current authenticated user
    res.json({ user: { ...req.user, password: undefined } });
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
      
      // Check if already enrolled
      const existingEnrollment = await storage.getEnrollment(userId, courseId);
      
      if (existingEnrollment) {
        return res.status(400).json({ message: "Already enrolled in this course" });
      }
      
      // Create enrollment
      const enrollment = await storage.createEnrollment({
        userId,
        courseId,
        progress: 0,
        completed: false
      });
      
      // Update user stats
      const stats = await storage.getUserStats(userId);
      if (stats) {
        await storage.updateUserStats(userId, {
          coursesInProgress: (stats.coursesInProgress || 0) + 1
        });
      }
      
      res.status(201).json(enrollment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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
      
      // If course is now complete (100%) and wasn't before
      if (progress === 100 && !wasComplete) {
        try {
          // Award Knowledge Seeker achievement for first course completion
          const userCourses = await storage.getUserCourses(userId);
          const completedCourses = [];
          
          for (const course of userCourses) {
            const enrollment = await storage.getEnrollment(userId, course.id);
            if (enrollment && enrollment.progress === 100) {
              completedCourses.push(course);
            }
          }
          
          // If this is the first completed course
          if (completedCourses.length === 1) {
            const knowledgeSeekerAchievement = await storage.getAchievementByName("Knowledge Seeker");
            
            if (knowledgeSeekerAchievement) {
              const userAchievement = await storage.getUserAchievementProgress(userId, knowledgeSeekerAchievement.id);
              
              if (!userAchievement) {
                await storage.completeUserAchievement(userId, knowledgeSeekerAchievement.id, 1);
              }
            }
          }
          
          // Check if user qualified for Learning Enthusiast (5 courses)
          if (completedCourses.length === 5) {
            const learningEnthusiastAchievement = await storage.getAchievementByName("Learning Enthusiast");
            
            if (learningEnthusiastAchievement) {
              const userAchievement = await storage.getUserAchievementProgress(userId, learningEnthusiastAchievement.id);
              
              if (!userAchievement) {
                await storage.completeUserAchievement(userId, learningEnthusiastAchievement.id, 5);
              }
            }
          }
          
          // Update user stats - decrease coursesInProgress, potentially increase certificatesEarned
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
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
