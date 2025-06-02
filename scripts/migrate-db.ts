import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../server/src/db/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function migrateData() {
  // Source database (old Railway database)
  const sourcePool = new Pool({
    connectionString: process.env.OLD_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  // Target database (new Railway database)
  const targetPool = new Pool({
    connectionString: process.env.NEW_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const sourceDb = drizzle(sourcePool);
  const targetDb = drizzle(targetPool);

  try {
    console.log('Starting migration...');

    // First, create tables in the new database
    await targetPool.query(`
      -- Create users table
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create mentor_applications table
      CREATE TABLE IF NOT EXISTS mentor_applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        company TEXT DEFAULT 'Independent',
        specialization TEXT DEFAULT 'General',
        availability TEXT DEFAULT '1-2',
        status TEXT DEFAULT 'pending',
        experience TEXT DEFAULT '1-3',
        languages TEXT[] DEFAULT ARRAY[]::text[],
        skills TEXT[] DEFAULT ARRAY[]::text[],
        bio TEXT DEFAULT '',
        message TEXT DEFAULT '',
        motivation TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Get all users from source database
    const { rows: users } = await sourcePool.query('SELECT * FROM users');
    console.log(`Found ${users.length} users to migrate`);

    // Insert users into target database
    for (const user of users) {
      await targetPool.query(
        'INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)',
        [user.username, user.email, user.password, user.created_at, user.updated_at]
      );
    }
    console.log('Users migrated successfully');

    // Get all mentor applications from source database
    const { rows: applications } = await sourcePool.query('SELECT * FROM mentor_applications');
    console.log(`Found ${applications.length} mentor applications to migrate`);

    // Insert mentor applications into target database
    for (const app of applications) {
      await targetPool.query(
        `INSERT INTO mentor_applications (
          user_id, company, specialization, availability, status, 
          experience, languages, skills, bio, message, 
          motivation, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [
          app.user_id, app.company, app.specialization, app.availability, app.status,
          app.experience, app.languages, app.skills, app.bio, app.message,
          app.motivation, app.created_at, app.updated_at
        ]
      );
    }
    console.log('Mentor applications migrated successfully');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close database connections
    await sourcePool.end();
    await targetPool.end();
  }
}

migrateData(); 