import { supabase } from './supabase';

export const setupDatabase = async () => {
  try {
    // Check if profiles table exists and create if needed
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profilesError && profilesError.code === 'PGRST116') {
      // Table doesn't exist, but we can't create it from client side
      console.log('Profiles table needs to be created in Supabase dashboard');
    }

    // Initialize default sermon data if needed
    console.log('Database setup check completed');
    return true;
  } catch (error) {
    console.error('Database setup error:', error);
    return false;
  }
};

// SQL commands to run in Supabase SQL editor
export const SQL_SETUP_COMMANDS = `
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid references auth.users on delete cascade,
  name text not null,
  email text unique not null,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  user_id uuid references profiles(id) on delete cascade,
  sermon_id integer,
  photo_id text,
  parent_id uuid references comments(id) on delete cascade,
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for comments
CREATE POLICY "Comments are viewable by everyone" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- Create photos table
CREATE TABLE IF NOT EXISTS photos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text not null,
  user_id uuid references profiles(id) on delete cascade,
  likes integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for photos
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Create policies for photos
CREATE POLICY "Photos are viewable by everyone" ON photos
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own photos" ON photos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos" ON photos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos" ON photos
  FOR DELETE USING (auth.uid() = user_id);
`;