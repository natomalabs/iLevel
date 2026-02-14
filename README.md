# S&P Global iLevel MCP Server

A Model Context Protocol (MCP) server that provides integration with the S&P Global iLevel API for private markets portfolio monitoring and management.

## ⚠️ Important Notice

**This is a template/skeleton implementation** based on discovered API endpoints and public information about iLevel. To make this MCP server fully functional, you will need:

1. **Access to iLevel API** - You must be an S&P Global iLevel customer
2. **API Credentials** - Contact iLevel support to enable API access on your account
3. **API Documentation** - Access to the official iLevel API documentation to:
   - Verify endpoint paths and authentication methods
   - Understand request/response schemas
   - Confirm available query parameters and filters
   - Update placeholder implementations marked with `TODO` comments

## 🚀 Features

This MCP server provides tools for:

- **Users Management** - Get users and user details
- **Clients Management** - Get clients and client information
- **Portfolio Data** - Access portfolio information
- **Assets & Funds** - Query assets, funds, and investments
- **Documents** - Access and retrieve documents
- **Valuations** - Get and create valuations
- **Calculations** - Access calculation results
- **Data Retrieval** - Query data using the data retrieval API
- **Webhooks** - Manage webhook subscriptions
- **Custom Requests** - Make requests to any API endpoint

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- S&P Global iLevel account with API access enabled
- iLevel API credentials (username and password/API key)

## 🔧 Installation

1. **Clone or navigate to this directory**:
   ```bash
   cd ilevel-mcp-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file** with your iLevel API credentials:
   ```env
   ILEVEL_BASE_URL=https://clients.ilevelsolutions.com
   ILEVEL_USERNAME=your_username
   ILEVEL_PASSWORD=your_password_or_api_key
   ILEVEL_SANDBOX=false
   ```

5. **Build the project**:
   ```bash
   npm run build
   ```

## 🎯 Usage

### Running the MCP Server

Start the server using:
```bash
npm start
```

For development with automatic rebuild:
```bash
npm run dev
```

### Configure in Claude Desktop

Add this server to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ilevel": {
      "command": "node",
      "args": ["/absolute/path/to/ilevel-mcp-server/build/index.js"],
      "env": {
        "ILEVEL_BASE_URL": "https://clients.ilevelsolutions.com",
        "ILEVEL_USERNAME": "your_username",
        "ILEVEL_PASSWORD": "your_password",
        "ILEVEL_SANDBOX": "false"
      }
    }
  }
}
```

### Using with Claude Code CLI

If you're using the Claude Code CLI, you can configure the MCP server in `~/.config/claude/mcp_settings.json`:

```json
{
  "mcpServers": {
    "ilevel": {
      "command": "node",
      "args": ["/absolute/path/to/ilevel-mcp-server/build/index.js"],
      "env": {
        "ILEVEL_BASE_URL": "https://clients.ilevelsolutions.com",
        "ILEVEL_USERNAME": "your_username",
        "ILEVEL_PASSWORD": "your_password",
        "ILEVEL_SANDBOX": "false"
      }
    }
  }
}
```

## 🛠️ Available Tools

### Connection Test
- `test_connection` - Test connection to the iLevel API

### Users
- `get_users` - Get a list of users
- `get_user` - Get details of a specific user by ID

### Clients
- `get_clients` - Get a list of clients
- `get_client` - Get details of a specific client by ID

### Portfolios
- `get_portfolios` - Get portfolio data

### Assets & Funds
- `get_assets` - Get assets
- `get_funds` - Get funds
- `get_investments` - Get investments

### Documents
- `get_documents` - Get documents
- `get_document` - Get a specific document by ID

### Valuations
- `get_valuations` - Get valuations
- `create_valuation` - Create or update a valuation

### Calculations
- `get_calculations` - Get calculations

### Data Retrieval
- `query_data` - Query data using the data retrieval API

### Webhooks
- `get_webhooks` - Get configured webhooks
- `create_webhook` - Create a new webhook
- `delete_webhook` - Delete a webhook

