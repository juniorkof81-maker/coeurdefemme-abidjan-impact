import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY');

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
    const { email, amount, donorName, message } = await req.json();

    console.log('Processing donation:', { email, amount, donorName });

    // Initialize transaction with Paystack
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack expects amount in kobo (multiply by 100)
        currency: 'XOF', // West African CFA franc
        metadata: {
          donor_name: donorName,
          message: message || '',
          organization: 'ONG COEUR DE FEMME'
        },
        callback_url: `${req.headers.get('origin')}/donation-success`,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Paystack API error:', data);
      throw new Error(data.message || 'Failed to initialize payment');
    }

    console.log('Payment initialized successfully:', data.data.reference);

    return new Response(JSON.stringify({
      success: true,
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in process-donation function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});