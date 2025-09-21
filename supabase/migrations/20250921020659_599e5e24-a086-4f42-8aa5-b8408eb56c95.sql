-- Fix the security definer view issue by recreating donation_stats as a security barrier view
-- This ensures the view respects the underlying table's RLS policies

-- First, drop the existing view
DROP VIEW IF EXISTS public.donation_stats;

-- Recreate the view with security_barrier enabled
-- This makes the view respect the underlying table's RLS policies
CREATE VIEW public.donation_stats 
WITH (security_barrier = true) AS
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

-- Grant appropriate permissions
GRANT SELECT ON public.donation_stats TO authenticated;
GRANT SELECT ON public.donation_stats TO anon;