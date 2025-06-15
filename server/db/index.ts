import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Добавим параметры для лучшей обработки соединений
  max: 20, // максимальное количество клиентов в пуле
  idleTimeoutMillis: 30000, // время простоя до закрытия соединения
  connectionTimeoutMillis: 2000, // время ожидания соединения
});

// Добавим обработку ошибок для пула
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Добавим функцию для проверки соединения
export const checkDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
};

export const db = drizzle(pool); 