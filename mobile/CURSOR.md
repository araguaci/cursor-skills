# CURSOR IDE Rules for Mobile Development

## Overview
This document establishes rules and best practices for working with mobile development in CURSOR IDE. It covers React Native, Flutter, Expo, and general mobile development patterns.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- React Native Tools (React Native development)
- Flutter (Flutter development)
- Dart (Dart language support)
- Expo Tools (Expo development)
- Mobile Development (mobile development tools)
- Android Studio (Android development)

### Project Structure
**Standard Mobile Project Layout:**
```
project/
├── src/ (source code)
├── tests/ (test files)
├── docs/ (documentation)
├── assets/ (images, fonts, etc.)
├── android/ (Android-specific code)
├── ios/ (iOS-specific code)
├── package.json
└── .env
```

### Mobile Standards
**MANDATORY Requirements:**
- Follow mobile development principles
- Use proper error handling
- Implement proper testing
- Use secure communication
- Follow mobile best practices

## Framework-Specific Rules

### React Native Development
**React Native-Specific Guidelines:**
- Follow React Native conventions (components, navigation)
- Use React Native's built-in features (APIs, components)
- Implement proper navigation
- Use React Native's testing framework
- Follow React Native's performance best practices

**CURSOR IDE Settings for React Native:**
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

### Flutter Development
**Flutter-Specific Guidelines:**
- Follow Flutter conventions (widgets, state management)
- Use Flutter's built-in features (widgets, animations)
- Implement proper state management
- Use Flutter's testing framework
- Follow Flutter's performance best practices

**CURSOR IDE Settings for Flutter:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "dart.flutterSdkPath": "/path/to/flutter"
}
```

### Expo Development
**Expo-Specific Guidelines:**
- Follow Expo conventions (expo-cli, expo-dev-client)
- Use Expo's built-in features (APIs, components)
- Implement proper configuration
- Use Expo's testing framework
- Follow Expo's deployment best practices

**CURSOR IDE Settings for Expo:**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "expo.toolsPath": "/path/to/expo"
}
```

## Code Quality Rules

### Mobile Standards
**MANDATORY Compliance:**
- Follow mobile development principles
- Use consistent naming conventions
- Implement proper error handling
- Use appropriate mobile patterns
- Follow security best practices

### Code Formatting
**Required Tools:**
- Prettier for code formatting
- ESLint for code linting
- Jest for testing
- Mobile testing tools for validation

### Documentation Standards
**Documentation Requirements:**
- Mobile app documentation
- Component documentation
- API documentation
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
- Configure mobile debugging
- Use breakpoints effectively
- Implement proper logging
- Use error handling
- Monitor performance

## Security Rules

### Input Validation
**Security Requirements:**
- Validate all mobile inputs
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

## Mobile-Specific Rules

### Platform Considerations
**Platform Guidelines:**
- Consider iOS and Android differences
- Use platform-specific code when needed
- Implement proper responsive design
- Follow platform guidelines
- Test on multiple devices

### Performance Optimization
**Performance Guidelines:**
- Optimize images and assets
- Use efficient rendering
- Implement proper memory management
- Use appropriate data structures
- Monitor performance metrics

## Testing Rules

### Unit Testing
**Unit Test Requirements:**
- Test all mobile components
- Use meaningful test names
- Test edge cases
- Mock external dependencies
- Maintain test coverage

### Integration Testing
**Integration Test Guidelines:**
- Test mobile workflows
- Test API interactions
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
- Follow mobile development principles
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
