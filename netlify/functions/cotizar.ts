import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiUrl = process.env.EFGROUP_API_URL;
  if (!apiUrl) {
    console.error("EF Group API URL is not configured.");
    return { statusCode: 500, body: JSON.stringify({ message: "Error en la configuración del servicio de cotización." }) };
  }

  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ message: "Cuerpo de la solicitud ausente." }) };
    }

    const { dateOfBirth, gender, faceAmount, paymentMode, product_item, locations } = JSON.parse(event.body);

    if (!dateOfBirth || !gender || !faceAmount || !paymentMode || product_item === undefined || locations === undefined) {
      return { statusCode: 400, body: JSON.stringify({ message: "Faltan campos obligatorios en la solicitud." }) };
    }

    const payload = {
      quote_type: "SINGLE_INDEPENDENT",
      locations: locations,
      face_amount: faceAmount,
      client_gender: gender,
      country_code: "CA",
      critical_illnesses: [],
      date_of_birth: new Date(dateOfBirth).toISOString(),
      filter: "DISPLAY_ALL_PRODUCTS",
      payment_mode: paymentMode,
      product_group: 0,
      product_item: product_item,
      report_type: "RANK_SURVEY",
      tabaco_types: {},
      underwriting_risk: "REGULAR",
    };

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Asumo que la API podría requerir una clave, la añadiré como variable de entorno
        'Authorization': `Bearer ${process.env.EFGROUP_API_KEY || ''}`
      },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.text();
      console.error("EF Group API request failed:", errorBody);
      throw new Error("Error al obtener la cotización del proveedor.");
    }

    const data = await apiResponse.json();
    
    // Extraer el conjunto de registros relevante
    const quotes = data?.record?.record_set || [];

    return {
      statusCode: 200,
      body: JSON.stringify(quotes),
      headers: {
        'Content-Type': 'application/json'
      }
    };

  } catch (error: any) {
    console.error("Handler Error:", error);
    return { statusCode: 500, body: JSON.stringify({ message: error.message || "Error interno del servidor." }) };
  }
};

export { handler };
