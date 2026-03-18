-- 1. Create Levels table
CREATE TABLE public.levels (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    focus TEXT NOT NULL,
    order_index INTEGER NOT NULL
);

-- 2. Create Branches table
CREATE TABLE public.branches (
    id TEXT PRIMARY KEY,
    level_id TEXT NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    focus TEXT,
    "when" TEXT,
    structure TEXT NOT NULL,
    examples JSONB NOT NULL DEFAULT '[]'::jsonb,
    order_index INTEGER NOT NULL
);

-- 3. Create Sentences table
CREATE TABLE public.sentences (
    id TEXT PRIMARY KEY,
    branch_id TEXT NOT NULL REFERENCES public.branches(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    polish TEXT NOT NULL,
    english JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 4. Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sentences ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (anon users)
CREATE POLICY "Allow public read access on levels" ON public.levels FOR SELECT USING (true);
CREATE POLICY "Allow public read access on branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Allow public read access on sentences" ON public.sentences FOR SELECT USING (true);

-- Do not grant anon write access in production.
-- Run seed and migration scripts with SUPABASE_SERVICE_ROLE_KEY instead.
