import { pgTable, text, serial, integer, boolean, timestamp, json, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
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
  phone: text("phone"),
  location: text("location"),
  website: text("website"),
  linkedin: text("linkedin"),
  github: text("github"),
  telegram: text("telegram"),
  whatsapp: text("whatsapp"),
  bio: text("bio"),
  company: text("company"),
  position: text("position"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

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

export const insertCourseSchema = createInsertSchema(courses);
export const selectCourseSchema = createSelectSchema(courses);

// Enrollment schema to track user course progress
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  courseId: integer("course_id").notNull(),
  progress: integer("progress").default(0),
  completed: boolean("completed").default(false),
});

export const insertEnrollmentSchema = createInsertSchema(enrollments);
export const selectEnrollmentSchema = createSelectSchema(enrollments);

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

export const insertOpportunitySchema = createInsertSchema(opportunities);
export const selectOpportunitySchema = createSelectSchema(opportunities);

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

export const insertMentorSchema = createInsertSchema(mentors);
export const selectMentorSchema = createSelectSchema(mentors);

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

export const insertArticleSchema = createInsertSchema(articles);
export const selectArticleSchema = createSelectSchema(articles);

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

export const insertCertificateSchema = createInsertSchema(certificates);
export const selectCertificateSchema = createSelectSchema(certificates);

// Stats schema for dashboard
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  coursesInProgress: integer("courses_in_progress").default(0),
  certificatesEarned: integer("certificates_earned").default(0),
  mentorSessions: integer("mentor_sessions").default(0),
  opportunitiesSaved: integer("opportunities_saved").default(0),
});

export const insertStatsSchema = createInsertSchema(stats);
export const selectStatsSchema = createSelectSchema(stats);

