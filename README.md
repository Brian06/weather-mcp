# Weather MCP Example
An example Weather MCP repository illustrating the fundamentals of the Model Context Protocol, including tool definitions, server setup, and querying weather data through an MCP interface.

## Overview
This repository contains an example Weather MCP implementation using the Model Context Protocol (MCP) SDK. The MCP is a protocol for building AI agents that can interact with external tools and services.

## Features
- Fetch weather data for a given city
- Use the Open Meteo API to get the weather data
- Use the standard input/output (stdio) transport for local development
- Use the HTTP transport for remote deployment

# How It Works
The MCP server is defined in the `index.ts` file usinf McpServer class from the MCP SDK. It registers a tool to fetch the weather of a city using the geocoding API to get the latitude and longitude of the city and then uses the Open Meteo API to get the weather data.

Then a transport is created to communicate with the server using the standard input/output (stdio) transport for local development and the HTTP transport for remote deployment. That information will be used by the AI agent to send better responses to the user.

# How to Test

Using `https://modelcontextprotocol.io/docs/tools/inspector#mcp-inspector` you can test the MCP server locally.

Run `npx -y @modelcontextprotocol/inspector npx -y tsx index.ts` to start the MCP server and then you can test the tool using the MCP inspector.

`npx -y @modelcontextprotocol/inspector` to start the MCP inspector and `npx -y tsx index.ts` is how to run your file.
