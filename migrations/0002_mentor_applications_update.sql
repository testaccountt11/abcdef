-- Drop existing table if exists
DROP TABLE IF EXISTS mentor_applications CASCADE;

-- Create mentor_applications table with updated structure
CREATE TABLE mentor_applications (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  title TEXT,
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
  resume_file TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 