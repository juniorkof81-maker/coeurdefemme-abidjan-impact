-- Add Row Level Security to donation_stats view
-- This ensures the view respects user permissions properly

-- Enable RLS on the donation_stats view
ALTER VIEW public.donation_stats SET (security_barrier = true);

-- Create RLS policies for the donation_stats view
-- Only admins can view donation statistics
CREATE POLICY "Only admins can view donation stats" 
ON public.donation_stats
FOR SELECT 
USING (is_admin());

-- Note: Since this is a view aggregating data from the donations table,
-- and the donations table already has proper RLS policies,
-- this additional security layer ensures only authorized users can access aggregated statistics