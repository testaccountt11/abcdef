import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

async function applyMigration() {
  // Connect to the database
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const db = drizzle(pool);

  try {
    // Read the migration file
    const migrationPath = path.join(process.cwd(), '..', 'migrations', '0002_mentor_applications_update.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    // Execute the migration
    console.log('Starting to apply migration...');
    console.log('Migration SQL:', migrationSQL);
    
    await pool.query(migrationSQL);
    
    console.log('Migration completed successfully!');

    // Verify the table exists
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'mentor_applications'
      );
    `);
    
    if (result.rows[0].exists) {
      console.log('Verified: mentor_applications table exists!');
      
      // Check table structure
      const columns = await pool.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = 'mentor_applications'
        ORDER BY ordinal_position;
      `);
      
      console.log('Table structure:');
      console.table(columns.rows);
    } else {
      console.log('Warning: Table was not created successfully');
    }
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close the connection
    await pool.end();
  }
}

applyMigration(); 