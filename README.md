# Weather MCP Example
An example Weather MCP repository illustrating the fundamentals of the Model Context Protocol, including tool definitions, server setup, and querying weather data through an MCP interface.

## Features
- Fetch weather data for a given city
- Use the Open Meteo API and Open Geocoding API to get the weather data
- Use the standard input/output (stdio) transport for local development

# How It Works
The MCP server is defined in the `index.ts` file usinf McpServer class from the MCP SDK. It registers a tool to fetch the weather of a city using the geocoding API to get the latitude and longitude of the city and then uses the Open Meteo API to get the weather data.

Then a transport is created to communicate with the server using the standard input/output (stdio) transport for local development and the HTTP transport for remote deployment. That information will be used by the AI agent to send better responses to the user.

# How to Test

## MCP Inspector

Using `https://modelcontextprotocol.io/docs/tools/inspector#mcp-inspector` you can test the MCP server locally.

Run `npx -y @modelcontextprotocol/inspector npx -y tsx index.ts` to start the MCP server and then you can test the tool using the MCP inspector.

`npx -y @modelcontextprotocol/inspector` to start the MCP inspector and `npx -y tsx index.ts` is how to run your file.

## Claude Code

- Go to the Claude Code settings
- Developers
- Edit Config
  - Open the config file "claude_desktop_config.json"

```json
{
  "mcpServers": {
    "weatherMCP": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "<path to your MCP server file>"
      ]
    }
  }
}
```


## Cursor

Go to the Cursor settings 
Go to the "Tools & MCP" section
Click "Add Custom MCP" button and paste the following in the mcp.json file related to your MCP server:

```json
{
  "mcpServers": {
    "weatherMCP": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "<path to your MCP server file>"
      ]
    }
  }
}
```
