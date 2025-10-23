# CURSOR IDE Rules for API Development

## Overview
This document establishes rules and best practices for working with API development in CURSOR IDE. It covers REST APIs, GraphQL, gRPC, and general API development patterns.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- REST Client (API testing)
- Thunder Client (API testing)
- Postman (API testing)
- JSON Tools (JSON manipulation)
- API Documentation (documentation generation)
- Swagger Viewer (OpenAPI documentation)

### Project Structure
**Standard API Project Layout:**
```
project/
├── src/ (source code)
├── tests/ (test files)
├── docs/ (documentation)
├── schemas/ (API schemas)
├── node_modules/ (dependencies)
├── package.json
├── swagger.yaml
└── .env
```

### API Standards
**MANDATORY Requirements:**
- Follow REST principles
- Use proper HTTP status codes
- Implement API versioning
- Use JSON for data exchange
- Document API endpoints

## Framework-Specific Rules

### REST API Development
**REST-Specific Guidelines:**
- Follow REST principles (GET, POST, PUT, DELETE)
- Use proper HTTP status codes
- Implement proper resource naming
- Use HTTP headers appropriately
- Follow REST security best practices

**CURSOR IDE Settings for REST:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "rest-client.environmentVariables": {
    "baseUrl": "http://localhost:3000"
  }
}
```

### GraphQL Development
**GraphQL-Specific Guidelines:**
- Follow GraphQL conventions (queries, mutations, subscriptions)
- Use GraphQL's built-in features (introspection, validation)
- Implement proper schema design
- Use GraphQL's testing framework
- Follow GraphQL's security best practices

**CURSOR IDE Settings for GraphQL:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "graphql.useLanguageServer": true
}
```

### gRPC Development
**gRPC-Specific Guidelines:**
- Follow gRPC conventions (services, methods, messages)
- Use Protocol Buffers for serialization
- Implement proper error handling
- Use gRPC's testing framework
- Follow gRPC's security best practices

**CURSOR IDE Settings for gRPC:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "protobuf.languageServer": true
}
```

## Code Quality Rules

### API Standards
**MANDATORY Compliance:**
- Follow API design principles
- Use consistent naming conventions
- Implement proper error handling
- Use appropriate data formats
- Follow security best practices

### Code Formatting
**Required Tools:**
- Prettier for code formatting
- ESLint for code linting
- Jest for testing
- API testing tools for validation

### Documentation Standards
**Documentation Requirements:**
- OpenAPI/Swagger documentation
- API endpoint documentation
- Request/response examples
- Error code documentation
- Authentication documentation

## Development Workflow Rules

### Version Control
**Git Best Practices:**
- Use meaningful commit messages
- Create feature branches
- Use pull requests for code review
- Tag releases appropriately
- Keep history clean

### Testing Requirements
**Testing Standards:**
- Unit tests for all endpoints
- Integration tests for API workflows
- End-to-end tests for user journeys
- Test coverage minimum 80%
- Use appropriate testing frameworks

### Debugging Setup
**Debug Configuration:**
- Configure API debugging
- Use breakpoints effectively
- Implement proper logging
- Use error handling
- Monitor performance

## Security Rules

### Input Validation
**Security Requirements:**
- Validate all API inputs
- Sanitize data before processing
- Use secure coding practices
- Implement proper authentication
- Follow OWASP guidelines

### Data Protection
**Data Security:**
- Encrypt sensitive data
- Use secure authentication
- Implement proper authorization
- Use HTTPS for all communications
- Follow security best practices

## Performance Optimization

### Code Optimization
**Performance Guidelines:**
- Use efficient algorithms
- Optimize database queries
- Implement caching strategies
- Use appropriate data structures
- Monitor performance metrics

### CURSOR IDE Performance
**IDE Optimization:**
- Configure memory settings
- Use appropriate extensions
- Optimize workspace settings
- Manage large files efficiently
- Use efficient search patterns

## Error Handling Rules

### Exception Handling
**Error Management:**
- Use try-catch blocks appropriately
- Implement custom error classes
- Log errors properly
- Handle errors gracefully
- Provide user-friendly messages

### Debugging Practices
**Debug Guidelines:**
- Use logging effectively
- Implement proper error tracking
- Use debugging tools effectively
- Test error scenarios
- Document error handling

## Database Rules

### Database Design
**Database Guidelines:**
- Use proper normalization
- Implement appropriate indexes
- Use foreign key constraints
- Follow naming conventions
- Document database schema

### Query Optimization
**Query Best Practices:**
- Use prepared statements
- Optimize query performance
- Avoid N+1 query problems
- Use database transactions
- Monitor query performance

## API Documentation Rules

### Documentation Standards
**Documentation Requirements:**
- OpenAPI/Swagger specifications
- API endpoint documentation
- Request/response examples
- Error code documentation
- Authentication documentation

### Documentation Tools
**Recommended Tools:**
- Swagger/OpenAPI for API specs
- Postman for API testing
- Insomnia for API development
- API Blueprint for documentation
- ReDoc for API documentation

## Testing Rules

### Unit Testing
**Unit Test Requirements:**
- Test all API endpoints
- Use meaningful test names
- Test edge cases
- Mock external dependencies
- Maintain test coverage

### Integration Testing
**Integration Test Guidelines:**
- Test API workflows
- Test database interactions
- Test external services
- Use test databases
- Clean up test data

## Deployment Rules

### Production Setup
**Deployment Requirements:**
- Use production-ready configurations
- Implement proper error handling
- Use environment variables
- Configure logging
- Monitor application health

### CI/CD Pipeline
**Automation Guidelines:**
- Automate testing
- Automate deployment
- Use version control
- Implement rollback strategies
- Monitor deployment success

## Troubleshooting Rules

### Common Issues
**Frequent Problems:**
- Extension conflicts
- Configuration issues
- Performance problems
- Debugging difficulties
- Integration challenges

### Solutions
**Problem Resolution:**
- Check documentation
- Search community forums
- Review configuration
- Test with minimal setup
- Ask for help

## Best Practices Summary

### Development
- Follow API design principles
- Use appropriate frameworks
- Implement proper testing
- Use version control
- Document everything

### CURSOR IDE
- Configure appropriate extensions
- Use debugging tools
- Optimize performance
- Follow coding standards
- Use IntelliSense effectively

### Security
- Validate all inputs
- Use secure coding practices
- Implement proper authentication
- Follow security guidelines
- Regular security audits

### Performance
- Optimize code and queries
- Implement caching
- Monitor performance
- Use profiling tools
- Regular performance reviews
