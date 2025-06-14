import { relations, sql } from 'drizzle-orm';
import { pgTable, text, integer, timestamp, varchar, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from '../schema';

// User stats schema
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

// Achievements schema
export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  progress: integer('progress').default(0),
  maxProgress: integer('max_progress').notNull(),
  icon: varchar('icon', { length: 50 }).notNull(),
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