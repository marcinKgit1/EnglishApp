-- Run this in Supabase SQL Editor after creating tables.
-- It removes unsafe anon insert policies and keeps public read-only access.

-- Ensure RLS is enabled.
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sentences ENABLE ROW LEVEL SECURITY;

-- Drop unsafe write policies if they exist.
DROP POLICY IF EXISTS "Allow anon insert on levels" ON public.levels;
DROP POLICY IF EXISTS "Allow anon insert on branches" ON public.branches;
DROP POLICY IF EXISTS "Allow anon insert on sentences" ON public.sentences;

-- Keep public read access policies (idempotent recreation).
DROP POLICY IF EXISTS "Allow public read access on levels" ON public.levels;
DROP POLICY IF EXISTS "Allow public read access on branches" ON public.branches;
DROP POLICY IF EXISTS "Allow public read access on sentences" ON public.sentences;

CREATE POLICY "Allow public read access on levels" ON public.levels
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on branches" ON public.branches
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on sentences" ON public.sentences
  FOR SELECT USING (true);