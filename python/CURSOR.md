# CURSOR IDE Rules for Python Development

## Overview
This document establishes rules and best practices for working with Python development in CURSOR IDE. It covers frameworks like Django, Flask, FastAPI, data science tools, and general Python development patterns.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- Python (Microsoft Python extension)
- Pylance (language server)
- Python Debugger (debugging support)
- Python Docstring Generator (documentation)
- Python Indent (indentation)
- Python Test Explorer (testing)
- Jupyter (notebook support)

### Project Structure
**Standard Python Project Layout:**
```
project/
├── src/ (source code)
├── tests/ (test files)
├── docs/ (documentation)
├── requirements.txt
├── requirements-dev.txt
├── setup.py
├── pyproject.toml
└── .env
```

### Virtual Environment
**MANDATORY Requirements:**
- Always use virtual environments
- Use venv or conda for isolation
- Separate dev and production dependencies
- Lock dependencies with requirements.txt
- Use pip-tools for dependency management

## Framework-Specific Rules

### Django Development
**Django-Specific Guidelines:**
- Follow Django conventions (MVT pattern)
- Use Django's built-in features (ORM, admin, forms)
- Implement proper project structure
- Use Django's testing framework
- Follow Django's security best practices

**CURSOR IDE Settings for Django:**
```json
{
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black"
}
```

### Flask Development
**Flask-Specific Guidelines:**
- Follow Flask conventions (blueprints, extensions)
- Use Flask's built-in features (routing, templates)
- Implement proper application factory
- Use Flask's testing framework
- Follow Flask's security best practices

**CURSOR IDE Settings for Flask:**
```json
{
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black"
}
```

### FastAPI Development
**FastAPI-Specific Guidelines:**
- Follow FastAPI conventions (dependency injection)
- Use FastAPI's built-in features (Pydantic, OpenAPI)
- Implement proper async patterns
- Use FastAPI's testing framework
- Follow FastAPI's security best practices

**CURSOR IDE Settings for FastAPI:**
```json
{
  "python.defaultInterpreterPath": "./venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black"
}
```

## Code Quality Rules

### PEP Standards
**MANDATORY Compliance:**
- PEP 8: Style Guide for Python Code
- PEP 257: Docstring Conventions
- PEP 484: Type Hints
- PEP 526: Syntax for Variable Annotations

### Code Formatting
**Required Tools:**
- Black for code formatting
- isort for import sorting
- flake8 for linting
- mypy for type checking
- pytest for testing

### Documentation Standards
**Documentation Requirements:**
- Docstrings for all functions and classes
- Type hints for all functions
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
- Use pytest for testing

### Debugging Setup
**Debug Configuration:**
- Configure Python debugger
- Use breakpoints effectively
- Implement proper logging
- Use error handling
- Monitor performance

## Data Science Rules

### Jupyter Notebooks
**Notebook Best Practices:**
- Use meaningful cell names
- Implement proper data validation
- Use version control for notebooks
- Document data sources
- Clean up notebooks before sharing

### Data Processing
**Data Science Guidelines:**
- Use pandas for data manipulation
- Implement proper data validation
- Use numpy for numerical operations
- Use matplotlib/seaborn for visualization
- Document data transformations

### Machine Learning
**ML Best Practices:**
- Use scikit-learn for ML tasks
- Implement proper model validation
- Use cross-validation techniques
- Document model performance
- Version control models

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
- Use try-except blocks appropriately
- Implement custom exceptions
- Log errors properly
- Handle errors gracefully
- Provide user-friendly messages

### Debugging Practices
**Debug Guidelines:**
- Use print() and logging effectively
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
- Use Django ORM or SQLAlchemy
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
- Follow PEP standards
- Use virtual environments
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
