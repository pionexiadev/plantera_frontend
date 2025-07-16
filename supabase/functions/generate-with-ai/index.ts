
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();

    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not configured");
      return new Response(JSON.stringify({ error: "OpenAI API key not configured" }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: "Vous êtes un assistant agricole compétent spécialisé dans les recommandations personnalisées pour les exploitations agricoles." },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 1000,
        top_p: 0.9,
      }),
    });

    if (!completionResponse.ok) {
      const errorText = await completionResponse.text();
      console.error("OpenAI API error:", errorText);
      return new Response(JSON.stringify({ error: "Erreur de l'API OpenAI: " + errorText }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }

    const completionData = await completionResponse.json();
    const generatedText = completionData.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ generatedText }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-with-ai function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
