
import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Estructura de la respuesta de la IA
interface AIRecommendation {
  identified_insurance_type: "Vida" | "Auto" | "Negocios" | "Viajes" | "Hogar" | "Desconocido";
  summary: string;
  recommendation_title: string;
  recommendation_details: string;
  missing_info_prompt: string;
  next_step_cta: string;
}

// Nueva función que llama a la API de Gemini
const getRealAIResponse = async (userText: string): Promise<AIRecommendation> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Gemini API key is not configured.");
    throw new Error("La configuración del servicio de IA no está completa. Por favor, contacta al soporte.");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const prompt = `
    Actúa como un asesor experto de seguros para InsurePro AI en Canadá. Tu tarea es analizar la descripción de un cliente y responder únicamente con un objeto JSON válido, sin usar markdown.

    El cliente describe su situación en el siguiente texto:
    "{user_text}"

    Tu respuesta JSON debe tener la siguiente estructura:
    {
      "identified_insurance_type": "Vida" | "Auto" | "Negocios" | "Viajes" | "Hogar" | "Desconocido",
      "summary": "Un resumen conciso de lo que has entendido de la situación del cliente.",
      "recommendation_title": "Un título para la recomendación, ej: 'Recomendación Inicial de Cobertura'",
      "recommendation_details": "Una recomendación preliminar y amigable. Explica qué tipo de póliza es un buen punto de partida y por qué. Si es relevante, sugiere un rango de cobertura.",
      "missing_info_prompt": "Una pregunta amable sobre qué información adicional se necesitaría para una cotización precisa, ej: 'Para afinar esto, un experto necesitaría conocer detalles sobre...'",
      "next_step_cta": "El texto para el botón de siguiente paso, ej: 'Conectar con un Experto'"
    }

    Analiza el texto, extrae los datos clave (edad, ubicación, profesión, etc.) y genera la respuesta JSON. Sé específico para Canadá (menciona provincias si el usuario lo hace). Si el texto es ambiguo, ajústalo lo mejor que puedas.
  `;

  const requestBody = {
    contents: [{
      parts: [{ text: prompt.replace('{user_text}', userText) }]
    }],
    generationConfig: {
      temperature: 0.6,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
      response_mime_type: "application/json",
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gemini API request failed:", errorBody);
    throw new Error("Hubo un error al procesar la solicitud con la IA. Por favor, inténtalo de nuevo más tarde.");
  }

  const data = await response.json();
  
  const responseText = data.candidates[0].content.parts[0].text;
  const parsedResponse: AIRecommendation = JSON.parse(responseText);

  return parsedResponse;
};


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bad Request: No body provided." }) };
    }

    const { userSituation } = JSON.parse(event.body);

    if (!userSituation) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bad Request: userSituation is required." }) };
    }

    const realResponse = await getRealAIResponse(userSituation);

    return {
      statusCode: 200,
      body: JSON.stringify(realResponse),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error: any) {
    console.error("Handler Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message || "Internal Server Error" }) };
  }
};

export { handler };
