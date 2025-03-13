-- Disable foreign key checks for setup
PRAGMA foreign_keys = OFF;

-- Drop existing tables in reverse order
DROP TABLE IF EXISTS users;

-- Enable foreign key checks
PRAGMA foreign_keys = ON;

-- Base users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  logto_id TEXT UNIQUE,
  created_at NUMERIC DEFAULT CURRENT_TIMESTAMP,
  role TEXT DEFAULT 'user',
  settings TEXT -- 
);


-- Create sample user for testing
INSERT INTO users (id, email, first_name, last_name, role)
VALUES ('e6h0n4lc', 'myaicour@gmail.com', 'Test', 'User', 'admin');
