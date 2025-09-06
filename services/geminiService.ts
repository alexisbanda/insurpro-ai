
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
const model = "gemini-2.5-flash";

const callGeminiAPI = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "El servicio de IA no está configurado. Falta la clave de API.";
  }
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo siento, estoy teniendo problemas para conectarme al servicio de IA en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
};

export const getInsuranceRecommendation = async (situation: string): Promise<string> => {
  const prompt = `Eres un asesor de seguros experto. Un cliente potencial ha descrito su situación como: "${situation}". Basado en esto, ¿qué tipo de seguro (Vida, Hogar, Auto o Negocios) sería más importante que considerara primero? Proporciona una recomendación breve y amigable y explica tu razonamiento en 2-3 frases. Comienza tu respuesta con el tipo de seguro recomendado en negrita (ej., **Seguro de Vida**).`;
  return callGeminiAPI(prompt);
};

export const summarizeTestimonials = async (testimonialText: string): Promise<string> => {
  const prompt = `Eres un asistente útil. Por favor, lee los siguientes testimonios de clientes y proporciona un resumen breve con viñetas de los temas positivos clave. Céntrate en aspectos como la simplicidad, el equipo experto, los ahorros y el buen servicio. Los testimonios son:\n\n${testimonialText}`;
  return callGeminiAPI(prompt);
};

export const answerFaqQuestion = async (question: string): Promise<string> => {
  const prompt = `Eres un asistente de IA para una compañía de seguros llamada InsurePro. Responde la siguiente pregunta de manera clara, amigable y concisa. La pregunta es: "${question}"`;
  return callGeminiAPI(prompt);
};
