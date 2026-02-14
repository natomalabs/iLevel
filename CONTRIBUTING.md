# Contributing to iLevel MCP Server

Thank you for your interest in contributing to the iLevel MCP Server! This guide will help you get started.

## 🎯 Areas Where We Need Help

Since this is a template implementation based on discovered API endpoints, we especially need contributions from people who have:

1. **Access to iLevel API** - With official API credentials and documentation
2. **iLevel API Documentation** - Access to the OpenAPI spec or API docs
3. **Real-world Testing** - Can test the server against actual iLevel instances

## 🔧 What Needs to Be Done

### High Priority

- [ ] **Verify API Endpoints** - Confirm all endpoint paths match actual iLevel API
- [ ] **Update Authentication** - Verify and implement correct auth mechanism
- [ ] **Add Response Types** - Define TypeScript interfaces for all API responses
- [ ] **Test Real API** - Test against actual iLevel API and document findings
- [ ] **Add Missing Endpoints** - Implement any endpoints not yet included

### Medium Priority

- [ ] **Improve Error Handling** - Better error messages and retry logic
- [ ] **Add Pagination** - Proper pagination handling for list endpoints
- [ ] **Add Validation** - Zod schemas for request/response validation
- [ ] **Add Tests** - Unit and integration tests
- [ ] **Add Examples** - Real-world usage examples

### Low Priority

- [ ] **Performance Optimization** - Caching, connection pooling, etc.
- [ ] **Add Resources** - MCP resources for common data views
- [ ] **Add Prompts** - MCP prompts for common workflows
- [ ] **Documentation** - More detailed API documentation

## 🚀 Getting Started

1. **Fork the repository**

2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/ilevel-mcp-server.git
   cd ilevel-mcp-server
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make your changes**:
   - Update code in `src/`
   - Add tests if applicable
   - Update documentation

6. **Test your changes**:
   ```bash
   npm run build
   npm start
   ```

7. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

8. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

9. **Open a Pull Request**

## 📝 Contribution Guidelines

### Code Style

- Use TypeScript with strict mode enabled
- Follow existing code style and formatting
- Add JSDoc comments for public APIs
- Use meaningful variable and function names

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb (Add, Update, Fix, Remove, etc.)
- Reference issues when applicable

Examples:
- ✅ `Add support for fund-to-asset relationships endpoint`
- ✅ `Fix authentication token refresh logic`
- ✅ `Update README with new tool examples`
- ❌ `fixes`
- ❌ `update stuff`

### Pull Requests

- Provide a clear description of changes
- Reference any related issues
- Include examples or screenshots if applicable
- Update documentation as needed
- Ensure all tests pass

### Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for new functions/classes
- Update CONTRIBUTING.md if adding new processes
- Add examples for new features

## 🐛 Reporting Bugs

If you find a bug, please open an issue with:

1. **Description** - What happened vs. what should happen
2. **Steps to Reproduce** - How to reproduce the bug
3. **Environment** - Node version, OS, iLevel API version
4. **Error Messages** - Any error messages or logs
5. **Expected Behavior** - What you expected to happen

## 💡 Suggesting Features

Feature suggestions are welcome! Please open an issue with:

1. **Use Case** - Why is this feature needed?
2. **Proposed Solution** - How should it work?
3. **Alternatives** - Any alternative approaches?
4. **API Documentation** - Link to relevant iLevel API docs if available

## 🔐 Security

If you discover a security vulnerability:

1. **Do NOT** open a public issue
2. Email the maintainers directly
3. Provide details about the vulnerability
4. Wait for a response before disclosing publicly

## 📋 Checklist for Contributors with API Access

If you have access to iLevel API, you can help by:

- [ ] Testing the connection with real credentials
- [ ] Verifying each endpoint works correctly
- [ ] Documenting actual request/response schemas
- [ ] Testing pagination and filtering
- [ ] Verifying authentication mechanism
- [ ] Testing error handling
- [ ] Documenting rate limits
- [ ] Testing with sandbox and production environments
- [ ] Validating webhook functionality
- [ ] Testing with different permission levels

## 🙏 Recognition

All contributors will be recognized in the project. We appreciate:

- Code contributions
- Documentation improvements
- Bug reports
- Feature suggestions
- Testing and validation
- API documentation sharing

## 📚 Resources

- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [iLevel Official Documentation](https://docs.ilevelsolutions.com) (requires authentication)

## ❓ Questions?

If you have questions:

1. Check the README.md
2. Search existing issues
3. Open a new issue with the "question" label

Thank you for contributing! 🎉
