-- Projects Table
CREATE TABLE projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('all', 'web', 'mobile', 'design', 'other')),
    tech_stack TEXT[] DEFAULT '{}',
    thumbnail TEXT,
    github_link TEXT,
    live_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table
CREATE TABLE skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level BETWEEN 0 AND 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences Table
CREATE TABLE experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications Table
CREATE TABLE certifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Books Table
CREATE TABLE books (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('reading', 'read')),
    rating INTEGER CHECK (rating BETWEEN 0 AND 5),
    thumbnail TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) - Optional, you can adjust as needed
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (for demo purposes - adjust for production!)
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON certifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON books FOR SELECT USING (true);

-- Note: For production, you should add authentication and restrict write access!
-- These policies allow anyone to modify data (for demo purposes only)
CREATE POLICY "Allow public write access" ON projects FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON skills FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON experiences FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON certifications FOR ALL USING (true);
CREATE POLICY "Allow public write access" ON books FOR ALL USING (true);
