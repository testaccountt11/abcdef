CREATE TABLE IF NOT EXISTS user_stats (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  courses_in_progress INTEGER DEFAULT 0,
  certificates_earned INTEGER DEFAULT 0,
  mentor_sessions INTEGER DEFAULT 0,
  opportunities_saved INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  progress INTEGER DEFAULT 0,
  max_progress INTEGER NOT NULL,
  icon VARCHAR(50) NOT NULL,
  unlocked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_achievements_unlocked_at ON achievements(unlocked_at);

-- Add some default achievements for all existing users
INSERT INTO achievements (user_id, name, description, progress, max_progress, icon)
SELECT 
  u.id,
  'Profile Pioneer',
  'Complete your profile information',
  CASE 
    WHEN u.bio IS NOT NULL AND u.location IS NOT NULL AND u.website IS NOT NULL THEN 100
    WHEN u.bio IS NOT NULL OR u.location IS NOT NULL OR u.website IS NOT NULL THEN 50
    ELSE 0
  END,
  100,
  'trophy'
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM achievements a 
  WHERE a.user_id = u.id AND a.name = 'Profile Pioneer'
);

INSERT INTO achievements (user_id, name, description, progress, max_progress, icon)
SELECT 
  u.id,
  'Skill Master',
  'Add your professional skills',
  COALESCE((
    SELECT COUNT(*) * 20 
    FROM skills s 
    WHERE s.user_id = u.id
  ), 0),
  100,
  'medal'
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM achievements a 
  WHERE a.user_id = u.id AND a.name = 'Skill Master'
);

INSERT INTO achievements (user_id, name, description, progress, max_progress, icon)
SELECT 
  u.id,
  'Language Enthusiast',
  'Add your language proficiencies',
  COALESCE((
    SELECT COUNT(*) * 25 
    FROM languages l 
    WHERE l.user_id = u.id
  ), 0),
  100,
  'star'
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM achievements a 
  WHERE a.user_id = u.id AND a.name = 'Language Enthusiast'
); 