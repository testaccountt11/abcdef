import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email").notNull().unique(),
  profileImage: text("profile_image"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  firstName: true,
  lastName: true,
  email: true,
  profileImage: true,
});

// Course schema
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  provider: text("provider").notNull(),
  isPartnerCourse: boolean("is_partner_course").default(false),
  contactInfo: text("contact_info"),
  progress: integer("progress").default(0),
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  imageUrl: true,
  category: true,
  provider: true,
  isPartnerCourse: true,
  contactInfo: true,
  progress: true,
});

// Enrollment schema to track user course progress
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  progress: integer("progress").default(0),
  completed: boolean("completed").default(false),
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).pick({
  userId: true,
  courseId: true,
  progress: true,
  completed: true,
});

// Opportunity schema
export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  logoUrl: text("logo_url"),
  type: text("type").notNull(), // "internship", "volunteer", "competition"
  location: text("location").notNull(),
  duration: text("duration"),
  deadline: text("deadline"),
});

export const insertOpportunitySchema = createInsertSchema(opportunities).pick({
  title: true,
  description: true,
  company: true,
  logoUrl: true,
  type: true,
  location: true,
  duration: true,
  deadline: true,
});

// Mentor schema
export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  profileImage: text("profile_image"),
  skills: text("skills").array(),
  contactInfo: text("contact_info"),
});

export const insertMentorSchema = createInsertSchema(mentors).pick({
  name: true,
  title: true,
  company: true,
  profileImage: true,
  skills: true,
  contactInfo: true,
});

// Article schema for advice section
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  authorName: text("author_name").notNull(),
  authorImage: text("author_image"),
  readTime: text("read_time"),
  publishDate: text("publish_date"),
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  content: true,
  summary: true,
  category: true,
  imageUrl: true,
  authorName: true,
  authorImage: true,
  readTime: true,
  publishDate: true,
});

// Certificate schema
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  issueDate: text("issue_date").notNull(),
  certificateUrl: text("certificate_url"),
  certificateFile: text("certificate_file"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCertificateSchema = createInsertSchema(certificates).pick({
  userId: true,
  title: true,
  issuer: true,
  issueDate: true,
  certificateUrl: true,
  certificateFile: true,
});

// Stats schema for dashboard
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  coursesInProgress: integer("courses_in_progress").default(0),
  certificatesEarned: integer("certificates_earned").default(0),
  mentorSessions: integer("mentor_sessions").default(0),
  opportunitiesSaved: integer("opportunities_saved").default(0),
});

export const insertStatsSchema = createInsertSchema(stats).pick({
  userId: true,
  coursesInProgress: true,
  certificatesEarned: true,
  mentorSessions: true,
  opportunitiesSaved: true,
});

// Define relations between tables
export const usersRelations = relations(users, ({ many, one }) => ({
  enrollments: many(enrollments),
  certificates: many(certificates),
  stats: one(stats),
}));

export const coursesRelations = relations(courses, ({ many }) => ({
  enrollments: many(enrollments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  user: one(users, {
    fields: [certificates.userId],
    references: [users.id],
  }),
}));

// Achievements schema
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  iconUrl: text("icon_url").notNull(),
  category: text("category").notNull(), // "course", "certificate", "mentor", "profile", etc.
  requirement: text("requirement").notNull(), // Description of how to earn
  requiredValue: integer("required_value").default(1), // Threshold to earn achievement
  points: integer("points").default(10),
  isHidden: boolean("is_hidden").default(false), // Some achievements can be hidden/secret
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAchievementSchema = createInsertSchema(achievements).pick({
  name: true,
  description: true,
  iconUrl: true,
  category: true,
  requirement: true,
  requiredValue: true,
  points: true,
  isHidden: true,
});

// User achievements junction table
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  achievementId: integer("achievement_id").notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
  progress: integer("progress").default(0), // For tracking partial progress
  isComplete: boolean("is_complete").default(false),
  completedValue: integer("completed_value").default(0), // The actual value when completed
});

export const insertUserAchievementSchema = createInsertSchema(userAchievements).pick({
  userId: true,
  achievementId: true,
  progress: true,
  isComplete: true,
  completedValue: true,
});

// Badges schema (special achievements or level indicators)
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  iconUrl: text("icon_url").notNull(),
  category: text("category").notNull(), // "beginner", "intermediate", "expert", "special"
  level: integer("level").default(1),
  requiredPoints: integer("required_points").default(100), // Points needed to earn
  isRare: boolean("is_rare").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBadgeSchema = createInsertSchema(badges).pick({
  name: true,
  description: true,
  iconUrl: true,
  category: true,
  level: true,
  requiredPoints: true,
  isRare: true,
});

// User badges junction table
export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  badgeId: integer("badge_id").notNull(),
  earnedAt: timestamp("earned_at").defaultNow(),
  displayOnProfile: boolean("display_on_profile").default(true),
});

