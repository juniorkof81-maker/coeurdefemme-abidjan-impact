-- CRITICAL SECURITY FIX: Remove dangerous public access to donor data
DROP POLICY IF EXISTS "Donations are publicly viewable" ON public.donations;

-- Create a profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create a security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Create secure donation policies (replace the dangerous public one)
CREATE POLICY "Admins can view all donations" 
ON public.donations 
FOR SELECT 
USING (public.is_admin());

CREATE POLICY "Donors can view their own donations" 
ON public.donations 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND email = (SELECT email FROM public.profiles WHERE id = auth.uid()));

-- Update existing donation policy to be more secure
DROP POLICY IF EXISTS "Anyone can create donations" ON public.donations;
CREATE POLICY "Authenticated users can create donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create a public view for donation statistics (no personal data)
CREATE OR REPLACE VIEW public.donation_stats AS
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

-- Grant public access to the stats view only
GRANT SELECT ON public.donation_stats TO anon;
GRANT SELECT ON public.donation_stats TO authenticated;

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();