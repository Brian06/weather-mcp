import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';

/**
 * Fetch coordinates for a city using the geocoding API
 */
async function getCoordinates(city: string): Promise<{ latitude: number; longitude: number } | null> {
  const geocodingResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
  );
  const geocodingData = await geocodingResponse.json();

  if (!geocodingData.results || geocodingData.results.length === 0) {
    return null;
  }

  const { latitude, longitude } = geocodingData.results[0];
  return { latitude, longitude };
}

/**
 * Fetch weather data for given coordinates
 */
async function getWeatherData(latitude: number, longitude: number) {
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain&forecast_days=1`
  );
  return await weatherResponse.json();
}

/**
 * Format weather data into structured response
 */
function formatWeatherResponse(weatherData: any) {
  return {
    weather: {
      temperature: weatherData.current?.temperature_2m ?? 0,
      precipitation: weatherData.current?.precipitation ?? 0,
      rain: weatherData.current?.rain ?? 0,
      is_day: weatherData.current?.is_day ?? 0
    }
  };
}

/**
 * Create a new MCP server
 */
const server = new McpServer({
  name: 'weatherMCPExample',
  version: '1.0.0'
});

/**
 * Register a tool to fetch the weather of a city
 */
server.registerTool(
  'fetch-weather', 
  {
    title: 'Weather Fetcher',
    description: 'Fetch the weather of a city',
    inputSchema: {
      city: z.string().describe('The city to fetch the weather for'),
    },
    outputSchema: { 
      weather: z.object({ 
        temperature: z.number().describe('Current temperature in Celsius'),
        precipitation: z.number().describe('Current precipitation in mm'),
        rain: z.number().describe('Current rain in mm'),
        is_day: z.number().describe('Whether it is day (1) or night (0)')
      }) 
    },
  },
  async ({ city }) => {
    // Get coordinates for the city
    const coordinates = await getCoordinates(city);
    
    if (!coordinates) {
      return {
        content: [{ type: 'text', text: `No location found for city: ${city}` }],
        structuredContent: { error: `No location found for city: ${city}` }
      };
    }

    // Fetch weather data using coordinates
    const weatherData = await getWeatherData(coordinates.latitude, coordinates.longitude);
    
    // Format the structured response
    const structuredResponse = formatWeatherResponse(weatherData);
    
    return {
      content: [{ type: 'text', text: JSON.stringify(weatherData, null, 2) }],
      structuredContent: structuredResponse
    };
  }
);

/**
 * Create a new transport to communicate with the server 
 * using the standard input/output (stdio) transport for local development
 * and the HTTP transport for remote deployment.
 */
const transport = new StdioServerTransport();
await server.connect(transport);
