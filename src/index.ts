#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { ILevelClient, ILevelConfig } from './ilevel-client.js';
import { z } from 'zod';

/**
 * S&P Global iLevel MCP Server
 *
 * This MCP server provides integration with the S&P Global iLevel API for
 * private markets portfolio monitoring and management.
 *
 * TODO: Update based on actual iLevel API documentation once available
 */

// Validate environment variables
const ILEVEL_BASE_URL = process.env.ILEVEL_BASE_URL;
const ILEVEL_USERNAME = process.env.ILEVEL_USERNAME;
const ILEVEL_PASSWORD = process.env.ILEVEL_PASSWORD;
const ILEVEL_SANDBOX = process.env.ILEVEL_SANDBOX === 'true';

if (!ILEVEL_BASE_URL || !ILEVEL_USERNAME || !ILEVEL_PASSWORD) {
  console.error('ERROR: Missing required environment variables:');
  console.error('  - ILEVEL_BASE_URL: Base URL for iLevel API');
  console.error('  - ILEVEL_USERNAME: Your iLevel API username');
  console.error('  - ILEVEL_PASSWORD: Your iLevel API password');
  console.error('  - ILEVEL_SANDBOX: (optional) Set to "true" for sandbox environment');
  process.exit(1);
}

// Initialize iLevel client
const config: ILevelConfig = {
  baseUrl: ILEVEL_BASE_URL,
  username: ILEVEL_USERNAME,
  password: ILEVEL_PASSWORD,
  isSandbox: ILEVEL_SANDBOX,
};

const iLevelClient = new ILevelClient(config);

