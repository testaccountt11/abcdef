import { 
  User, InsertUser, 
  Course, InsertCourse, 
  Enrollment, InsertEnrollment, 
  Opportunity, InsertOpportunity, 
  Mentor, InsertMentor, 
  Article, InsertArticle, 
  Certificate, InsertCertificate, 
  Stats, InsertStats,
  Achievement, InsertAchievement,
  UserAchievement, InsertUserAchievement,
  Badge, InsertBadge,
  UserBadge, InsertUserBadge,
  UserSkill, InsertUserSkill,
  UserEducation, InsertUserEducation,
  UserLanguage, InsertUserLanguage,
  UserProject, InsertUserProject,
  insertContactRequestSchema,
  ContactRequest,
  InsertContactRequest,
  NewsletterSubscription,
  InsertNewsletterSubscription,
  mentorApplications,
  InsertMentorApplication,
  MentorApplication,
  newsletterSubscriptions
} from "@shared/schema";
import { IStorage } from "./storage";
import { eq, and, sql } from "drizzle-orm";
import { db, pool } from "./db.js";
import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import type { AnyPgColumn, PgTableWithColumns } from "drizzle-orm/pg-core";

// Define table types
const IsDrizzleTable = Symbol.for('IsDrizzleTable');
type DrizzleTable<T> = T & { [key: symbol]: true };

// Add [IsDrizzleTable] symbol to all tables
const addIsDrizzleTable = <T extends PgTableWithColumns<any>>(table: T): T => {
  (table as any)[Symbol.for('IsDrizzleTable')] = true;
  return table;
};

// Define table schemas
const usersTable = addIsDrizzleTable(pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email").notNull(),
  profileImage: text("profile_image")
}));

const newsletterSubscriptionsTable = addIsDrizzleTable(pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  subscriptionDate: timestamp("subscription_date").notNull()
}));

const coursesTable = addIsDrizzleTable(pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  provider: text("provider").notNull(),
  isPartnerCourse: boolean("is_partner_course"),
  contactInfo: text("contact_info")
}));

const enrollmentsTable = addIsDrizzleTable(pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  progress: integer("progress").notNull(),
  completed: boolean("completed").notNull().default(false)
}));

const opportunitiesTable = addIsDrizzleTable(pgTable("opportunities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration"),
  type: text("type").notNull(),
  company: text("company").notNull(),
  logoUrl: text("logo_url"),
  location: text("location").notNull(),
  deadline: text("deadline")
}));

const mentorsTable = addIsDrizzleTable(pgTable("mentors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  contactInfo: text("contact_info"),
  profileImage: text("profile_image"),
  company: text("company").notNull(),
  skills: text("skills").array()
}));

const articlesTable = addIsDrizzleTable(pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  authorName: text("author_name").notNull(),
  authorImage: text("author_image"),
  readTime: text("read_time"),
  publishDate: text("publish_date")
}));

const certificatesTable = addIsDrizzleTable(pgTable("certificates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userId: integer("user_id").notNull(),
  issuer: text("issuer").notNull(),
  issueDate: text("issue_date").notNull(),
  certificateUrl: text("certificate_url"),
  certificateFile: text("certificate_file"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
}));

const statsTable = addIsDrizzleTable(pgTable("stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  coursesInProgress: integer("courses_in_progress"),
  certificatesEarned: integer("certificates_earned"),
  mentorSessions: integer("mentor_sessions"),
  opportunitiesSaved: integer("opportunities_saved")
}));

const achievementsTable = addIsDrizzleTable(pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  iconUrl: text("icon_url").notNull(),
  requirement: text("requirement").notNull(),
  requiredValue: integer("required_value"),
  points: integer("points"),
  isHidden: boolean("is_hidden"),
  createdAt: timestamp("created_at")
}));

const userAchievementsTable = addIsDrizzleTable(pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  progress: integer("progress").notNull(),
  completedValue: integer("completed_value"),
  completedAt: timestamp("completed_at")
}));

const badgesTable = addIsDrizzleTable(pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  iconUrl: text("icon_url").notNull(),
  level: integer("level"),
  requiredPoints: integer("required_points"),
  isRare: boolean("is_rare"),
  createdAt: timestamp("created_at")
}));

// Define table types
interface UserBadgeTable {
  id: number;
  userId: number;
  badgeId: number;
  earnedAt: Date | null;
  displayOnProfile: boolean;
}

interface ContactRequestTable {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string | null;
  status: string;
  createdAt: Date;
}

