-- Fix the security definer view issue by removing SECURITY DEFINER from the view
-- and ensuring the view only shows aggregated data without any user-specific info

DROP VIEW IF EXISTS public.donation_stats;

-- Create a simple view without SECURITY DEFINER (views don't need it)
CREATE VIEW public.donation_stats AS
SELECT 
  COUNT(*) as total_donations,
  SUM(amount) as total_amount,
  AVG(amount) as average_amount,
  currency,
  DATE_TRUNC('month', created_at) as month
FROM public.donations 
WHERE status = 'success'
GROUP BY currency, DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- Grant public access to the stats view only (this is safe as it contains no personal data)
GRANT SELECT ON public.donation_stats TO anon;
GRANT SELECT ON public.donation_stats TO authenticated;