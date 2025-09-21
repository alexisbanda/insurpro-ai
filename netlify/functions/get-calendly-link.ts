import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  const calendlyLink = process.env.CALENDLY_EVENT_LINK;

  if (!calendlyLink) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Calendly link not configured' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ link: calendlyLink }),
  };
};

export { handler };
