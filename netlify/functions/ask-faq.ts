import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Gemini API key is not configured.");
    return { statusCode: 500, body: JSON.stringify({ error: "La configuración del servicio de IA no está completa." }) };
  }

  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bad Request: No body provided." }) };
    }

    const { question } = JSON.parse(event.body);

    if (!question) {
      return { statusCode: 400, body: JSON.stringify({ error: "Bad Request: question is required." }) };
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const prompt = `Eres un asistente de IA para una compañía de seguros llamada InsurePro. Responde la siguiente pregunta de manera clara, amigable y concisa. La pregunta es: "${question}"`;

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.5,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      }
    };

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.text();
      console.error("Gemini API request failed:", errorBody);
      throw new Error("Hubo un error al procesar la solicitud con la IA.");
    }

    const data = await apiResponse.json();
    const text = data.candidates[0].content.parts[0].text;

    return {
      statusCode: 200,
      body: JSON.stringify({ answer: text }),
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