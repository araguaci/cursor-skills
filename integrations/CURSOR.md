# CURSOR IDE Rules for Integrations Development

## Overview
This document establishes rules and best practices for working with system integrations in CURSOR IDE. It covers webhooks, microservices, databases, message queues, and general integration patterns.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- Docker (containerization)
- Kubernetes (orchestration)
- GitLens (Git integration)
- Remote Development (remote work)
- Database Client (database management)
- REST Client (API testing)

### Project Structure
**Standard Integration Project Layout:**
```
project/
├── src/ (source code)
├── tests/ (test files)
├── docs/ (documentation)
├── configs/ (configuration files)
├── docker/ (Docker files)
├── k8s/ (Kubernetes manifests)
├── package.json
└── .env
```

### Integration Standards
**MANDATORY Requirements:**
- Follow microservice principles
- Use proper error handling
- Implement proper logging
- Use secure communication
- Follow integration best practices

## Framework-Specific Rules

### Webhook Development
**Webhook-Specific Guidelines:**
- Follow webhook conventions (events, payloads)
- Use webhook's built-in features (validation, retry)
- Implement proper security
- Use webhook's testing framework
- Follow webhook's best practices

**CURSOR IDE Settings for Webhooks:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "rest-client.environmentVariables": {
    "webhookUrl": "https://api.example.com/webhooks"
  }
}
```

### Microservice Development
**Microservice-Specific Guidelines:**
- Follow microservice conventions (services, APIs)
- Use microservice's built-in features (discovery, load balancing)
- Implement proper communication
- Use microservice's testing framework
- Follow microservice's security best practices

**CURSOR IDE Settings for Microservices:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "docker.showStartPage": false
}
```

### Database Integration
**Database-Specific Guidelines:**
- Follow database conventions (connections, queries)
- Use database's built-in features (transactions, indexes)
- Implement proper connection pooling
- Use database's testing framework
- Follow database's security best practices

**CURSOR IDE Settings for Databases:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "database-client.connections": []
}
```

## Code Quality Rules

### Integration Standards
**MANDATORY Compliance:**
- Follow integration design principles
- Use consistent naming conventions
- Implement proper error handling
- Use appropriate communication patterns
- Follow security best practices

### Code Formatting
**Required Tools:**
- Prettier for code formatting
- ESLint for code linting
- Jest for testing
- Docker for containerization

### Documentation Standards
**Documentation Requirements:**
- Integration documentation
- API endpoint documentation
- Configuration documentation
- Deployment documentation
- Troubleshooting documentation

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
- Unit tests for all components
- Integration tests for workflows
- End-to-end tests for user journeys
- Test coverage minimum 80%
- Use appropriate testing frameworks

### Debugging Setup
**Debug Configuration:**
- Configure integration debugging
- Use breakpoints effectively
- Implement proper logging
- Use error handling
- Monitor performance

## Security Rules

### Input Validation
**Security Requirements:**
- Validate all integration inputs
- Sanitize data before processing
- Use secure coding practices
- Implement proper authentication
- Follow OWASP guidelines

### Data Protection
**Data Security:**
- Encrypt sensitive data
- Use secure communication
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

## Integration Rules

### Communication Patterns
**Communication Standards:**
- Use appropriate protocols (HTTP, gRPC, WebSocket)
- Implement proper error handling
- Use message queues when appropriate
- Follow communication best practices
- Monitor communication health

### Service Discovery
**Discovery Guidelines:**
- Use service discovery patterns
- Implement proper load balancing
- Use health checks
- Follow discovery best practices
- Monitor service health

## Testing Rules

### Unit Testing
**Unit Test Requirements:**
- Test all integration components
- Use meaningful test names
- Test edge cases
- Mock external dependencies
- Maintain test coverage

### Integration Testing
**Integration Test Guidelines:**
- Test integration workflows
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
- Follow integration design principles
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