export const insertUserBadgeSchema = createInsertSchema(userBadges).pick({
  userId: true,
  badgeId: true,
  displayOnProfile: true,
});

export const statsRelations = relations(stats, ({ one }) => ({
  user: one(users, {
    fields: [stats.userId],
    references: [users.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const badgesRelations = relations(badges, ({ many }) => ({
  userBadges: many(userBadges),
}));

export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}));

export const usersRelationsWithAchievements = relations(users, ({ many, one }) => ({
  enrollments: many(enrollments),
  certificates: many(certificates),
  stats: one(stats),
  achievements: many(userAchievements),
  badges: many(userBadges),
}));

// Contact request schema
export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).pick({
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
  status: true,
});

// Export all types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;

export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;

export type Mentor = typeof mentors.$inferSelect;
export type InsertMentor = z.infer<typeof insertMentorSchema>;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

export type Stats = typeof stats.$inferSelect;
export type InsertStats = z.infer<typeof insertStatsSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;

// Общие схемы
export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  password: z.string(),
  createdAt: z.date().or(z.string())
});

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  level: z.string(),
  price: z.number(),
  category: z.string(),
  author: z.string(),
  duration: z.number(),
  materials: z.array(z.string()).optional()
});

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  userId: z.string().min(1),
  imageUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  technologies: z.array(z.string())
}).strict();

export const internshipSchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  duration: z.string().min(1),
  isPaid: z.boolean(),
  applicationDeadline: z.date()
}).strict();

export const mentorSchema = z.object({
  id: z.string(),
  userId: z.string(),
  skills: z.array(z.string()),
  rate: z.number(),
  bio: z.string(),
  availability: z.string(),
  experience: z.number()
});

export const portfolioItemSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  projectUrl: z.string().optional(),
  skills: z.array(z.string()),
  category: z.string().min(1)
}).strict();

export const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  level: z.number().min(1).max(5),
  userId: z.string().min(1)
}).strict();

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
  subject: z.string().min(1),
  phone: z.string().optional(),
  companyName: z.string().optional()
}).strict();

export const resumeSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    description: z.string().optional()
  })),
  experience: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    description: z.string()
  })),
  skills: z.array(z.string()),
  languages: z.array(z.object({
    name: z.string(),
    level: z.string()
  })),
  additionalInfo: z.string().optional()
}).strict();

export const eventSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().min(1),
  organizerId: z.string().min(1),
  imageUrl: z.string().optional(),
  maxParticipants: z.number().positive().optional()
}).strict();

// Типы, выведенные из схем
export type Project = z.infer<typeof projectSchema>;
export type Internship = z.infer<typeof internshipSchema>;
export type PortfolioItem = z.infer<typeof portfolioItemSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Resume = z.infer<typeof resumeSchema>;
export type Event = z.infer<typeof eventSchema>;

// Add these type definitions to your shared schema file

export interface NewsletterSubscription {
  id: number;
  email: string;
  subscriptionDate: Date;
}

export interface InsertNewsletterSubscription {
  email: string;
  subscriptionDate: Date;
}

// Also make sure to update your IStorage interface to include these methods
export interface IStorage {
  // ... existing methods
  
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | null>;
  getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

// You might also need to add validation schema if you're using Zod
export const insertNewsletterSubscriptionSchema = z.object({
  email: z.string().email(),
  subscriptionDate: z.date()
});

// Добавьте в shared/schema.ts
export const newsletterSubscriptions = pgTable('newsletter_subscriptions', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  subscriptionDate: timestamp('subscription_date').notNull().defaultNow()
});

// Mentor Application Schema
export const mentorApplications = pgTable('mentor_applications', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  experience: text('experience').notNull(),
  specialization: text('specialization').notNull(),
  skills: text('skills').notNull(),
  languages: text('languages').array(),
  bio: text('bio').notNull(),
  motivation: text('motivation').notNull(),
  availability: text('availability').notNull(),
  resumeUrl: text('resume_url'),
  linkedinProfile: text('linkedin_profile'),
  status: text('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const insertMentorApplicationSchema = createInsertSchema(mentorApplications).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  title: true,
  company: true,
  experience: true,
  specialization: true,
  skills: true,
  languages: true,
  bio: true,
  motivation: true,
  availability: true,
  resumeUrl: true,
  linkedinProfile: true,
  status: true
});

export type MentorApplication = typeof mentorApplications.$inferSelect;
export type InsertMentorApplication = z.infer<typeof insertMentorApplicationSchema>;

// Добавим в IStorage
export interface IStorage {
  // ... existing methods
  
  createMentorApplication(application: InsertMentorApplication): Promise<MentorApplication>;
  getMentorApplicationByEmail(email: string): Promise<MentorApplication | null>;
  getAllMentorApplications(): Promise<MentorApplication[]>;
  updateMentorApplicationStatus(id: number, status: string): Promise<MentorApplication | null>;
}