// User skills schema
export const userSkills = pgTable("user_skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  level: integer("level").notNull(), // 1-5
  yearsOfExperience: integer("years_of_experience"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User education schema
export const userEducation = pgTable("user_education", {
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User languages schema
export const userLanguages = pgTable("user_languages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  level: text("level").notNull(), // basic, intermediate, advanced, native
  certificate: text("certificate"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User projects schema
export const userProjects = pgTable("user_projects", {
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Create schemas for the new tables
export const insertUserSkillSchema = createInsertSchema(userSkills);
export const selectUserSkillSchema = createSelectSchema(userSkills);

export const insertUserEducationSchema = createInsertSchema(userEducation);
export const selectUserEducationSchema = createSelectSchema(userEducation);

export const insertUserLanguageSchema = createInsertSchema(userLanguages);
export const selectUserLanguageSchema = createSelectSchema(userLanguages);

export const insertUserProjectSchema = createInsertSchema(userProjects);
export const selectUserProjectSchema = createSelectSchema(userProjects);

// Define relations between tables
export const usersRelations = relations(users, ({ many, one }) => ({
  enrollments: many(enrollments),
  certificates: many(certificates),
  stats: one(stats),
  skills: many(userSkills),
  education: many(userEducation),
  languages: many(userLanguages),
  projects: many(userProjects),
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

// Add new schema definitions
export const userStats = pgTable('user_stats', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  coursesInProgress: integer('courses_in_progress').default(0),
  certificatesEarned: integer('certificates_earned').default(0),
  mentorSessions: integer('mentor_sessions').default(0),
  opportunitiesSaved: integer('opportunities_saved').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  progress: integer('progress').default(0),
  maxProgress: integer('max_progress').notNull(),
  icon: text('icon').notNull(),
  unlockedAt: timestamp('unlocked_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations
export const userStatsRelations = relations(userStats, ({ one }) => ({
  user: one(users, {
    fields: [userStats.userId],
    references: [users.id],
  }),
}));

export const achievementsRelations = relations(achievements, ({ one }) => ({
  user: one(users, {
    fields: [achievements.userId],
    references: [users.id],
  }),
}));

// Schemas
export const insertUserStatsSchema = createInsertSchema(userStats);
export const selectUserStatsSchema = createSelectSchema(userStats);

export const insertAchievementSchema = createInsertSchema(achievements);
export const selectAchievementSchema = createSelectSchema(achievements);

// Types
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type SelectUserStats = z.infer<typeof selectUserStatsSchema>;

export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type SelectAchievement = z.infer<typeof selectAchievementSchema>;

// Export all types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = z.infer<typeof selectUserSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type SelectCourse = z.infer<typeof selectCourseSchema>;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type SelectEnrollment = z.infer<typeof selectEnrollmentSchema>;

export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
export type SelectOpportunity = z.infer<typeof selectOpportunitySchema>;

export type Mentor = typeof mentors.$inferSelect;
export type InsertMentor = z.infer<typeof insertMentorSchema>;
export type SelectMentor = z.infer<typeof selectMentorSchema>;

export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type SelectArticle = z.infer<typeof selectArticleSchema>;

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type SelectCertificate = z.infer<typeof selectCertificateSchema>;

export type Stats = typeof stats.$inferSelect;
export type InsertStats = z.infer<typeof insertStatsSchema>;
export type SelectStats = z.infer<typeof selectStatsSchema>;

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
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  skills: text('skills').notNull(),
  bio: text('bio').notNull(),
  availability: text('availability').notNull(),
  mentorship_goals: text('mentorship_goals').notNull(),
  experience: text('experience').notNull(),
  expertise: text('expertise').notNull(),
  languages: text('languages').array().notNull(),
  specialization: text('specialization').array().notNull(),
  motivation: text('motivation').notNull(),
  preferred_students: text('preferred_students'),
  additional_info: text('additional_info'),
  resume_url: text('resume_url'),
  linkedin_profile: text('linkedin_profile'),
  status: text('status').default('pending').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
});

export const insertMentorApplicationSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  title: z.string(),
  company: z.string(),
  skills: z.string(),
  bio: z.string(),
  availability: z.string(),
  mentorship_goals: z.string(),
  experience: z.string(),
  expertise: z.string(),
  languages: z.array(z.string()),
  specialization: z.array(z.string()),
  motivation: z.string(),
  preferred_students: z.string().optional(),
  additional_info: z.string().optional(),
  resume_url: z.string().optional(),
  linkedin_profile: z.string().optional(),
  status: z.string().default('pending')
});

export type MentorApplication = {
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
  resume_url: string | null;
  linkedin_profile: string | null;
  status: string;
  created_at: Date;
};

export type InsertMentorApplication = z.infer<typeof insertMentorApplicationSchema>;

// Добавим в IStorage
export interface IStorage {
  // ... existing methods
  
  createMentorApplication(application: InsertMentorApplication): Promise<MentorApplication>;
  getMentorApplicationByEmail(email: string): Promise<MentorApplication | null>;
  getAllMentorApplications(): Promise<MentorApplication[]>;
  updateMentorApplicationStatus(id: number, status: string): Promise<MentorApplication | null>;
}

// User skills relations
export const userSkillsRelations = relations(userSkills, ({ one }) => ({
  user: one(users, {
    fields: [userSkills.userId],
    references: [users.id],
  }),
}));

// User education relations
export const userEducationRelations = relations(userEducation, ({ one }) => ({
  user: one(users, {
    fields: [userEducation.userId],
    references: [users.id],
  }),
}));

// User languages relations
export const userLanguagesRelations = relations(userLanguages, ({ one }) => ({
  user: one(users, {
    fields: [userLanguages.userId],
    references: [users.id],
  }),
}));

// User projects relations
export const userProjectsRelations = relations(userProjects, ({ one }) => ({
  user: one(users, {
    fields: [userProjects.userId],
    references: [users.id],
  }),
}));

// Export types for the new tables
export type UserSkill = typeof userSkills.$inferSelect;
export type InsertUserSkill = z.infer<typeof insertUserSkillSchema>;
export type SelectUserSkill = z.infer<typeof selectUserSkillSchema>;

export type UserEducation = typeof userEducation.$inferSelect;
export type InsertUserEducation = z.infer<typeof insertUserEducationSchema>;
export type SelectUserEducation = z.infer<typeof selectUserEducationSchema>;

export type UserLanguage = typeof userLanguages.$inferSelect;
export type InsertUserLanguage = z.infer<typeof insertUserLanguageSchema>;
export type SelectUserLanguage = z.infer<typeof selectUserLanguageSchema>;

export type UserProject = typeof userProjects.$inferSelect;
export type InsertUserProject = z.infer<typeof insertUserProjectSchema>;
export type SelectUserProject = z.infer<typeof selectUserProjectSchema>;
