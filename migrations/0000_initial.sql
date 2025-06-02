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