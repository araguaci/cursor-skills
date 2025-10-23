# CURSOR IDE Rules for PHP Development

## Overview
This document establishes rules and best practices for working with PHP development in CURSOR IDE. It covers frameworks like Laravel, Symfony, WordPress, and general PHP development patterns.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- PHP Intelephense (language server)
- PHP Debug (Xdebug integration)
- PHP DocBlocker (documentation)
- Composer (dependency management)
- Laravel Blade Snippets (if using Laravel)
- Symfony Snippets (if using Symfony)

### Project Structure
**Standard PHP Project Layout:**
```
project/
├── app/ (application code)
├── config/ (configuration files)
├── public/ (web root)
├── resources/ (views, assets)
├── tests/ (test files)
├── vendor/ (dependencies)
├── composer.json
├── composer.lock
└── .env
```

### Composer Integration
**Required Configuration:**
- Always use Composer for dependency management
- Lock dependencies with composer.lock
- Use autoloading for custom classes
- Separate dev dependencies from production

## Framework-Specific Rules

### Laravel Development
**Laravel-Specific Guidelines:**
- Follow Laravel conventions (Artisan commands, Eloquent models)
- Use Laravel's built-in features (middleware, validation, routing)
- Implement proper MVC architecture
- Use Laravel's testing framework (PHPUnit)
- Follow Laravel's security best practices

**CURSOR IDE Settings for Laravel:**
```json
{
  "php.suggest.basic": false,
  "php.validate.enable": true,
  "intelephense.files.maxSize": 5000000,
  "intelephense.completion.triggerParameterHints": true
}
```

### Symfony Development
**Symfony-Specific Guidelines:**
- Follow Symfony conventions (bundles, services, configuration)
- Use Symfony's dependency injection
- Implement proper service architecture
- Use Symfony's testing framework
- Follow Symfony's security best practices

**CURSOR IDE Settings for Symfony:**
```json
{
  "php.suggest.basic": false,
  "php.validate.enable": true,
  "intelephense.files.maxSize": 5000000,
  "intelephense.completion.triggerParameterHints": true
}
```

### WordPress Development
**WordPress-Specific Guidelines:**
- Follow WordPress coding standards
- Use WordPress hooks and filters
- Implement proper plugin/theme architecture
- Use WordPress's testing framework
- Follow WordPress's security best practices

**CURSOR IDE Settings for WordPress:**
```json
{
  "php.suggest.basic": false,
  "php.validate.enable": true,
  "intelephense.files.maxSize": 5000000,
  "intelephense.completion.triggerParameterHints": true
}
```

## Code Quality Rules

### PSR Standards
**MANDATORY Compliance:**
- PSR-1: Basic Coding Standard
- PSR-2: Coding Style Guide
- PSR-4: Autoloader Standard
- PSR-12: Extended Coding Style

### Code Formatting
**Required Tools:**
- PHP CS Fixer for code formatting
- PHPStan for static analysis
- PHPUnit for testing
- Xdebug for debugging

### Documentation Standards
**Documentation Requirements:**
- PHPDoc comments for all classes and methods
- Inline comments for complex logic
- README files for projects
- API documentation for services
- Setup instructions

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
- Unit tests for all classes
- Integration tests for APIs
- Feature tests for user workflows
- Test coverage minimum 80%
- Use PHPUnit for testing

### Debugging Setup
**Debug Configuration:**
- Configure Xdebug for debugging
- Use breakpoints effectively
- Implement proper logging
- Use error handling
- Monitor performance

## Security Rules

### Input Validation
**Security Requirements:**
- Validate all user inputs
- Sanitize data before processing
- Use prepared statements for database queries
- Implement CSRF protection
- Use secure authentication

### Data Protection
**Data Security:**
- Encrypt sensitive data
- Use secure password hashing
- Implement proper session management
- Use HTTPS for all communications
- Follow OWASP guidelines

## Performance Optimization

### Code Optimization
**Performance Guidelines:**
- Use efficient algorithms
- Optimize database queries
- Implement caching strategies
- Use lazy loading
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
- Implement custom exceptions
- Log errors properly
- Handle errors gracefully
- Provide user-friendly messages

### Debugging Practices
**Debug Guidelines:**
- Use var_dump() and print_r() sparingly
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

### Query Optimization
**Query Best Practices:**
- Use prepared statements
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
- Test all public methods
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
- Follow PSR standards
- Use Composer for dependencies
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
