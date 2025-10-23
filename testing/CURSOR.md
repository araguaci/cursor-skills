# CURSOR IDE Rules for Testing Development

## Overview
This document establishes rules and best practices for working with testing strategies in CURSOR IDE. It covers unit testing, integration testing, end-to-end testing, and general testing patterns.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- Jest (JavaScript testing)
- Cypress (end-to-end testing)
- Testing Library (component testing)
- Coverage Gutters (test coverage)
- Test Explorer (test management)
- Mocha (JavaScript testing)

### Project Structure
**Standard Testing Project Layout:**
```
project/
├── src/ (source code)
├── tests/ (test files)
├── docs/ (documentation)
├── coverage/ (test coverage reports)
├── fixtures/ (test data)
├── mocks/ (test mocks)
├── package.json
└── .env
```

### Testing Standards
**MANDATORY Requirements:**
- Follow testing principles
- Use proper error handling
- Implement proper test organization
- Use secure testing practices
- Follow testing best practices

## Framework-Specific Rules

### Unit Testing Development
**Unit Testing-Specific Guidelines:**
- Follow unit testing conventions (isolated tests, fast execution)
- Use unit testing's built-in features (assertions, mocking)
- Implement proper test organization
- Use unit testing's testing framework
- Follow unit testing's best practices

**CURSOR IDE Settings for Unit Testing:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "jest.autoRun": "off"
}
```

### Integration Testing Development
**Integration Testing-Specific Guidelines:**
- Follow integration testing conventions (component interaction, data flow)
- Use integration testing's built-in features (test databases, external services)
- Implement proper test setup
- Use integration testing's testing framework
- Follow integration testing's best practices

**CURSOR IDE Settings for Integration Testing:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "testing.autoRun": "off"
}
```

### End-to-End Testing Development
**E2E Testing-Specific Guidelines:**
- Follow E2E testing conventions (user journeys, browser automation)
- Use E2E testing's built-in features (page objects, assertions)
- Implement proper test data management
- Use E2E testing's testing framework
- Follow E2E testing's best practices

**CURSOR IDE Settings for E2E Testing:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "cypress.autoRun": "off"
}
```

## Code Quality Rules

### Testing Standards
**MANDATORY Compliance:**
- Follow testing design principles
- Use consistent naming conventions
- Implement proper error handling
- Use appropriate testing patterns
- Follow security best practices

### Code Formatting
**Required Tools:**
- Prettier for code formatting
- ESLint for code linting
- Jest for testing
- Testing tools for validation

### Documentation Standards
**Documentation Requirements:**
- Testing documentation
- Test case documentation
- Coverage documentation
- Performance documentation
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
- Configure testing debugging
- Use breakpoints effectively
- Implement proper logging
- Use error handling
- Monitor performance

## Security Rules

### Input Validation
**Security Requirements:**
- Validate all testing inputs
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

## Testing-Specific Rules

### Test Organization
**Test Guidelines:**
- Organize tests by feature
- Use descriptive test names
- Implement proper test setup
- Follow testing best practices
- Monitor test performance

### Test Data Management
**Data Guidelines:**
- Use fixtures for test data
- Implement proper data cleanup
- Use appropriate data types
- Follow data best practices
- Monitor data usage

## Testing Rules

### Unit Testing
**Unit Test Requirements:**
- Test all testing components
- Use meaningful test names
- Test edge cases
- Mock external dependencies
- Maintain test coverage

### Integration Testing
**Integration Test Guidelines:**
- Test testing workflows
- Test component interactions
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
- Follow testing design principles
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
