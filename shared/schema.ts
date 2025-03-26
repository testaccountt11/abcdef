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
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  authorName: text("author_name").notNull(),
  authorImage: text("author_image"),
  readTime: text("read_time"),
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  content: true,
  category: true,
  imageUrl: true,
  authorName: true,
  authorImage: true,
  readTime: true,
});

// Certificate schema
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  issueDate: text("issue_date").notNull(),
  certificateUrl: text("certificate_url"),
});

export const insertCertificateSchema = createInsertSchema(certificates).pick({
  userId: true,
  title: true,
  issuer: true,
  issueDate: true,
  certificateUrl: true,
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

export const statsRelations = relations(stats, ({ one }) => ({
  user: one(users, {
    fields: [stats.userId],
    references: [users.id],
  }),
}));

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
