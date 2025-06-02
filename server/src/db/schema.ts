import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const mentor_applications = pgTable('mentor_applications', {
  id: serial('id').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  title: text('title'),
  company: text('company').default('Independent'),
  specialization: text('specialization').default('General'),
  availability: text('availability').default('1-2'),
  status: text('status').default('pending'),
  experience: text('experience').default('1-3'),
  languages: text('languages').array().default(sql`ARRAY[]::text[]`),
  skills: text('skills').array().default(sql`ARRAY[]::text[]`),
  bio: text('bio').default(''),
  message: text('message').default(''),
  motivation: text('motivation').default(''),
  resume_file: text('resume_file'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
}); 