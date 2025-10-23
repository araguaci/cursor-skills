# CURSOR IDE Rules for Web Design Development

## Overview
This document establishes rules and best practices for working with web design development in CURSOR IDE. It covers HTML, CSS, JavaScript, and modern frameworks like React, Vue, Angular.

## Environment Setup Rules

### CURSOR IDE Configuration
**MANDATORY Extensions:**
- HTML CSS Support (IntelliSense)
- JavaScript (ES6) code snippets
- Auto Rename Tag (HTML tag management)
- Bracket Pair Colorizer (code readability)
- Prettier (code formatting)
- Live Server (development server)
- Emmet (HTML/CSS shortcuts)

### Project Structure
**Standard Web Project Layout:**
```
project/
├── src/ (source files)
├── public/ (static assets)
├── dist/ (build output)
├── node_modules/ (dependencies)
├── package.json
├── webpack.config.js
└── .gitignore
```

### Framework-Specific Setup
**React Projects:**
- React Developer Tools
- ES7+ React/Redux/React-Native snippets
- React Native Tools
- TypeScript support

**Vue Projects:**
- Vetur (Vue language server)
- Vue 3 Snippets
- Vue VSCode Snippets
- TypeScript support

**Angular Projects:**
- Angular Language Service
- Angular Snippets
- TypeScript support
- Angular CLI integration

## HTML Development Rules

### HTML Standards
**MANDATORY Requirements:**
- Use semantic HTML5 elements
- Implement proper accessibility (ARIA)
- Follow W3C standards
- Use proper document structure
- Implement responsive design

### HTML Best Practices
**Code Quality:**
- Use meaningful element names
- Implement proper nesting
- Use appropriate attributes
- Follow naming conventions
- Comment complex structures

### Accessibility Rules
**A11y Requirements:**
- Use semantic elements
- Implement ARIA attributes
- Provide alt text for images
- Use proper heading hierarchy
- Ensure keyboard navigation

## CSS Development Rules

### CSS Standards
**MANDATORY Requirements:**
- Use CSS3 features appropriately
- Implement responsive design
- Follow BEM methodology
- Use CSS custom properties
- Implement proper specificity

### CSS Architecture
**Organization Standards:**
- Use CSS modules or styled-components
- Implement component-based styling
- Use CSS preprocessors (Sass/SCSS)
- Follow naming conventions
- Organize styles logically

### Responsive Design
**Responsive Requirements:**
- Mobile-first approach
- Flexible grid systems
- Responsive images
- Touch-friendly interfaces
- Cross-browser compatibility

## JavaScript Development Rules

### JavaScript Standards
**MANDATORY Requirements:**
- Use ES6+ features
- Follow modern JavaScript patterns
- Implement proper error handling
- Use TypeScript when appropriate
- Follow functional programming principles

### Framework-Specific Rules
**React Guidelines:**
- Use functional components
- Implement hooks properly
- Use proper state management
- Follow React best practices
- Implement proper testing

**Vue Guidelines:**
- Use composition API
- Implement proper reactivity
- Follow Vue conventions
- Use proper component structure
- Implement proper testing

**Angular Guidelines:**
- Use TypeScript
- Follow Angular conventions
- Implement proper services
- Use dependency injection
- Implement proper testing

## Performance Optimization Rules

### Code Optimization
**Performance Guidelines:**
- Minimize bundle size
- Use code splitting
- Implement lazy loading
- Optimize images
- Use efficient algorithms

### CURSOR IDE Performance
**IDE Optimization:**
- Configure memory settings
- Use appropriate extensions
- Optimize workspace settings
- Manage large files efficiently
- Use efficient search patterns

## Testing Rules

### Testing Requirements
**Testing Standards:**
- Unit tests for components
- Integration tests for workflows
- End-to-end tests for user journeys
- Visual regression testing
- Performance testing

### Testing Tools
**Recommended Tools:**
- Jest for unit testing
- Cypress for E2E testing
- Storybook for component testing
- Lighthouse for performance testing
- Axe for accessibility testing

## Security Rules

### Frontend Security
**Security Requirements:**
- Validate all inputs
- Sanitize user data
- Implement CSP headers
- Use secure authentication
- Follow OWASP guidelines

### Data Protection
**Data Security:**
- Encrypt sensitive data
- Use secure APIs
- Implement proper CORS
- Use HTTPS
- Follow security best practices

## Build and Deployment Rules

### Build Process
**Build Requirements:**
- Use modern build tools
- Implement proper bundling
- Use environment variables
- Implement proper caching
- Use CDN for assets

### Deployment
**Deployment Guidelines:**
- Use CI/CD pipelines
- Implement proper versioning
- Use environment-specific configs
- Monitor application health
- Implement rollback strategies

## Code Quality Rules

### Code Standards
**Quality Requirements:**
- Use consistent formatting
- Implement proper linting
- Use meaningful variable names
- Write clean, readable code
- Document complex logic

### Documentation
**Documentation Standards:**
- Comment complex functions
- Document component props
- Write clear README files
- Document API usage
- Provide setup instructions

## Error Handling Rules

### Error Management
**Error Handling:**
- Implement proper error boundaries
- Use try-catch blocks appropriately
- Log errors properly
- Handle errors gracefully
- Provide user-friendly messages

### Debugging
**Debug Practices:**
- Use browser dev tools
- Implement proper logging
- Use debugging tools effectively
- Test error scenarios
- Document error handling

## Accessibility Rules

### A11y Standards
**Accessibility Requirements:**
- Use semantic HTML
- Implement ARIA attributes
- Ensure keyboard navigation
- Provide screen reader support
- Test with assistive technologies

### Testing Accessibility
**A11y Testing:**
- Use automated tools
- Test with screen readers
- Test keyboard navigation
- Test color contrast
- Test with real users

## Best Practices Summary

### Development
- Follow modern web standards
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
- Optimize code and assets
- Implement caching
- Monitor performance
- Use profiling tools
- Regular performance reviews
