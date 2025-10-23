# CURSOR IDE Rules for Node.js Development

## Overview
This document establishes rules and best practices for working with Node.js development in CURSOR IDE. It covers frameworks like Express, NestJS, Next.js, and general Node.js development patterns.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- JavaScript (ES6) code snippets
- Node.js Extension Pack
- npm Intellisense
- Prettier (code formatting)
- ESLint (code linting)
- Thunder Client (API testing)
- REST Client (API testing)

### Project Structure
**Standard Node.js Project Layout:**
```
project/
├── src/ (source code)
├── tests/ (test files)
├── docs/ (documentation)
├── node_modules/ (dependencies)
├── package.json
├── package-lock.json
├── .env
└── .gitignore
```

### Package Management
**MANDATORY Requirements:**
- Always use npm or yarn for dependency management
- Lock dependencies with package-lock.json or yarn.lock
- Separate dev dependencies from production
- Use semantic versioning
- Implement proper scripts in package.json

## Framework-Specific Rules

### Express Development
**Express-Specific Guidelines:**
- Follow Express conventions (middleware, routing)
- Use Express's built-in features (static files, templating)
- Implement proper error handling
- Use Express's testing framework
- Follow Express's security best practices

**CURSOR IDE Settings for Express:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.preferences.quoteStyle": "single"
}
```

### NestJS Development
**NestJS-Specific Guidelines:**
- Follow NestJS conventions (modules, services, controllers)
- Use NestJS's built-in features (dependency injection, decorators)
- Implement proper architecture patterns
- Use NestJS's testing framework
- Follow NestJS's security best practices

**CURSOR IDE Settings for NestJS:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.quoteStyle": "single"
}
```

### Next.js Development
**Next.js-Specific Guidelines:**
- Follow Next.js conventions (pages, components, API routes)
- Use Next.js's built-in features (SSR, SSG, ISR)
- Implement proper routing
- Use Next.js's testing framework
- Follow Next.js's performance best practices

**CURSOR IDE Settings for Next.js:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## Code Quality Rules

### JavaScript Standards
**MANDATORY Compliance:**
- Use ES6+ features
- Follow modern JavaScript patterns
- Implement proper error handling
- Use TypeScript when appropriate
- Follow functional programming principles

### Code Formatting
**Required Tools:**
- Prettier for code formatting
- ESLint for code linting
- Jest for testing
- Node.js debugger for debugging

### Documentation Standards
**Documentation Requirements:**
- JSDoc comments for all functions
- Type definitions for complex objects
- Inline comments for complex logic
- README files for projects
- API documentation for services

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
- Unit tests for all functions
- Integration tests for APIs
- End-to-end tests for user workflows
- Test coverage minimum 80%
- Use Jest or Mocha for testing

### Debugging Setup
**Debug Configuration:**
- Configure Node.js debugger
- Use breakpoints effectively
- Implement proper logging
- Use error handling
- Monitor performance

## Security Rules

### Input Validation
**Security Requirements:**
- Validate all user inputs
- Sanitize data before processing
- Use secure coding practices
- Implement proper authentication
- Follow OWASP guidelines

### Data Protection
**Data Security:**
- Encrypt sensitive data
- Use secure password hashing
- Implement proper session management
- Use HTTPS for all communications
- Follow security best practices

## Performance Optimization

### Code Optimization
**Performance Guidelines:**
- Use efficient algorithms
- Optimize database queries
- Implement caching strategies
- Use async/await appropriately
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
- Use console.log() effectively
- Implement proper logging
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

### ORM Usage
**ORM Best Practices:**
- Use Sequelize or TypeORM
- Optimize query performance
- Avoid N+1 query problems
- Use database transactions
- Monitor query performance

## API Development Rules

### REST API Guidelines
**API Standards:**
- Follow REST principles
- Use proper HTTP status codes
- Implement API versioning
- Use JSON for data exchange
- Document API endpoints

### API Security
**Security Requirements:**
- Implement authentication
- Use rate limiting
- Validate API inputs
- Implement CORS properly
- Use HTTPS

## Testing Rules

### Unit Testing
**Unit Test Requirements:**
- Test all public functions
- Use meaningful test names
- Test edge cases
- Mock external dependencies
- Maintain test coverage

### Integration Testing
**Integration Test Guidelines:**
- Test API endpoints
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
- Follow JavaScript best practices
- Use npm/yarn for dependencies
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
