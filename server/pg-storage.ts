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
  users,
  courses,
  enrollments,
  opportunities,
  mentors,
  articles,
  certificates,
  stats,
  achievements,
  userAchievements,
  badges,
  userBadges,
  contactRequests,
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
import { db } from "./db.js";
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
  enrollmentDate: timestamp("enrollment_date").notNull(),
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

// Helper function to convert comma-separated string to array
function stringToArray(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

export class PgStorage implements IStorage {
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
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return result[0] as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);
    return result[0] as User;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return result[0] as User;
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
    const result = await db.insert(enrollmentsTable as any).values({
      userId: enrollment.userId,
      courseId: enrollment.courseId,
      progress: enrollment.progress || 0,
      enrollmentDate: new Date(),
      completed: enrollment.completed || false
    }).returning();

    const enrollmentResult = {
      id: result[0].id,
      userId: result[0].userId,
      courseId: result[0].courseId,
      progress: result[0].progress,
      completed: result[0].completed
    };

    return enrollmentResult as Enrollment;
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
      .returning();
    
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
    }).returning();
    return {
      id: result[0].id,
      title: result[0].title,
      description: result[0].description,
      duration: result[0].duration,
      type: result[0].type,
      company: result[0].company,
      logoUrl: result[0].logoUrl,
      location: result[0].location,
      deadline: result[0].deadline
    };
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
      .from(userAchievementsTable as any)
      .leftJoin(
        achievementsTable as any,
        eq(userAchievementsTable.achievementId as any, achievementsTable.id as any)
      )
      .where(eq(userAchievementsTable.userId as any, userId));

    const achievements = result.map(row => ({
      id: row.id,
      userId: row.userId,
      achievementId: row.achievementId,
      progress: row.progress,
      completedValue: row.completedValue,
      earnedAt: row.completedAt,
      isComplete: row.completedAt !== null,
      achievement: row.achievement
    }));

    return achievements as (UserAchievement & { achievement: Achievement })[];
  }
  
  async getUserAchievementProgress(userId: number, achievementId: number): Promise<UserAchievement | undefined> {
    const [result] = await db
      .select()
      .from(userAchievementsTable)
      .where(sql`${userAchievementsTable.userId} = ${userId} AND ${userAchievementsTable.achievementId} = ${achievementId}`)
      .limit(1);
    
    if (!result) return undefined;
    
    return {
      id: result.id,
      userId: result.userId,
      achievementId: result.achievementId,
      progress: result.progress,
      completedValue: result.completedValue,
      earnedAt: result.completedAt,
      isComplete: result.completedAt !== null
    };
  }
  
  async createUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement & { achievement: Achievement }> {
    const result = await db.insert(userAchievementsTable).values({
      userId: userAchievement.userId,
      achievementId: userAchievement.achievementId,
      progress: userAchievement.progress || 0,
      completedValue: userAchievement.completedValue,
      completedAt: userAchievement.isComplete ? new Date() : null
    }).returning();

    const achievement = await this.getAchievement(userAchievement.achievementId);
    
    if (!achievement) {
      throw new Error(`Achievement with id ${userAchievement.achievementId} not found`);
    }

    return {
      ...result[0],
      isComplete: result[0].completedAt !== null,
      earnedAt: result[0].completedAt,
      achievement
    } as UserAchievement & { achievement: Achievement };
  }
  
  async updateUserAchievement(userId: number, achievementId: number, progress: number): Promise<(UserAchievement & { achievement: Achievement }) | undefined> {
    const result = await db
      .update(userAchievementsTable)
      .set({
        progress,
        completedAt: progress >= 100 ? new Date() : null
      })
      .where(
        and(
          eq(userAchievementsTable.userId, userId),
          eq(userAchievementsTable.achievementId, achievementId)
        )
      )
      .returning();

    if (!result[0]) {
      return undefined;
    }

    const achievement = await this.getAchievement(achievementId);
    
    if (!achievement) {
      return undefined;
    }

    return {
      ...result[0],
      isComplete: result[0].completedAt !== null,
      earnedAt: result[0].completedAt,
      achievement
    } as UserAchievement & { achievement: Achievement };
  }
  
  async completeUserAchievement(userId: number, achievementId: number, completedValue: number): Promise<UserAchievement | undefined> {
    const [result] = await db
      .update(userAchievementsTable)
      .set({
        progress: completedValue,
        completedAt: new Date()
      })
      .where(sql`${userAchievementsTable.userId} = ${userId} AND ${userAchievementsTable.achievementId} = ${achievementId}`)
      .returning();
    
    if (!result) return undefined;
    
    return {
      id: result.id,
      userId: result.userId,
      achievementId: result.achievementId,
      progress: result.progress,
      completedValue: result.completedValue,
      earnedAt: result.completedAt,
      isComplete: result.completedAt !== null
    };
  }
  
  // Badge methods
  async getBadges(): Promise<Badge[]> {
    return await db.select().from(badgesTable);
  }
  
  async getBadge(id: number): Promise<Badge | undefined> {
    const result = await db.select().from(badgesTable).where(eq(badgesTable.id, id)).limit(1);
    return result[0];
  }
  
  async getBadgeByName(name: string): Promise<Badge | undefined> {
    const result = await db.select().from(badgesTable).where(eq(badgesTable.name, name)).limit(1);
    return result[0];
  }
  
  async createBadge(badge: InsertBadge): Promise<Badge> {
    const result = await db.insert(badgesTable).values(badge).returning();
    return result[0];
  }
  
  async getUserBadges(userId: number): Promise<(UserBadge & { badge: Badge })[]> {
    const result = await db
      .select({
        id: userBadgesTable.id,
        userId: userBadgesTable.userId,
        badgeId: userBadgesTable.badgeId,
        earnedAt: userBadgesTable.earnedAt,
        displayOnProfile: userBadgesTable.displayOnProfile,
        badge: badgesTable
      })
      .from(userBadgesTable)
      .innerJoin(
        badgesTable,
        eq(userBadgesTable.badgeId, badgesTable.id)
      )
      .where(eq(userBadgesTable.userId, userId));
    
    return result.map(r => ({
      id: r.id,
      userId: r.userId,
      badgeId: r.badgeId,
      earnedAt: r.earnedAt || null,
      displayOnProfile: r.displayOnProfile,
      badge: r.badge
    }));
  }
  
  async awardBadgeToUser(userId: number, badgeId: number): Promise<UserBadge> {
    // Check if user already has this badge
    const [existing] = await db
      .select()
      .from(userBadgesTable)
      .where(eq(userBadgesTable.userId, userId))
      .where(eq(userBadgesTable.badgeId, badgeId))
      .limit(1);
    
    if (existing) {
      return {
        id: existing.id,
        userId: existing.userId,
        badgeId: existing.badgeId,
        earnedAt: existing.earnedAt || null,
        displayOnProfile: existing.displayOnProfile
      };
    }
    
    const [result] = await db
      .insert(userBadgesTable)
      .values({
        userId,
        badgeId,
        earnedAt: new Date(),
        displayOnProfile: true
      })
      .returning();
    
    return {
      id: result.id,
      userId: result.userId,
      badgeId: result.badgeId,
      earnedAt: result.earnedAt || null,
      displayOnProfile: result.displayOnProfile
    };
  }
  
  async updateUserBadgeDisplay(userId: number, badgeId: number, displayOnProfile: boolean): Promise<UserBadge | undefined> {
    const [result] = await db
      .update(userBadgesTable)
      .set({ displayOnProfile })
      .where(eq(userBadgesTable.userId, userId))
      .where(eq(userBadgesTable.badgeId, badgeId))
      .returning();
    
    if (!result) return undefined;

    return {
      id: result.id,
      userId: result.userId,
      badgeId: result.badgeId,
      earnedAt: result.earnedAt || null,
      displayOnProfile: result.displayOnProfile
    };
  }
  
  async checkAndAwardBadges(userId: number): Promise<Badge[]> {
    // Calculate user's total points from completed achievements
    const userAchievements = await this.getUserAchievements(userId);
    const completedAchievements = userAchievements.filter(ua => ua.isComplete);
    
    let totalPoints = 0;
    completedAchievements.forEach(ua => {
      totalPoints += ua.achievement.points ?? 0;
    });
    
    // Get all badges the user doesn't have yet
    const userBadges = await this.getUserBadges(userId);
    const userBadgeIds = new Set(userBadges.map(ub => ub.badgeId));
    
    // Find badges the user qualifies for
    const allBadges = await this.getBadges();
    const eligibleBadges = allBadges.filter(badge => 
      !userBadgeIds.has(badge.id) && 
      totalPoints >= (badge.requiredPoints ?? 0)
    );
    
    // Award new badges
    const newlyAwardedBadges: Badge[] = [];
    
    for (const badge of eligibleBadges) {
      await this.awardBadgeToUser(userId, badge.id);
      newlyAwardedBadges.push(badge);
    }
    
    return newlyAwardedBadges;
  }

  async createContactRequest(contactRequest: InsertContactRequest): Promise<ContactRequest> {
    const [result] = await db
      .insert(contactRequestsTable)
      .values({
        ...contactRequest,
        createdAt: new Date()
      })
      .returning();
    
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      subject: result.subject,
      message: result.message,
      phone: result.phone,
      status: result.status,
      createdAt: result.createdAt
    };
  }

  async createMentorApplication(application: InsertMentorApplication): Promise<MentorApplication> {
    try {
      const [result] = await db
        .insert(mentorApplicationsTable)
        .values({
          first_name: application.first_name,
          last_name: application.last_name,
          email: application.email,
          phone: application.phone,
          title: application.title,
          company: application.company,
          skills: application.skills,
          bio: application.bio,
          availability: application.availability,
          mentorship_goals: application.mentorship_goals,
          experience: application.experience,
          expertise: application.expertise,
          languages: application.languages,
          specialization: application.specialization,
          motivation: application.motivation,
          preferred_students: application.preferred_students,
          additional_info: application.additional_info,
          linkedin_profile: application.linkedin_profile,
          resume_url: application.resume_url || null,
          status: 'pending',
          created_at: new Date()
        })
        .returning();
      
      return {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        phone: result.phone,
        title: result.title,
        company: result.company,
        skills: result.skills,
        bio: result.bio,
        availability: result.availability,
        mentorship_goals: result.mentorship_goals,
        experience: result.experience,
        expertise: result.expertise,
        languages: result.languages as string[],
        specialization: result.specialization as string[],
        motivation: result.motivation,
        preferred_students: result.preferred_students,
        additional_info: result.additional_info,
        linkedin_profile: result.linkedin_profile,
        resume_url: result.resume_url,
        status: result.status,
        created_at: result.created_at
      };
    } catch (error) {
      console.error("Error creating mentor application:", error);
      throw error;
    }
  }

  async getMentorApplicationByEmail(email: string): Promise<MentorApplication | null> {
    try {
      const [result] = await db
        .select()
        .from(mentorApplicationsTable)
        .where(eq(mentorApplicationsTable.email, email))
        .limit(1);

      if (!result) return null;

      return {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        phone: result.phone,
        title: result.title,
        company: result.company,
        skills: result.skills,
        bio: result.bio,
        availability: result.availability,
        mentorship_goals: result.mentorship_goals,
        experience: result.experience,
        expertise: result.expertise,
        languages: result.languages as string[],
        specialization: result.specialization as string[],
        motivation: result.motivation,
        preferred_students: result.preferred_students,
        additional_info: result.additional_info,
        linkedin_profile: result.linkedin_profile,
        resume_url: result.resume_url,
        status: result.status,
        created_at: result.created_at
      };
    } catch (error) {
      console.error("Error getting mentor application:", error);
      return null;
    }
  }

  async getAllMentorApplications(): Promise<MentorApplication[]> {
    try {
      const results = await db.select().from(mentorApplicationsTable);
      return results.map(result => ({
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        phone: result.phone,
        title: result.title,
        company: result.company,
        skills: result.skills,
        bio: result.bio,
        availability: result.availability,
        mentorship_goals: result.mentorship_goals,
        experience: result.experience,
        expertise: result.expertise,
        languages: result.languages as string[],
        specialization: result.specialization as string[],
        motivation: result.motivation,
        preferred_students: result.preferred_students,
        additional_info: result.additional_info,
        linkedin_profile: result.linkedin_profile,
        resume_url: result.resume_url,
        status: result.status,
        created_at: result.created_at
      }));
    } catch (error) {
      console.error("Error getting all mentor applications:", error);
      return [];
    }
  }

  async updateMentorApplicationStatus(id: number, status: string): Promise<MentorApplication | null> {
    try {
      const [result] = await db
        .update(mentorApplicationsTable)
        .set({ status })
        .where(eq(mentorApplicationsTable.id, id))
        .returning();

      if (!result) return null;

      return {
        id: result.id,
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        phone: result.phone,
        title: result.title,
        company: result.company,
        skills: result.skills,
        bio: result.bio,
        availability: result.availability,
        mentorship_goals: result.mentorship_goals,
        experience: result.experience,
        expertise: result.expertise,
        languages: result.languages as string[],
        specialization: result.specialization as string[],
        motivation: result.motivation,
        preferred_students: result.preferred_students,
        additional_info: result.additional_info,
        linkedin_profile: result.linkedin_profile,
        resume_url: result.resume_url,
        status: result.status,
        created_at: result.created_at
      };
    } catch (error) {
      console.error("Error updating mentor application status:", error);
      return null;
    }
  }

  // Add missing methods
  async createCourse(course: InsertCourse): Promise<Course> {
    const result = await db.insert(coursesTable).values({
      title: course.title,
      description: course.description,
      imageUrl: course.imageUrl,
      category: course.category,
      provider: course.provider,
      isPartnerCourse: course.isPartnerCourse || false,
      contactInfo: course.contactInfo
    }).returning();
    return result[0] as Course;
  }

  async getUserCourses(userId: number): Promise<Course[]> {
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
      .leftJoin(
        enrollmentsTable,
        eq(coursesTable.id, enrollmentsTable.courseId)
      )
      .where(eq(enrollmentsTable.userId, userId));

    return result.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      imageUrl: row.imageUrl,
      category: row.category,
      provider: row.provider,
      isPartnerCourse: row.isPartnerCourse || false,
      contactInfo: row.contactInfo,
      progress: row.progress || 0,
      completed: row.completed || false
    })) as Course[];
  }

  async updateUserAchievementProgress(userId: number, achievementId: number, progress: number): Promise<(UserAchievement & { achievement: Achievement }) | undefined> {
    const result = await db
      .update(userAchievementsTable as any)
      .set({
        progress,
        completedAt: progress >= 100 ? new Date() : null
      })
      .where(
        and(
          eq(userAchievementsTable.userId as any, userId),
          eq(userAchievementsTable.achievementId as any, achievementId)
        )
      )
      .returning();

    if (!result[0]) {
      return undefined;
    }

    const achievement = await this.getAchievement(achievementId);
    
    if (!achievement) {
      return undefined;
    }

    const userAchievement = {
      id: result[0].id,
      userId: result[0].userId,
      achievementId: result[0].achievementId,
      progress: result[0].progress,
      completedValue: result[0].completedValue,
      earnedAt: result[0].completedAt,
      isComplete: result[0].completedAt !== null,
      achievement
    };

    return userAchievement as UserAchievement & { achievement: Achievement };
  }
}

export default PgStorage;