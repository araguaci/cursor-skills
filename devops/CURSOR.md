# CURSOR IDE Rules for DevOps Development

## Overview
This document establishes rules and best practices for working with DevOps practices in CURSOR IDE. It covers Docker, Kubernetes, CI/CD, cloud platforms, and general DevOps patterns.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- Docker (containerization)
- Kubernetes (orchestration)
- GitLens (Git integration)
- Remote Development (remote work)
- YAML (YAML support)
- Terraform (infrastructure as code)

### Project Structure
**Standard DevOps Project Layout:**
```
project/
├── src/ (source code)
├── tests/ (test files)
├── docs/ (documentation)
├── docker/ (Docker files)
├── k8s/ (Kubernetes manifests)
├── terraform/ (Terraform files)
├── .github/ (GitHub Actions)
├── package.json
└── .env
```

### DevOps Standards
**MANDATORY Requirements:**
- Follow DevOps principles
- Use proper error handling
- Implement proper logging
- Use secure communication
- Follow DevOps best practices

## Framework-Specific Rules

### Docker Development
**Docker-Specific Guidelines:**
- Follow Docker conventions (Dockerfile, docker-compose)
- Use Docker's built-in features (multi-stage builds, caching)
- Implement proper security
- Use Docker's testing framework
- Follow Docker's best practices

**CURSOR IDE Settings for Docker:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "docker.showStartPage": false
}
```

### Kubernetes Development
**Kubernetes-Specific Guidelines:**
- Follow Kubernetes conventions (pods, services, deployments)
- Use Kubernetes's built-in features (configmaps, secrets)
- Implement proper resource management
- Use Kubernetes's testing framework
- Follow Kubernetes's security best practices

**CURSOR IDE Settings for Kubernetes:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "kubernetes.showStartPage": false
}
```

### CI/CD Development
**CI/CD-Specific Guidelines:**
- Follow CI/CD conventions (pipelines, stages, jobs)
- Use CI/CD's built-in features (triggers, notifications)
- Implement proper testing
- Use CI/CD's testing framework
- Follow CI/CD's security best practices

**CURSOR IDE Settings for CI/CD:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "github.copilot.enable": true
}
```

## Code Quality Rules

### DevOps Standards
**MANDATORY Compliance:**
- Follow DevOps design principles
- Use consistent naming conventions
- Implement proper error handling
- Use appropriate DevOps patterns
- Follow security best practices

### Code Formatting
**Required Tools:**
- Prettier for code formatting
- ESLint for code linting
- Jest for testing
- DevOps testing tools for validation

### Documentation Standards
**Documentation Requirements:**
- DevOps documentation
- Infrastructure documentation
- Deployment documentation
- Monitoring documentation
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
- Configure DevOps debugging
- Use breakpoints effectively
- Implement proper logging
- Use error handling
- Monitor performance

## Security Rules

### Input Validation
**Security Requirements:**
- Validate all DevOps inputs
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

## DevOps-Specific Rules

### Infrastructure as Code
**Infrastructure Guidelines:**
- Use Terraform for infrastructure
- Implement proper versioning
- Use appropriate modules
- Follow infrastructure best practices
- Monitor infrastructure health

### Containerization
**Container Guidelines:**
- Use Docker for containerization
- Implement proper security
- Use multi-stage builds
- Follow container best practices
- Monitor container health

## Testing Rules

### Unit Testing
**Unit Test Requirements:**
- Test all DevOps components
- Use meaningful test names
- Test edge cases
- Mock external dependencies
- Maintain test coverage

### Integration Testing
**Integration Test Guidelines:**
- Test DevOps workflows
- Test infrastructure interactions
- Test external services
- Use test environments
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
- Follow DevOps design principles
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
