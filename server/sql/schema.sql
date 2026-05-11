CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('artist', 'promoter')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS artist_profiles (
  user_id INT PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  stage_name VARCHAR(255),
  photo_url TEXT,
  bio TEXT,
  city VARCHAR(120),
  genre VARCHAR(120),
  spotify_url TEXT,
  instagram_url TEXT,
  points INT NOT NULL DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  geo_lat DOUBLE PRECISION,
  geo_lng DOUBLE PRECISION,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS promoter_profiles (
  user_id INT PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  entity_type VARCHAR(80),
  city VARCHAR(120),
  description TEXT,
  contact_email VARCHAR(255),
  geo_lat DOUBLE PRECISION,
  geo_lng DOUBLE PRECISION,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tracks (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(120),
  cover_url TEXT,
  audio_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tracks_user ON tracks (user_id);
CREATE INDEX IF NOT EXISTS idx_tracks_created ON tracks (created_at DESC);
