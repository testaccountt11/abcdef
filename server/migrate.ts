import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './db';

// This will automatically run needed migrations on the database
async function main() {
  console.log('Running migrations...');
  
  await migrate(db, { migrationsFolder: './drizzle' });
  
  console.log('Migrations completed successfully');
  process.exit(0);
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});