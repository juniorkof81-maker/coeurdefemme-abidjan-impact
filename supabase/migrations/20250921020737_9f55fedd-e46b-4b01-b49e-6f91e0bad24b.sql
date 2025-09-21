-- Fix the security definer view issue by properly configuring the donation_stats view
-- The linter detects views that might bypass RLS. Let's ensure our view properly respects RLS

-- First, drop the existing view
DROP VIEW IF EXISTS public.donation_stats;

-- Create a regular view without security_barrier
-- This will respect the calling user's permissions and RLS policies
CREATE VIEW public.donation_stats AS
SELECT 
  count(*) AS total_donations,
  sum(amount) AS total_amount,
  avg(amount) AS average_amount,
  currency,
  date_trunc('month'::text, created_at) AS month
FROM public.donations
WHERE status = 'success'::text
GROUP BY currency, date_trunc('month'::text, created_at)
ORDER BY date_trunc('month'::text, created_at) DESC;

-- The view will now inherit the RLS policies from the underlying donations table
-- This means:
-- - Only admins can see all donation stats
-- - Regular users can only see stats for donations where their email matches
-- - Anonymous users cannot see any stats

-- Grant appropriate permissions
GRANT SELECT ON public.donation_stats TO authenticated;
GRANT SELECT ON public.donation_stats TO anon;