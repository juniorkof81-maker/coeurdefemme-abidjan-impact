import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { message, context } = await req.json();
    
    // Get API key from environment
    const apiKey = Deno.env.get('API_KEY');
    
    if (!apiKey) {
      throw new Error('API_KEY not configured');
    }

    // Prepare the system prompt for ONG COEUR DE FEMME
    const systemPrompt = `Tu es l'assistant virtuel officiel d'ONG COEUR DE FEMME, une organisation humanitaire basée à Cocody, Abidjan, Côte d'Ivoire.

INFORMATIONS IMPORTANTES:
- Mission: Donner du sourire aux enfants, femmes et hommes
- Combat: Visiter le plus d'endroits possible pour aider
- Contact: +225 0709347858, coeurdefemme9@gmail.com
- Localisation: Cocody, Abidjan, Côte d'Ivoire

SERVICES PROPOSÉS:
- Dons (Orange Money, MTN Money, Wave, PayPal)
- Bénévolat
- Visites à domicile et dans les centres
- Distribution de paniers alimentaires, vêtements et jouets
- Ateliers de sensibilisation
- Événements festifs (Noël, rentrée scolaire)

INSTRUCTIONS:
- Réponds en français uniquement
- Sois chaleureux, empathique et bienveillant
- Fournis des informations précises sur l'ONG
- Encourage les dons et le bénévolat
- Donne les coordonnées de contact quand approprié
- Si tu ne sais pas quelque chose, oriente vers le contact direct
- Reste dans le contexte humanitaire de l'ONG`;

    // Try OpenAI API first (most common)
    try {
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (openAIResponse.ok) {
        const data = await openAIResponse.json();
        const response = data.choices[0].message.content;
        
        console.log('OpenAI response success');
        return new Response(JSON.stringify({ response }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (openAIError) {
      console.log('OpenAI failed, trying Perplexity...', openAIError);
    }

    // Try Perplexity API as fallback
    try {
      const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 500,
        }),
      });

      if (perplexityResponse.ok) {
        const data = await perplexityResponse.json();
        const response = data.choices[0].message.content;
        
        console.log('Perplexity response success');
        return new Response(JSON.stringify({ response }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (perplexityError) {
      console.log('Perplexity failed', perplexityError);
    }

    // Fallback response if APIs fail
    const fallbackResponse = getFallbackResponse(message);
    return new Response(JSON.stringify({ response: fallbackResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return new Response(JSON.stringify({ 
      error: 'Une erreur est survenue. Veuillez contacter directement l\'ONG au +225 0709347858' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('don') || lowerMessage.includes('donner')) {
    return "Merci pour votre intérêt ! Vous pouvez faire un don via Orange Money, MTN Money, Wave ou PayPal. Contactez-nous au +225 0709347858 ou coeurdefemme9@gmail.com pour plus d'informations.";
  }
  
  if (lowerMessage.includes('bénévole') || lowerMessage.includes('aider') || lowerMessage.includes('rejoindre')) {
    return "C'est formidable que vous souhaitiez nous rejoindre ! Nous recherchons toujours des bénévoles motivés. Contactez-nous au +225 0709347858 ou coeurdefemme9@gmail.com pour en savoir plus.";
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('téléphone') || lowerMessage.includes('email')) {
    return "Vous pouvez nous contacter au +225 0709347858 ou par email à coeurdefemme9@gmail.com. Nous sommes basés à Cocody, Abidjan, Côte d'Ivoire.";
  }
  
  if (lowerMessage.includes('mission') || lowerMessage.includes('objectif')) {
    return "Notre mission est de donner du sourire aux enfants, femmes et hommes. Nous visitons les familles dans le besoin pour distribuer de l'aide et de l'espoir. Contactez-nous pour en savoir plus !";
  }
  
  return "Bonjour ! Je suis l'assistant d'ONG COEUR DE FEMME. Nous aidons les familles dans le besoin en Côte d'Ivoire. Pour plus d'informations, contactez-nous au +225 0709347858 ou coeurdefemme9@gmail.com.";
}