interface MentorApplicationTable {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  skills: string;
  bio: string;
  availability: string;
  mentorship_goals: string;
  experience: string;
  expertise: string;
  languages: string[];
  specialization: string[];
  motivation: string;
  preferred_students: string | null;
  additional_info: string | null;
  linkedin_profile: string | null;
  resume_url: string | null;
  status: string;
  created_at: Date;
}

// Update table definitions
const userBadgesTable = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  badgeId: integer("badge_id").notNull(),
  earnedAt: timestamp("earned_at"),
  displayOnProfile: boolean("display_on_profile").default(true)
}) satisfies PgTableWithColumns<any>;

const contactRequestsTable = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  phone: text("phone"),
  status: text("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow().notNull()
}) satisfies PgTableWithColumns<any>;

const mentorApplicationsTable = pgTable("mentor_applications", {
  id: serial("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  skills: text("skills").notNull(),
  bio: text("bio").notNull(),
  availability: text("availability").notNull(),
  mentorship_goals: text("mentorship_goals").notNull(),
  experience: text("experience").notNull(),
  expertise: text("expertise").notNull(),
  languages: text("languages").array().notNull(),
  specialization: text("specialization").array().notNull(),
  motivation: text("motivation").notNull(),
  preferred_students: text("preferred_students"),
  additional_info: text("additional_info"),
  linkedin_profile: text("linkedin_profile"),
  resume_url: text("resume_url"),
  status: text("status").notNull().default('pending'),
  created_at: timestamp("created_at").defaultNow().notNull()
});

// Add new table definitions
const userSkillsTable = addIsDrizzleTable(pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  level: integer("level").notNull(),
  yearsOfExperience: integer("years_of_experience"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}));

const userEducationTable = addIsDrizzleTable(pgTable("user_education", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  fieldOfStudy: text("field_of_study").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isPresent: boolean("is_present").default(false),
  gpa: text("gpa"),
  activities: text("activities"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}));

const userLanguagesTable = addIsDrizzleTable(pgTable("user_languages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  level: text("level").notNull(),
  certificate: text("certificate"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}));

const userProjectsTable = addIsDrizzleTable(pgTable("user_projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  projectUrl: text("project_url"),
  githubUrl: text("github_url"),
  technologies: text("technologies").array(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isPresent: boolean("is_present").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}));

