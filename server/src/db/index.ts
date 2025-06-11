import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

// Create a client instance
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/portfol',
  ssl: { rejectUnauthorized: false }
});

// Connect to the database
async function initDb() {
  try {
    await client.connect();
    console.log('Successfully connected to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
}

// Initialize the database connection
initDb();

// Add error handling
client.on('error', (err) => {
  console.error('Unexpected error on database client:', err);
  process.exit(-1);
});

// Create the database instance with type casting
export const db = drizzle(client as any) as NodePgDatabase;

// Export the client for direct access if needed
export { client }; 