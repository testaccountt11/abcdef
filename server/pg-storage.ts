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
  MentorApplication
} from "@shared/schema";
import { IStorage } from "./storage";
import { eq, and, sql } from "drizzle-orm";
import { db } from "./db.js";

export class PgStorage implements IStorage {
  [x: string]: any;
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    try {
      const { email, subscriptionDate } = subscription;
      const result = await db.execute(
        sql`INSERT INTO newsletter_subscriptions (email, subscription_date) 
            VALUES (${email}, ${subscriptionDate}) 
            RETURNING *`
      );
      const rows = result as unknown as NewsletterSubscription[];
      return rows[0];
    } catch (error) {
      console.error("Error creating newsletter subscription:", error);
      throw error;
    }
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | null> {
    try {
      const result = await db.execute<Record<string, unknown>>(
        sql`SELECT * FROM newsletter_subscriptions WHERE LOWER(email) = LOWER(${email})`
      );
      const rows = result as unknown as NewsletterSubscription[];
      return rows[0] || null;
    } catch (error) {
      console.error("Error getting newsletter subscription:", error);
      return null;
    }
  }

  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    try {
      const result = await db.execute<Record<string, unknown>>(
        sql`SELECT * FROM newsletter_subscriptions`
      );
      
      // Return result as array
      const rows = result as unknown as NewsletterSubscription[];
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error("Error getting all newsletter subscriptions:", error);
      return [];
    }
  }

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
  
  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }
  
  async getAchievement(id: number): Promise<Achievement | undefined> {
    const result = await db.select().from(achievements).where(eq(achievements.id, id)).limit(1);
    return result[0];
  }
  
  async getAchievementByName(name: string): Promise<Achievement | undefined> {
    const result = await db.select().from(achievements).where(eq(achievements.name, name)).limit(1);
    return result[0];
  }
  
  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const result = await db.insert(achievements).values(achievement).returning();
    return result[0];
  }
  
  async getUserAchievements(userId: number): Promise<(UserAchievement & { achievement: Achievement })[]> {
    const result = await db
      .select()
      .from(userAchievements)
      .innerJoin(achievements, eq(userAchievements.achievementId, achievements.id))
      .where(eq(userAchievements.userId, userId));
    
    return result.map(r => ({
      ...r.user_achievements,
      achievement: r.achievements
    }));
  }
  
  async getUserAchievementProgress(userId: number, achievementId: number): Promise<UserAchievement | undefined> {
    const result = await db
      .select()
      .from(userAchievements)
      .where(
        and(
          eq(userAchievements.userId, userId),
          eq(userAchievements.achievementId, achievementId)
        )
      )
      .limit(1);
    
    return result[0];
  }
  
  async createUserAchievement(userAchievement: InsertUserAchievement): Promise<UserAchievement> {
    const result = await db.insert(userAchievements).values(userAchievement).returning();
    
    // Check for badge qualification if achievement is complete
    if (userAchievement.isComplete) {
      await this.checkAndAwardBadges(userAchievement.userId);
    }
    
    return result[0];
  }
  
  async updateUserAchievementProgress(userId: number, achievementId: number, progress: number): Promise<UserAchievement | undefined> {
    const userAchievement = await this.getUserAchievementProgress(userId, achievementId);
    if (!userAchievement) return undefined;
    
    const achievement = await this.getAchievement(achievementId);
    if (!achievement) return undefined;
    
    // If progress meets the required value, mark as complete
    const isComplete = progress >= (achievement.requiredValue ?? 1);
    const wasComplete = userAchievement.isComplete;
    
    const result = await db
      .update(userAchievements)
      .set({ 
        progress,
        isComplete,
        earnedAt: isComplete && !wasComplete ? new Date() : userAchievement.earnedAt,
        completedValue: isComplete ? progress : userAchievement.completedValue
      })
      .where(
        and(
          eq(userAchievements.userId, userId),
          eq(userAchievements.achievementId, achievementId)
        )
      )
      .returning();
    
    // Check for badge qualification if achievement is newly completed
    if (isComplete && !wasComplete) {
      await this.checkAndAwardBadges(userId);
    }
    
    return result[0];
  }
  
  async completeUserAchievement(userId: number, achievementId: number, completedValue: number): Promise<UserAchievement | undefined> {
    const userAchievement = await this.getUserAchievementProgress(userId, achievementId);
    
    if (!userAchievement) {
      // If the user doesn't have this achievement tracked yet, create it
      const achievement = await this.getAchievement(achievementId);
      if (!achievement) return undefined;
      
      return this.createUserAchievement({
        userId,
        achievementId,
        progress: completedValue,
        isComplete: true,
        completedValue
      });
    }
    
    const result = await db
      .update(userAchievements)
      .set({
        progress: completedValue,
        isComplete: true,
        earnedAt: new Date(),
        completedValue
      })
      .where(
        and(
          eq(userAchievements.userId, userId),
          eq(userAchievements.achievementId, achievementId)
        )
      )
      .returning();
    
    // Check for badge qualification
    await this.checkAndAwardBadges(userId);
    
    return result[0];
  }
  
  // Badge methods
  async getBadges(): Promise<Badge[]> {
    return await db.select().from(badges);
  }
  
  async getBadge(id: number): Promise<Badge | undefined> {
    const result = await db.select().from(badges).where(eq(badges.id, id)).limit(1);
    return result[0];
  }
  
  async getBadgeByName(name: string): Promise<Badge | undefined> {
    const result = await db.select().from(badges).where(eq(badges.name, name)).limit(1);
    return result[0];
  }
  
  async createBadge(badge: InsertBadge): Promise<Badge> {
    const result = await db.insert(badges).values(badge).returning();
    return result[0];
  }
  
  async getUserBadges(userId: number): Promise<(UserBadge & { badge: Badge })[]> {
    const result = await db
      .select()
      .from(userBadges)
      .innerJoin(badges, eq(userBadges.badgeId, badges.id))
      .where(eq(userBadges.userId, userId));
    
    return result.map(r => ({
      ...r.user_badges,
      badge: r.badges
    }));
  }
  
  async awardBadgeToUser(userId: number, badgeId: number): Promise<UserBadge> {
    // Check if user already has this badge
    const existing = await db
      .select()
      .from(userBadges)
      .where(
        and(
          eq(userBadges.userId, userId),
          eq(userBadges.badgeId, badgeId)
        )
      )
      .limit(1);
    
    if (existing.length > 0) {
      return existing[0];
    }
    
    const result = await db
      .insert(userBadges)
      .values({
        userId,
        badgeId,
        earnedAt: new Date(),
        displayOnProfile: true
      })
      .returning();
    
    return result[0];
  }
  
  async updateUserBadgeDisplay(userId: number, badgeId: number, displayOnProfile: boolean): Promise<UserBadge | undefined> {
    const result = await db
      .update(userBadges)
      .set({ displayOnProfile })
      .where(
        and(
          eq(userBadges.userId, userId),
          eq(userBadges.badgeId, badgeId)
        )
      )
      .returning();
    
    return result[0];
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
    const [request] = await db.insert(contactRequests).values(contactRequest).returning();
    return request;
  }

  async createMentorApplication(application: InsertMentorApplication): Promise<MentorApplication> {
    try {
      const result = await db.insert(mentorApplications).values(application).returning();
      return result[0];
    } catch (error) {
      console.error("Error creating mentor application:", error);
      throw error;
    }
  }

  async getMentorApplicationByEmail(email: string): Promise<MentorApplication | null> {
    try {
      const result = await db.select().from(mentorApplications).where(eq(mentorApplications.email, email)).limit(1);
      return result[0] || null;
    } catch (error) {
      console.error("Error getting mentor application:", error);
      return null;
    }
  }

  async getAllMentorApplications(): Promise<MentorApplication[]> {
    try {
      return await db.select().from(mentorApplications);
    } catch (error) {
      console.error("Error getting all mentor applications:", error);
      return [];
    }
  }

  async updateMentorApplicationStatus(id: number, status: string): Promise<MentorApplication | null> {
    try {
      const result = await db
        .update(mentorApplications)
        .set({ status })
        .where(eq(mentorApplications.id, id))
        .returning();
      return result[0] || null;
    } catch (error) {
      console.error("Error updating mentor application status:", error);
      return null;
    }
  }
}

export default PgStorage;