### Custom Requests
- `custom_request` - Make a custom request to any iLevel API endpoint

## 📝 Example Usage with Claude

Once configured, you can use these tools in Claude:

```
Claude, using the iLevel MCP server:

1. Test the connection to iLevel API
2. Get a list of all clients
3. Show me the portfolios for client ID "12345"
4. Get all documents related to fund "ABC-Fund-2023"
```

Claude will automatically use the appropriate MCP tools to fulfill these requests.

## 🔨 Customization & TODOs

This is a skeleton implementation. To make it production-ready, you need to:

### 1. Update Authentication
- File: `src/ilevel-client.ts`
- Verify the authentication mechanism (currently using Basic Auth)
- Update if iLevel uses OAuth, API keys, or another method

### 2. Verify API Endpoints
- Review all endpoint paths in `src/ilevel-client.ts`
- Confirm they match the actual iLevel API documentation
- Update base URL structure if needed

### 3. Add Request/Response Types
- Define TypeScript interfaces for API responses
- Add validation using Zod schemas
- Improve type safety throughout

### 4. Implement Pagination
- Add proper pagination handling for list endpoints
- Implement cursor-based pagination if supported

### 5. Add Error Handling
- Implement retry logic for transient failures
- Add rate limiting if needed
- Better error messages and logging

### 6. Add More Endpoints
- Review the iLevel API documentation
- Add any missing endpoints
- Implement POST/PUT/DELETE operations as needed

### 7. Add Tests
- Write unit tests for the API client
- Add integration tests for MCP tools
- Mock API responses for testing

### 8. Update Documentation
- Document actual request/response schemas
- Add examples for each tool
- Document any API limitations or quirks

## 📚 Getting iLevel API Access

To get access to the iLevel API:

1. **Contact iLevel Support**:
   - Login to your iLevel account at https://clients.ilevelsolutions.com
   - Navigate to the support section
   - Request API access for your account

2. **Obtain Credentials**:
   - Request a username and API key/password
   - Ask for API documentation access
   - Request access to the API documentation portal

3. **Access Documentation**:
   - Documentation URL: https://docs.ilevelsolutions.com (requires authentication)
   - Request the OpenAPI/Swagger specification if available
   - Download the API Web Services Guide

4. **Test Your Access**:
   - Use the credentials to test the connection
   - Verify you can access the API endpoints
   - Review any rate limits or usage restrictions

## 🔍 API Discovery

Based on research, iLevel has both SOAP and REST APIs:

### SOAP API (Legacy)
- **WSDL**: https://services.ilevelsolutions.com/DataService/Service/2019/Q1/DataService.svc?singleWsdl
- **Documentation**: Web Services Guide (PDF) - available from iLevel support

### REST API (Modern)
- **Base URLs** (examples, verify with support):
  - Production: `https://clients.ilevelsolutions.com/api/v1/`
  - Sandbox: `https://sandapi.ilevelsolutions.com/api/v1/`
- **Swagger/OpenAPI**: Available at `/apidocs` endpoint (requires authentication)

## 🤝 Contributing

This is a template implementation. Contributions are welcome to:
- Add verified API endpoints from official documentation
- Improve error handling and type safety
- Add tests and examples
- Update documentation with actual API behavior

## 📄 License

MIT

## ⚠️ Disclaimer

This MCP server is an unofficial integration and is not affiliated with, endorsed by, or supported by S&P Global or iLevel Solutions. Use at your own risk. Always refer to the official iLevel API documentation for accurate information.

## 🆘 Support

For issues with this MCP server:
- Open an issue in this repository

For iLevel API issues:
- Contact S&P Global iLevel Support
- Visit: https://clients.ilevelsolutions.com

## 📖 Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [S&P Global iLevel](https://ihsmarkit.com/products/ilevel.html)
- [iLevel GitHub Integration (Singer.io)](https://github.com/singer-io/tap-ilevel)
