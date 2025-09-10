export const getInsuranceRecommendation = async (situation: string): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/get-insurance-recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situation }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Hubo un problema al obtener la recomendación.');
    }

    const data = await response.json();
    return data.recommendation;

  } catch (error: any) {
    console.error("Error calling get-insurance-recommendation function:", error);
    return "Lo siento, no pude generar una recomendación en este momento.";
  }
};

/**
 * Llama a la función Netlify para obtener una respuesta del asistente de IA para el FAQ.
 * @param question La pregunta del usuario.
 * @returns La respuesta de la IA.
 */
export const answerFaqQuestion = async (question: string): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/ask-faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from ask-faq function:", errorData.error);
      throw new Error(errorData.error || 'Hubo un problema al obtener la respuesta.');
    }

    const data = await response.json();
    return data.answer;

  } catch (error: any) {
    console.error("Error calling ask-faq function:", error);
    return "Lo siento, estoy teniendo problemas para conectarme al servicio de IA en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
};