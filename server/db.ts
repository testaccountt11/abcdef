import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err.message);
    return;
  }
  console.log('Successfully connected to PostgreSQL database');
  release();
});

// Create a Drizzle ORM instance with the schema
const db = drizzle(pool, { schema });

// Export both the db instance and pool
export { db, pool };