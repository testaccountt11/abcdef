import type { Config } from 'drizzle-kit';

export default {
  schema: './server/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/portfol'
  }
} satisfies Config;
