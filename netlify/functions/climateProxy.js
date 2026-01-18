export async function handler(event) {
  const endpoint = event.queryStringParameters?.endpoint;

  const ALLOWED_ENDPOINTS = {
    temperature: "https://global-warming.org/api/temperature-api",
    co2: "https://global-warming.org/api/co2-api",
    methane: "https://global-warming.org/api/methane-api",
    no2: "https://global-warming.org/api/nitrous-oxide-api",
    arctic: "https://global-warming.org/api/arctic-api",
  };

  if (!endpoint || !ALLOWED_ENDPOINTS[endpoint]) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid endpoint" }),
    };
  }

  try {
    const response = await fetch(ALLOWED_ENDPOINTS[endpoint]);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
}
