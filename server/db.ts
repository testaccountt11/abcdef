import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DATABASE_URL } from './config';

const poolConfig = {
  connectionString: DATABASE_URL,
  // Railway requires SSL
  ssl: {
    rejectUnauthorized: false
  },
  // Connection pool settings optimized for Railway
  max: 10, // Railway recommends smaller pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000, // Increased timeout for better stability
  maxUses: 7500,
  // Retry settings adjusted for Railway
  retryDelay: 2000, // Increased delay between retries
  maxRetries: 5, // More retries for Railway's connection patterns
  // Additional settings for connection stability
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000
};

export const pool = new Pool(poolConfig);

// Enhanced error handling for Railway connection issues
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client:', err);
  if (err.code === 'ECONNRESET' || err.message.includes('Connection terminated')) {
    console.log('Connection reset detected - attempting to reconnect...');
    // Remove the errored client and let the pool create a new one
    client?.release(true);
    return;
  }
});

pool.on('connect', () => {
  console.log('New client connected to Railway database');
});

pool.on('remove', () => {
  console.log('Client removed from pool');
});

export const db = drizzle(pool);

// Test database connection with Railway-specific error handling
export async function testConnection() {
  let retries = poolConfig.maxRetries;
  while (retries > 0) {
    try {
      const client = await pool.connect();
      console.log('Successfully connected to Railway PostgreSQL database');
      client.release();
      return true;
    } catch (err: any) {
      retries--;
      console.error(`Connection attempt failed (${retries} remaining):`, err.message);
      
      // Railway-specific error handling
      if (err.message.includes('too many clients')) {
        console.log('Railway connection limit reached - waiting longer before retry');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        continue;
      }
      
      if (retries === 0) {
        console.error('Failed to connect to Railway database after all retries:', err);
        throw err;
      }
      
      console.log(`Retrying Railway connection in ${poolConfig.retryDelay/1000}s...`);
      await new Promise(resolve => setTimeout(resolve, poolConfig.retryDelay));
    }
  }
  return false;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await pool.end();
    console.log('Railway database pool has been closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error during Railway database pool shutdown:', err);
    process.exit(1);
  }
});