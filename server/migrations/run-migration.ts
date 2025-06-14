import { Client } from 'pg';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config();

async function runMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const migrationFile = path.join(__dirname, '0003_add_stats_and_achievements.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');

    await client.query(sql);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration(); 