// Create MCP server
const server = new Server(
  {
    name: 'ilevel-mcp-server',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// ==================== Helper Functions ====================

function formatResponse(data: any): { content: Array<{ type: string; text: string }> } {
  return {
    content: [
      {
        type: 'text',
        text: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
      },
    ],
  };
}

function handleError(error: any): never {
  if (error.response) {
    throw new McpError(
      ErrorCode.InternalError,
      `iLevel API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
    );
  } else if (error.request) {
    throw new McpError(ErrorCode.InternalError, 'No response received from iLevel API');
  } else {
    throw new McpError(ErrorCode.InternalError, `Request failed: ${error.message}`);
  }
}

// ==================== List Tools ====================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Connection Test
      {
        name: 'test_connection',
        description: 'Test connection to the iLevel API',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },

      // Users
      {
        name: 'get_users',
        description: 'Get a list of users from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
            },
            pageSize: {
              type: 'number',
              description: 'Number of records per page',
            },
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },
      {
        name: 'get_user',
        description: 'Get details of a specific user by ID',
        inputSchema: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'User ID',
            },
          },
          required: ['userId'],
        },
      },

      // Clients
      {
        name: 'get_clients',
        description: 'Get a list of clients from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
            },
            pageSize: {
              type: 'number',
              description: 'Number of records per page',
            },
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },
      {
        name: 'get_client',
        description: 'Get details of a specific client by ID',
        inputSchema: {
          type: 'object',
          properties: {
            clientId: {
              type: 'string',
              description: 'Client ID',
            },
          },
          required: ['clientId'],
        },
      },

      // Portfolios
      {
        name: 'get_portfolios',
        description: 'Get portfolio data from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
            },
            pageSize: {
              type: 'number',
              description: 'Number of records per page',
            },
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },

      // Assets & Funds
      {
        name: 'get_assets',
        description: 'Get assets from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },
      {
        name: 'get_funds',
        description: 'Get funds from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },
      {
        name: 'get_investments',
        description: 'Get investments from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },

      // Documents
      {
        name: 'get_documents',
        description: 'Get documents from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            page: {
              type: 'number',
              description: 'Page number for pagination',
            },
            pageSize: {
              type: 'number',
              description: 'Number of records per page',
            },
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },
      {
        name: 'get_document',
        description: 'Get a specific document by ID',
        inputSchema: {
          type: 'object',
          properties: {
            documentId: {
              type: 'string',
              description: 'Document ID',
            },
          },
          required: ['documentId'],
        },
      },

      // Valuations
      {
        name: 'get_valuations',
        description: 'Get valuations from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },
      {
        name: 'create_valuation',
        description: 'Create or update a valuation in iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              description: 'Valuation data (JSON object)',
            },
          },
          required: ['data'],
        },
      },

      // Calculations
      {
        name: 'get_calculations',
        description: 'Get calculations from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            filters: {
              type: 'object',
              description: 'Optional filters (JSON object)',
            },
          },
        },
      },

      // Data Retrieval
      {
        name: 'query_data',
        description: 'Query data from iLevel using the data retrieval API',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'object',
              description: 'Query parameters (JSON object)',
            },
          },
          required: ['query'],
        },
      },

      // Webhooks
      {
        name: 'get_webhooks',
        description: 'Get configured webhooks from iLevel',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'create_webhook',
        description: 'Create a new webhook in iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              description: 'Webhook URL',
            },
            events: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of event types to subscribe to',
            },
            description: {
              type: 'string',
              description: 'Optional webhook description',
            },
          },
          required: ['url', 'events'],
        },
      },
      {
        name: 'delete_webhook',
        description: 'Delete a webhook from iLevel',
        inputSchema: {
          type: 'object',
          properties: {
            webhookId: {
              type: 'string',
              description: 'Webhook ID to delete',
            },
          },
          required: ['webhookId'],
        },
      },

      // Generic Request
      {
        name: 'custom_request',
        description: 'Make a custom request to any iLevel API endpoint (useful for endpoints not yet implemented)',
        inputSchema: {
          type: 'object',
          properties: {
            method: {
              type: 'string',
              enum: ['GET', 'POST', 'PUT', 'DELETE'],
              description: 'HTTP method',
            },
            endpoint: {
              type: 'string',
              description: 'API endpoint path (e.g., /users, /documents-api)',
            },
            data: {
              type: 'object',
              description: 'Optional request body data (JSON object)',
            },
          },
          required: ['method', 'endpoint'],
        },
      },
    ],
  };
});

// ==================== Call Tool ====================

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      // Connection Test
      case 'test_connection': {
        const isConnected = await iLevelClient.testConnection();
        return formatResponse({
          connected: isConnected,
          message: isConnected ? 'Successfully connected to iLevel API' : 'Failed to connect to iLevel API',
        });
      }

      // Users
      case 'get_users': {
        const data = await iLevelClient.getUsers(args as any);
        return formatResponse(data);
      }

      case 'get_user': {
        const { userId } = args as { userId: string };
        const data = await iLevelClient.getUser(userId);
        return formatResponse(data);
      }

      // Clients
      case 'get_clients': {
        const data = await iLevelClient.getClients(args as any);
        return formatResponse(data);
      }

      case 'get_client': {
        const { clientId } = args as { clientId: string };
        const data = await iLevelClient.getClient(clientId);
        return formatResponse(data);
      }

      // Portfolios
      case 'get_portfolios': {
        const data = await iLevelClient.getPortfolios(args as any);
        return formatResponse(data);
      }

      // Assets & Funds
      case 'get_assets': {
        const data = await iLevelClient.getAssets((args as any)?.filters);
        return formatResponse(data);
      }

      case 'get_funds': {
        const data = await iLevelClient.getFunds((args as any)?.filters);
        return formatResponse(data);
      }

      case 'get_investments': {
        const data = await iLevelClient.getInvestments((args as any)?.filters);
        return formatResponse(data);
      }

      // Documents
      case 'get_documents': {
        const data = await iLevelClient.getDocuments(args as any);
        return formatResponse(data);
      }

      case 'get_document': {
        const { documentId } = args as { documentId: string };
        const data = await iLevelClient.getDocument(documentId);
        return formatResponse(data);
      }

      // Valuations
      case 'get_valuations': {
        const data = await iLevelClient.getValuations((args as any)?.filters);
        return formatResponse(data);
      }

      case 'create_valuation': {
        const { data: valuationData } = args as { data: Record<string, any> };
        const data = await iLevelClient.createValuation(valuationData);
        return formatResponse(data);
      }

      // Calculations
      case 'get_calculations': {
        const data = await iLevelClient.getCalculations((args as any)?.filters);
        return formatResponse(data);
      }

      // Data Retrieval
      case 'query_data': {
        const { query } = args as { query: Record<string, any> };
        const data = await iLevelClient.queryData(query);
        return formatResponse(data);
      }

      // Webhooks
      case 'get_webhooks': {
        const data = await iLevelClient.getWebhooks();
        return formatResponse(data);
      }

      case 'create_webhook': {
        const webhookData = args as { url: string; events: string[]; description?: string };
        const data = await iLevelClient.createWebhook(webhookData);
        return formatResponse(data);
      }

      case 'delete_webhook': {
        const { webhookId } = args as { webhookId: string };
        const data = await iLevelClient.deleteWebhook(webhookId);
        return formatResponse(data);
      }

      // Generic Request
      case 'custom_request': {
        const { method, endpoint, data } = args as {
          method: 'GET' | 'POST' | 'PUT' | 'DELETE';
          endpoint: string;
          data?: any;
        };
        const result = await iLevelClient.request(method, endpoint, data);
        return formatResponse(result);
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error: any) {
    handleError(error);
  }
});

// ==================== Resources ====================

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'ilevel://config',
        name: 'iLevel Configuration',
        description: 'Current iLevel API configuration',
        mimeType: 'application/json',
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === 'ilevel://config') {
    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(
            {
              baseUrl: config.baseUrl,
              username: config.username,
              isSandbox: config.isSandbox,
              apiVersion: config.apiVersion || 'v1',
            },
            null,
            2
          ),
        },
      ],
    };
  }

  throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
});

// ==================== Start Server ====================

async function main() {
  console.error('Starting S&P Global iLevel MCP Server...');

  // Test connection on startup
  const isConnected = await iLevelClient.testConnection();
  if (isConnected) {
    console.error('✓ Successfully connected to iLevel API');
  } else {
    console.error('⚠ Warning: Could not verify connection to iLevel API');
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('iLevel MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
