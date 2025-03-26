import { 
  User, InsertUser, 
  Course, InsertCourse, 
  Enrollment, InsertEnrollment, 
  Opportunity, InsertOpportunity, 
  Mentor, InsertMentor, 
  Article, InsertArticle, 
  Certificate, InsertCertificate, 
  Stats, InsertStats,
  users,
  courses,
  enrollments,
  opportunities,
  mentors,
  articles,
  certificates,
  stats
} from "@shared/schema";
import { IStorage } from "./storage";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";

export class PgStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db.update(users).set(user).where(eq(users.id, id)).returning();
    return result[0];
  }
  
  // Courses
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
    return result[0];
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const result = await db.insert(courses).values(course).returning();
    return result[0];
  }

  async getUserCourses(userId: number): Promise<Course[]> {
    // Join enrollments with courses to get the courses a user is enrolled in
    const result = await db
      .select()
      .from(courses)
      .innerJoin(enrollments, eq(enrollments.courseId, courses.id))
      .where(eq(enrollments.userId, userId));

    return result.map(r => ({
      id: r.courses.id,
      title: r.courses.title,
      description: r.courses.description,
      imageUrl: r.courses.imageUrl,
      category: r.courses.category,
      provider: r.courses.provider,
      isPartnerCourse: r.courses.isPartnerCourse,
      contactInfo: r.courses.contactInfo,
      progress: r.enrollments.progress
    }));
  }
  
  // Enrollments
  async getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined> {
    const result = await db
      .select()
      .from(enrollments)
      .where(
        and(
          eq(enrollments.userId, userId),
          eq(enrollments.courseId, courseId)
        )
      )
      .limit(1);
    
    return result[0];
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const result = await db.insert(enrollments).values(enrollment).returning();
    return result[0];
  }

  async updateEnrollmentProgress(userId: number, courseId: number, progress: number): Promise<Enrollment | undefined> {
    const result = await db
      .update(enrollments)
      .set({ progress })
      .where(
        and(
          eq(enrollments.userId, userId),
          eq(enrollments.courseId, courseId)
        )
      )
      .returning();
    
    return result[0];
  }
  
  // Opportunities
  async getOpportunities(): Promise<Opportunity[]> {
    return await db.select().from(opportunities);
  }

  async getOpportunity(id: number): Promise<Opportunity | undefined> {
    const result = await db.select().from(opportunities).where(eq(opportunities.id, id)).limit(1);
    return result[0];
  }

  async createOpportunity(opportunity: InsertOpportunity): Promise<Opportunity> {
    const result = await db.insert(opportunities).values(opportunity).returning();
    return result[0];
  }
  
  // Mentors
  async getMentors(): Promise<Mentor[]> {
    return await db.select().from(mentors);
  }

  async getMentor(id: number): Promise<Mentor | undefined> {
    const result = await db.select().from(mentors).where(eq(mentors.id, id)).limit(1);
    return result[0];
  }

  async createMentor(mentor: InsertMentor): Promise<Mentor> {
    const result = await db.insert(mentors).values(mentor).returning();
    return result[0];
  }
  
  // Articles
  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles);
  }

  async getArticle(id: number): Promise<Article | undefined> {
    const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
    return result[0];
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const result = await db.insert(articles).values(article).returning();
    return result[0];
  }
  
  // Certificates
  async getUserCertificates(userId: number): Promise<Certificate[]> {
    return await db.select().from(certificates).where(eq(certificates.userId, userId));
  }

  async getCertificate(id: number): Promise<Certificate | undefined> {
    const result = await db.select().from(certificates).where(eq(certificates.id, id)).limit(1);
    return result[0];
  }

  async createCertificate(certificate: InsertCertificate): Promise<Certificate> {
    const result = await db.insert(certificates).values(certificate).returning();
    return result[0];
  }
  
  // Stats
  async getUserStats(userId: number): Promise<Stats | undefined> {
    const result = await db.select().from(stats).where(eq(stats.userId, userId)).limit(1);
    return result[0];
  }

  async createUserStats(userStats: InsertStats): Promise<Stats> {
    const result = await db.insert(stats).values(userStats).returning();
    return result[0];
  }

  async updateUserStats(userId: number, userStats: Partial<InsertStats>): Promise<Stats | undefined> {
    const result = await db
      .update(stats)
      .set(userStats)
      .where(eq(stats.userId, userId))
      .returning();
    
    return result[0];
  }
}