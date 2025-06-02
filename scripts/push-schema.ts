import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function pushSchema() {
  // Connect to the database
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const db = drizzle(pool);

  try {
    // Apply migrations
    console.log('Starting schema migration...');
    await migrate(db, { migrationsFolder: './migrations' });
    console.log('Schema migration completed successfully!');
  } catch (error) {
    console.error('Error during schema migration:', error);
  } finally {
    // Close the connection
    await pool.end();
  }
}

pushSchema(); 