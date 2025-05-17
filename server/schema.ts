import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
 
export const newsletterSubscriptions = pgTable('newsletter_subscriptions', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  subscriptionDate: timestamp('subscription_date').notNull().defaultNow()
}); 