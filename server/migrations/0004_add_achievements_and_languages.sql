-- Add achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  progress INTEGER DEFAULT 0,
  max_progress INTEGER NOT NULL,
  icon VARCHAR(50) NOT NULL,
  unlocked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add user_languages table
CREATE TABLE IF NOT EXISTS user_languages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  name VARCHAR(50) NOT NULL,
  level VARCHAR(10) NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native')),
  certificate TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_languages_user_id ON user_languages(user_id); 