// Helper function to convert comma-separated string to array
function stringToArray(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

// Add retry wrapper function
async function withRetry<T>(operation: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      if (error.code === 'ECONNRESET' || error.code === 'ETIMEDOUT') {
        console.error(`Database operation failed (attempt ${i + 1}/${retries}):`, error.message);
        if (i < retries - 1) {
          console.log(`Retrying in ${delay/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }
      throw error;
    }
  }
  throw new Error('Operation failed after all retries');
}

// Add at the top of the file
const VALID_LANGUAGE_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"] as const;
type LanguageLevel = typeof VALID_LANGUAGE_LEVELS[number];

function isValidLanguageLevel(level: string): level is LanguageLevel {
  return VALID_LANGUAGE_LEVELS.includes(level as LanguageLevel);
}

export class PgStorage implements IStorage {
  createCourse(course: InsertCourse): Promise<Course> {
    throw new Error("Method not implemented.");
  }
  async getUserCourses(userId: number): Promise<Course[]> {
    try {
      const result = await db
        .select({
          id: coursesTable.id,
          title: coursesTable.title,
          description: coursesTable.description,
          imageUrl: coursesTable.imageUrl,
          category: coursesTable.category,
          provider: coursesTable.provider,
          isPartnerCourse: coursesTable.isPartnerCourse,
          contactInfo: coursesTable.contactInfo,
          progress: enrollmentsTable.progress,
          completed: enrollmentsTable.completed
        })
        .from(coursesTable)
        .innerJoin(
          enrollmentsTable,
          eq(coursesTable.id, enrollmentsTable.courseId)
        )
        .where(eq(enrollmentsTable.userId, userId));

      return result.map(row => ({
        ...row,
        progress: row.progress || 0
      }));
    } catch (error) {
      console.error('Error in getUserCourses:', error);
      return [];
    }
  }
  getUserAchievementProgress(userId: number, achievementId: number): Promise<UserAchievement | undefined> {
    throw new Error("Method not implemented.");
  }
  createUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement> {
    throw new Error("Method not implemented.");
  }
  updateUserAchievementProgress(userId: number, achievementId: number, progress: number): Promise<UserAchievement | undefined> {
    throw new Error("Method not implemented.");
  }
  completeUserAchievement(userId: number, achievementId: number, completedValue: number): Promise<UserAchievement | undefined> {
    throw new Error("Method not implemented.");
  }
  getBadges(): Promise<Badge[]> {
    throw new Error("Method not implemented.");
  }
  getBadge(id: number): Promise<Badge | undefined> {
    throw new Error("Method not implemented.");
  }
  getBadgeByName(name: string): Promise<Badge | undefined> {
    throw new Error("Method not implemented.");
  }
  createBadge(badge: InsertBadge): Promise<Badge> {
    throw new Error("Method not implemented.");
  }
  getUserBadges(userId: number): Promise<(UserBadge & { badge: Badge; })[]> {
    throw new Error("Method not implemented.");
  }
  awardBadgeToUser(userId: number, badgeId: number): Promise<UserBadge> {
    throw new Error("Method not implemented.");
  }
  updateUserBadgeDisplay(userId: number, badgeId: number, displayOnProfile: boolean): Promise<UserBadge | undefined> {
    throw new Error("Method not implemented.");
  }
  checkAndAwardBadges(userId: number): Promise<Badge[]> {
    throw new Error("Method not implemented.");
  }
  [x: string]: any;

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    try {
      const result = await db.insert(newsletterSubscriptionsTable).values(subscription).returning();
      return result[0] as NewsletterSubscription;
    } catch (error) {
      console.error("Error creating newsletter subscription:", error);
      throw error;
    }
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | null> {
    try {
      const result = await db
        .select()
        .from(newsletterSubscriptionsTable)
        .where(eq(newsletterSubscriptionsTable.email, email))
        .limit(1);
      return (result[0] as NewsletterSubscription) || null;
    } catch (error) {
      console.error("Error getting newsletter subscription:", error);
      return null;
    }
  }

  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    try {
      const result = await db.select().from(newsletterSubscriptionsTable);
      return result as NewsletterSubscription[];
    } catch (error) {
      console.error("Error getting all newsletter subscriptions:", error);
      return [];
    }
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select({
      id: usersTable.id,
      username: usersTable.username,
      password: usersTable.password,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      profileImage: usersTable.profileImage,
      phone: sql`NULL`.as<string | null>(),  // Add the missing phone field
      company: sql`NULL`.as<string | null>(),
      location: sql`NULL`.as<string | null>(),
      website: sql`NULL`.as<string | null>(),
      linkedin: sql`NULL`.as<string | null>(),
      github: sql`NULL`.as<string | null>(),
      telegram: sql`NULL`.as<string | null>(),
      whatsapp: sql`NULL`.as<string | null>(),
      bio: sql`NULL`.as<string | null>(),
      position: sql`NULL`.as<string | null>(),
      createdAt: sql`CURRENT_TIMESTAMP`.as<Date>(),
      updatedAt: sql`CURRENT_TIMESTAMP`.as<Date>()
    })
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await withRetry(async () => {
      const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username))
        .limit(1);
      return result[0] as User;
    });
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await withRetry(async () => {
      const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);
      return result[0] as User;
    });
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(usersTable).values(user).returning();
    return result[0] as User;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id))
      .returning();
    return result[0] as User;
  }
  
  // Courses
  async getCourse(id: number): Promise<Course | undefined> {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, id))
      .limit(1);
    return result[0] as Course;
  }

  async getCourses(): Promise<Course[]> {
    const result = await db.select().from(coursesTable);
    return result as Course[];
  }

  async getEnrolledCourses(userId: number): Promise<Course[]> {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollmentsTable, eq(coursesTable.id, enrollmentsTable.courseId))
      .where(eq(enrollmentsTable.userId, userId));
    return result.map(row => ({
      ...row.courses,
      progress: row.enrollments.progress
    })) as Course[];
  }
  
  // Enrollments
  async getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined> {
    const result = await db
      .select()
      .from(enrollmentsTable)
      .where(
        and(
          eq(enrollmentsTable.userId, userId),
          eq(enrollmentsTable.courseId, courseId)
        )
      )
      .limit(1);
    
    return result[0];
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    try {
      // Проверяем существующую запись
      const existing = await db
        .select()
        .from(enrollmentsTable)
        .where(
          and(
            eq(enrollmentsTable.userId, enrollment.userId),
            eq(enrollmentsTable.courseId, enrollment.courseId)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        throw new Error('Already enrolled in this course');
      }

      const result = await db.insert(enrollmentsTable).values({
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        progress: 0,
        completed: false
      }).returning();

      if (!result.length) {
        throw new Error('Failed to create enrollment');
      }

      return result[0] as Enrollment;
    } catch (error) {
      console.error('Error in createEnrollment:', error);
      throw error;
    }
  }

  async updateEnrollmentProgress(userId: number, courseId: number, progress: number): Promise<Enrollment | undefined> {
    const result = await db
      .update(enrollmentsTable)
      .set({ progress })
      .where(
        and(
          eq(enrollmentsTable.userId, userId),
          eq(enrollmentsTable.courseId, courseId)
        )
      )
      .returning({
        id: enrollmentsTable.id,
        userId: enrollmentsTable.userId,
        courseId: enrollmentsTable.courseId,
        progress: enrollmentsTable.progress,
        completed: enrollmentsTable.completed
      });
    
    if (!result.length) {
      return undefined;
    }
    
    return result[0] as Enrollment;
  }
  
  // Opportunities
  async getOpportunities(): Promise<Opportunity[]> {
    const result = await db
      .select({
        id: opportunitiesTable.id,
        title: opportunitiesTable.title,
        description: opportunitiesTable.description,
        duration: opportunitiesTable.duration,
        type: opportunitiesTable.type,
        company: opportunitiesTable.company,
        logoUrl: opportunitiesTable.logoUrl,
        location: opportunitiesTable.location,
        deadline: opportunitiesTable.deadline
      })
      .from(opportunitiesTable as any);
    return result.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      duration: row.duration,
      type: row.type,
      company: row.company,
      logoUrl: row.logoUrl,
      location: row.location,
      deadline: row.deadline
    }));
  }

  async getOpportunity(id: number): Promise<Opportunity | undefined> {
    const result = await db
      .select({
        id: opportunitiesTable.id,
        title: opportunitiesTable.title,
        description: opportunitiesTable.description,
        duration: opportunitiesTable.duration,
        type: opportunitiesTable.type,
        company: opportunitiesTable.company,
        logoUrl: opportunitiesTable.logoUrl,
        location: opportunitiesTable.location,
        deadline: opportunitiesTable.deadline
      })
      .from(opportunitiesTable as any)
      .where(eq(opportunitiesTable.id as any, id))
      .limit(1);
    return result[0] ? {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      duration: result[0].duration,
      type: result[0].type,
      company: result[0].company,
      logoUrl: result[0].logoUrl,
      location: result[0].location,
      deadline: result[0].deadline
    } : undefined;
  }

  async createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity> {
    const result = await db.insert(opportunitiesTable as any).values({
      title: opportunity.title,
      description: opportunity.description,
      duration: opportunity.duration,
      type: opportunity.type,
      company: opportunity.company,
      logoUrl: opportunity.logoUrl,
      location: opportunity.location,
      deadline: opportunity.deadline
    }).returning({
      id: opportunitiesTable.id,
      title: opportunitiesTable.title,
      description: opportunitiesTable.description,
      duration: opportunitiesTable.duration,
      type: opportunitiesTable.type,
      company: opportunitiesTable.company,
      logoUrl: opportunitiesTable.logoUrl,
      location: opportunitiesTable.location,
      deadline: opportunitiesTable.deadline
    });

    if (!result.length) {
      throw new Error('Failed to create opportunity');
    }

    return result[0];
  }
  
  // Mentors
  async getMentors(): Promise<Mentor[]> {
    const result = await db.select().from(mentorsTable);
    return result as Mentor[];
  }

  async getMentor(id: number): Promise<Mentor | undefined> {
    const result = await db
      .select()
      .from(mentorsTable)
      .where(eq(mentorsTable.id, id))
      .limit(1);
    return result[0] as Mentor;
  }

  async createMentor(mentor: InsertMentor): Promise<Mentor> {
    const result = await db.insert(mentorsTable).values(mentor).returning();
    return result[0] as Mentor;
  }
  
  // Articles
  async getArticles(): Promise<Article[]> {
    const result = await db.select().from(articlesTable);
    return result as Article[];
  }

  async getArticle(id: number): Promise<Article | undefined> {
    const result = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.id, id))
      .limit(1);
    return result[0] as Article;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const result = await db.insert(articlesTable).values(article).returning();
    return result[0] as Article;
  }
  
  // Certificates
  async getUserCertificates(userId: number): Promise<Certificate[]> {
    const result = await db
      .select()
      .from(certificatesTable)
      .where(eq(certificatesTable.userId, userId));
    return result as Certificate[];
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    const result = await db
      .select()
      .from(certificatesTable)
      .where(eq(certificatesTable.id, id))
      .limit(1);
    return result[0] as Certificate;
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const result = await db.insert(certificatesTable).values(certificate).returning();
    return result[0] as Certificate;
  }
  
  // Stats
  async getUserStats(userId: number): Promise<Stats | undefined> {
    const result = await db
      .select({
        id: statsTable.id,
        userId: statsTable.userId,
        coursesInProgress: statsTable.coursesInProgress,
        certificatesEarned: statsTable.certificatesEarned,
        mentorSessions: statsTable.mentorSessions,
        opportunitiesSaved: statsTable.opportunitiesSaved
      })
      .from(statsTable)
      .where(eq(statsTable.userId, userId))
      .limit(1);
    return result[0] as Stats;
  }

  async createUserStats(userStats: InsertStats): Promise<Stats> {
    const result = await db.insert(statsTable).values({
      userId: userStats.userId,
      coursesInProgress: userStats.coursesInProgress || 0,
      certificatesEarned: userStats.certificatesEarned || 0,
      mentorSessions: userStats.mentorSessions || 0,
      opportunitiesSaved: userStats.opportunitiesSaved || 0
    }).returning();
    return result[0] as Stats;
  }

  async updateUserStats(userId: number, userStats: Partial<InsertStats>): Promise<Stats | undefined> {
    const result = await db
      .update(statsTable)
      .set({
        ...userStats,
        userId
      })
      .where(eq(statsTable.userId, userId))
      .returning();
    
    return result[0] as Stats;
  }
  
  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    const result = await db
      .select({
        id: achievementsTable.id,
        name: achievementsTable.name,
        description: achievementsTable.description,
        category: achievementsTable.category,
        iconUrl: achievementsTable.iconUrl,
        requirement: achievementsTable.requirement,
        requiredValue: achievementsTable.requiredValue,
        points: achievementsTable.points,
        isHidden: achievementsTable.isHidden,
        createdAt: achievementsTable.createdAt
      })
      .from(achievementsTable);
    return result as Achievement[];
  }
  
  async getAchievement(id: number): Promise<Achievement | undefined> {
    const result = await db
      .select({
        id: achievementsTable.id,
        name: achievementsTable.name,
        description: achievementsTable.description,
        category: achievementsTable.category,
        iconUrl: achievementsTable.iconUrl,
        requirement: achievementsTable.requirement,
        requiredValue: achievementsTable.requiredValue,
        points: achievementsTable.points,
        isHidden: achievementsTable.isHidden,
        createdAt: achievementsTable.createdAt
      })
      .from(achievementsTable)
      .where(eq(achievementsTable.id, id))
      .limit(1);
    return result[0] as Achievement;
  }
  
  async getAchievementByName(name: string): Promise<Achievement | undefined> {
    const result = await db.select().from(achievementsTable).where(eq(achievementsTable.name, name)).limit(1);
    return result[0];
  }
  
  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const result = await db.insert(achievementsTable).values({
      name: achievement.name,
      description: achievement.description,
      category: achievement.category,
      iconUrl: achievement.iconUrl,
      requirement: achievement.requirement,
      requiredValue: achievement.requiredValue,
      points: achievement.points,
      isHidden: achievement.isHidden,
      createdAt: new Date()
    }).returning();
    return result[0] as Achievement;
  }
  
  async getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]> {
    const result = await db
      .select({
        id: userAchievementsTable.id,
        userId: userAchievementsTable.userId,
        achievementId: userAchievementsTable.achievementId,
        progress: userAchievementsTable.progress,
        completedValue: userAchievementsTable.completedValue,
        completedAt: userAchievementsTable.completedAt,
        achievement: {
          id: achievementsTable.id,
          name: achievementsTable.name,
          description: achievementsTable.description,
          category: achievementsTable.category,
          iconUrl: achievementsTable.iconUrl,
          requirement: achievementsTable.requirement,
          requiredValue: achievementsTable.requiredValue,
          points: achievementsTable.points,
          isHidden: achievementsTable.isHidden,
          createdAt: achievementsTable.createdAt
        }
      })
      .from(userAchievementsTable)
      .leftJoin(
        achievementsTable,
        eq(userAchievementsTable.achievementId, achievementsTable.id)
      )
      .where(eq(userAchievementsTable.userId, userId));

    return result.map(row => {
      if (!row.achievement) {
        throw new Error(`Achievement not found for user achievement ID ${row.id}`);
      }
      return {
        id: row.id,
        userId: row.userId,
        achievementId: row.achievementId,
        progress: row.progress,
        completedValue: row.completedValue,
        completedAt: row.completedAt,
        achievement: row.achievement
      };
    });
  }

  async createUserLanguage(language: InsertUserLanguage): Promise<UserLanguage> {
    const validLevels = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"] as const;
    if (!validLevels.includes(language.level as any)) {
      throw new Error(`Invalid language level: ${language.level}. Must be one of: ${validLevels.join(', ')}`);
    }

    const result = await db.insert(userLanguagesTable).values({
      userId: language.userId,
      name: language.name,
      level: language.level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native",
      certificate: language.certificate || null,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();

    if (!result.length) {
      throw new Error('Failed to create user language');
    }

    const row = result[0];
    if (!isValidLanguageLevel(row.level)) {
      throw new Error(`Invalid language level: ${row.level}`);
    }

    return {
      id: row.id,
      userId: row.userId,
      name: row.name,
      level: row.level,
      certificate: row.certificate,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }

  async updateUserLanguage(id: number, language: Partial<InsertUserLanguage>): Promise<UserLanguage | undefined> {
    if (language.level) {
      language.level = language.level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
    }
    const result = await db.update(userLanguagesTable)
      .set(language)
      .where(eq(userLanguagesTable.id, id))
      .returning();
    return result[0] as UserLanguage;
  }

  async deleteUserLanguage(id: number): Promise<void> {
    await db.delete(userLanguagesTable).where(eq(userLanguagesTable.id, id));
  }

  // User Projects methods
  async getUserProjects(userId: number): Promise<UserProject[]> {
    return await db.select().from(userProjectsTable).where(eq(userProjectsTable.userId, userId));
  }

  async createUserProject(project: InsertUserProject): Promise<UserProject> {
    const [result] = await db.insert(userProjectsTable).values(project).returning();
    return result;
  }

  async updateUserProject(id: number, project: Partial<InsertUserProject>): Promise<UserProject | undefined> {
    const [result] = await db.update(userProjectsTable).set(project).where(eq(userProjectsTable.id, id)).returning();
    return result;
  }

  async deleteUserProject(id: number): Promise<void> {
    await db.delete(userProjectsTable).where(eq(userProjectsTable.id, id));
  }

  // User Languages methods
  async getUserLanguages(userId: number): Promise<UserLanguage[]> {
    const result = await db
      .select({
        id: userLanguagesTable.id,
        userId: userLanguagesTable.userId,
        name: userLanguagesTable.name,
        level: userLanguagesTable.level,
        certificate: userLanguagesTable.certificate,
        createdAt: userLanguagesTable.createdAt,
        updatedAt: userLanguagesTable.updatedAt
      })
      .from(userLanguagesTable)
      .where(eq(userLanguagesTable.userId, userId));

    return result.map(row => {
      if (!isValidLanguageLevel(row.level)) {
        throw new Error(`Invalid language level found in database: ${row.level}`);
      }

      return {
        id: row.id,
        userId: row.userId,
        name: row.name,
        level: row.level,
        certificate: row.certificate,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
      };
    });
  }

  async getUserLanguage(userId: number, languageId: number): Promise<UserLanguage | undefined> {
    const result = await db
      .select({
        id: userLanguagesTable.id,
        userId: userLanguagesTable.userId,
        name: userLanguagesTable.name,
        level: userLanguagesTable.level,
        certificate: userLanguagesTable.certificate,
        createdAt: userLanguagesTable.createdAt,
        updatedAt: userLanguagesTable.updatedAt
      })
      .from(userLanguagesTable)
      .where(and(
        eq(userLanguagesTable.userId, userId),
        eq(userLanguagesTable.id, languageId)
      ))
      .limit(1);

    if (!result.length) {
      return undefined;
    }

    const row = result[0];
    if (!isValidLanguageLevel(row.level)) {
      throw new Error(`Invalid language level: ${row.level}`);
    }

    return {
      id: row.id,
      userId: row.userId,
      name: row.name,
      level: row.level,
      certificate: row.certificate,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }

  async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
    try {
      const result = await db.insert(contactRequestsTable).values({
        name: request.name,
        email: request.email,
        phone: request.phone || null,
        subject: request.subject,
        message: request.message,
        status: request.status || 'pending',
      }).returning();

      return result[0];
    } catch (error) {
      console.error('Error creating contact request:', error);
      throw error;
    }
  }
}

export default PgStorage;