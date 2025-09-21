import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reference } = await req.json();

    console.log('Verifying donation:', reference);

    // Verify transaction with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack verification error:', data);
      throw new Error(data.message || 'Failed to verify payment');
    }

    if (data.data.status === 'success') {
      // Initialize Supabase client
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Store donation in database
      const { error: insertError } = await supabase
        .from('donations')
        .insert({
          reference: data.data.reference,
          email: data.data.customer.email,
          amount: data.data.amount / 100, // Convert back from kobo
          currency: data.data.currency,
          status: data.data.status,
          donor_name: data.data.metadata?.donor_name,
          message: data.data.metadata?.message,
          paystack_data: data.data,
          created_at: new Date().toISOString()
        });

      if (insertError) {
        console.error('Database insert error:', insertError);
        // Don't throw error, payment was successful
      }

      console.log('Donation verified and stored successfully');
    }

    return new Response(JSON.stringify({
      success: true,
      status: data.data.status,
      amount: data.data.amount / 100,
      customer: data.data.customer,
      metadata: data.data.metadata
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in verify-donation function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});