-- Remove public read access from students table (contains PII: email, phone)
DROP POLICY IF EXISTS "Allow public read access" ON public.students;

-- Remove public read access from leads table (contains sensitive business data)
DROP POLICY IF EXISTS "Allow public read access" ON public.leads;

-- Create restrictive policies for students table
-- Only authenticated users can view students
CREATE POLICY "Authenticated users can view students"
ON public.students
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can insert students
CREATE POLICY "Authenticated users can insert students"
ON public.students
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users can update students
CREATE POLICY "Authenticated users can update students"
ON public.students
FOR UPDATE
TO authenticated
USING (true);

-- Create restrictive policies for leads table
-- Only authenticated users can view leads
CREATE POLICY "Authenticated users can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can insert leads
CREATE POLICY "Authenticated users can insert leads"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated users can update leads
CREATE POLICY "Authenticated users can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true);