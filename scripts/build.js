#!/usr/bin/env node

/**
 * CURSOR-SKILLS Build Script
 * Builds documentation and generates static assets
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

class CursorSkillsBuilder {
  constructor() {
    this.projectRoot = process.cwd();
    this.buildDir = path.join(this.projectRoot, 'dist');
    this.environments = ['php', 'webdesign', 'python', 'node', 'api', 'integrations', 'mobile', 'devops', 'testing'];
  }

  async run() {
    console.log(chalk.blue.bold('🏗️  CURSOR-SKILLS Build'));
    console.log(chalk.gray('Building documentation and static assets...\n'));

    try {
      await this.cleanBuild();
      await this.createBuildStructure();
      await this.buildDocumentation();
      await this.buildTemplates();
      await this.buildExamples();
      await this.buildConfigs();
      await this.generateIndex();
      await this.generateEnvironmentPages();
      await this.generateSectionPages();
      await this.generateEnvironmentSectionPages();
      await this.generateEnvironmentConfigPages();
      await this.generateEnvironmentDocsPages();
      await this.copyAssets();
      
      console.log(chalk.green.bold('✅ Build completed successfully!'));
      console.log(chalk.gray(`Build output: ${this.buildDir}`));
    } catch (error) {
      console.error(chalk.red.bold('❌ Build failed:'), error.message);
      process.exit(1);
    }
  }

  async cleanBuild() {
    console.log(chalk.yellow('🧹 Cleaning build directory...'));
    
    if (await fs.pathExists(this.buildDir)) {
      await fs.remove(this.buildDir);
    }
    
    await fs.ensureDir(this.buildDir);
    console.log(chalk.gray('  ✓ Build directory cleaned'));
  }

  async createBuildStructure() {
    console.log(chalk.yellow('📁 Creating build structure...'));
    
    const buildDirs = [
      'environments',
      'templates',
      'examples',
      'configs',
      'assets',
      'docs'
    ];
    
    for (const dir of buildDirs) {
      await fs.ensureDir(path.join(this.buildDir, dir));
    }
    
    console.log(chalk.gray('  ✓ Build structure created'));
  }

  async buildDocumentation() {
    console.log(chalk.yellow('📚 Building documentation...'));
    
    // Copy main documentation files
    const mainDocs = ['README.md', 'CURSOR.md', 'CONTRIBUTING.md', 'LICENSE', 'CHANGELOG.md'];
    
    for (const doc of mainDocs) {
      const srcPath = path.join(this.projectRoot, doc);
      const destPath = path.join(this.buildDir, 'docs', doc);
      
      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath);
        console.log(chalk.gray(`  ✓ Copied ${doc}`));
      }
    }
    
    // Copy additional documentation files
    const additionalDocs = [
      'GITHUB_SETUP.md', 'VERCEL_DEPLOY.md', 'GITHUB_PAGES_SETUP.md', 
      'GITHUB_BRANCH_PROTECTION.md', 'PROJECT_STRUCTURE.md', 
      'NEXT_STEPS.md', 'PROJECT_STATUS.md', 'DEPLOY.md'
    ];
    
    for (const doc of additionalDocs) {
      const srcPath = path.join(this.projectRoot, doc);
      const destPath = path.join(this.buildDir, 'docs', doc);
      
      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath);
        console.log(chalk.gray(`  ✓ Copied ${doc}`));
      }
    }
    
    // Build environment documentation
    for (const env of this.environments) {
      const envSrcDir = path.join(this.projectRoot, env);
      const envBuildDir = path.join(this.buildDir, 'environments', env);
      
      if (await fs.pathExists(envSrcDir)) {
        await fs.ensureDir(envBuildDir);
        
        // Copy environment files
        const envFiles = ['CURSOR.md', 'README.md'];
        for (const file of envFiles) {
          const srcPath = path.join(envSrcDir, file);
          const destPath = path.join(envBuildDir, file);
          
          if (await fs.pathExists(srcPath)) {
            await fs.copy(srcPath, destPath);
            console.log(chalk.gray(`  ✓ Copied ${env}/${file}`));
          }
        }
        
        // Copy docs directory if exists
        const docsSrcDir = path.join(envSrcDir, 'docs');
        const docsBuildDir = path.join(envBuildDir, 'docs');
        
        if (await fs.pathExists(docsSrcDir)) {
          await fs.copy(docsSrcDir, docsBuildDir);
          console.log(chalk.gray(`  ✓ Copied ${env}/docs/`));
        }
      }
    }
  }

  async buildTemplates() {
    console.log(chalk.yellow('📋 Building project templates...'));
    
    for (const env of this.environments) {
      const templatesSrcDir = path.join(this.projectRoot, env, 'templates');
      const templatesBuildDir = path.join(this.buildDir, 'templates', env);
      
      if (await fs.pathExists(templatesSrcDir)) {
        await fs.ensureDir(templatesBuildDir);
        
        const templates = await fs.readdir(templatesSrcDir);
        for (const template of templates) {
          const srcPath = path.join(templatesSrcDir, template);
          const destPath = path.join(templatesBuildDir, template);
          
          if ((await fs.stat(srcPath)).isDirectory()) {
            await fs.copy(srcPath, destPath);
            console.log(chalk.gray(`  ✓ Built template ${env}/${template}`));
          }
        }
      }
    }
  }

  async buildExamples() {
    console.log(chalk.yellow('📝 Building practical examples...'));
    
    for (const env of this.environments) {
      const examplesSrcDir = path.join(this.projectRoot, env, 'examples');
      const examplesBuildDir = path.join(this.buildDir, 'examples', env);
      
      if (await fs.pathExists(examplesSrcDir)) {
        await fs.ensureDir(examplesBuildDir);
        
        const examples = await fs.readdir(examplesSrcDir);
        for (const example of examples) {
          const srcPath = path.join(examplesSrcDir, example);
          const destPath = path.join(examplesBuildDir, example);
          
          if ((await fs.stat(srcPath)).isDirectory()) {
            await fs.copy(srcPath, destPath);
            console.log(chalk.gray(`  ✓ Built example ${env}/${example}`));
          }
        }
      }
    }
  }

  async buildConfigs() {
    console.log(chalk.yellow('⚙️  Building CURSOR IDE configurations...'));
    
    const configsSrcDir = path.join(this.projectRoot, 'configs');
    const configsBuildDir = path.join(this.buildDir, 'configs');
    
    if (await fs.pathExists(configsSrcDir)) {
      await fs.copy(configsSrcDir, configsBuildDir);
      console.log(chalk.gray('  ✓ Built CURSOR IDE configurations'));
    }
    
    // Build environment-specific configs
    for (const env of this.environments) {
      const envConfigsSrcDir = path.join(this.projectRoot, env, 'configs');
      const envConfigsBuildDir = path.join(this.buildDir, 'configs', env);
      
      if (await fs.pathExists(envConfigsSrcDir)) {
        await fs.ensureDir(envConfigsBuildDir);
        await fs.copy(envConfigsSrcDir, envConfigsBuildDir);
        console.log(chalk.gray(`  ✓ Built ${env} configurations`));
      }
    }
  }

  async generateIndex() {
    console.log(chalk.yellow('📄 Generating index files...'));
    
    const indexContent = this.generateMainIndex();
    await fs.writeFile(path.join(this.buildDir, 'index.html'), indexContent);
    
    const packageJson = this.generateBuildPackageJson();
    await fs.writeFile(path.join(this.buildDir, 'package.json'), packageJson);
    
    console.log(chalk.gray('  ✓ Generated index files'));
  }

  generateMainIndex() {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS Community Repository</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .environments { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .environment { border: 1px solid #e1e5e9; border-radius: 8px; padding: 20px; }
        .environment h3 { margin-top: 0; color: #0366d6; }
        .links { margin-top: 15px; }
        .links a { display: inline-block; margin-right: 10px; margin-bottom: 5px; color: #0366d6; text-decoration: none; }
        .links a:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 CURSOR-SKILLS Community Repository</h1>
            <p>A comprehensive repository of best practices, rules, and guidelines for working with CURSOR IDE across different programming environments.</p>
        </div>
        
        <div class="environments">
            ${this.environments.map(env => `
                <div class="environment">
                    <h3>${env.charAt(0).toUpperCase() + env.slice(1)}</h3>
                    <p>Development rules and best practices for ${env} programming.</p>
                    <div class="links">
                        <a href="/${env}/">Rules</a>
                        <a href="/${env}/">Analysis</a>
                        <a href="/${env}/">Templates</a>
                        <a href="/${env}/">Examples</a>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div style="margin-top: 40px; text-align: center;">
            <h2>📚 Documentation</h2>
            <div class="links">
                <a href="/docs/">Main Documentation</a>
                <a href="/docs/CONTRIBUTING.md">Contributing Guide</a>
                <a href="/docs/CHANGELOG.md">Changelog</a>
                <a href="/configs/">CURSOR IDE Configurations</a>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;
  }

  generateBuildPackageJson() {
    return JSON.stringify({
      name: 'cursor-skills-build',
      version: '1.0.0',
      description: 'Built CURSOR-SKILLS documentation and assets',
      main: 'index.html',
      scripts: {
        start: 'python -m http.server 8000',
        serve: 'npx serve .'
      },
      keywords: ['cursor', 'ide', 'development', 'best-practices'],
      author: 'CURSOR-SKILLS Community',
      license: 'MIT'
    }, null, 2);
  }

  async generateEnvironmentPages() {
    console.log(chalk.yellow('📄 Generating environment pages...'));
    
    for (const env of this.environments) {
      const envPath = path.join(this.buildDir, 'environments', env);
      await fs.ensureDir(envPath);
      
      const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .content { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .section { }
        .section h3 { color: #0366d6; margin-top: 0; }
        .links { margin-top: 15px; }
        .links a { display: block; margin-bottom: 8px; color: #0366d6; text-decoration: none; padding: 8px 12px; background: #f6f8fa; border-radius: 4px; }
        .links a:hover { background: #e1e5e9; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>🚀 CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)}</h1>
            <p>Development rules and best practices for ${env} programming.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>📋 Rules & Guidelines</h3>
                <div class="links">
                    <a href="/environments/${env}/CURSOR.md">CURSOR IDE Rules</a>
                    <a href="/environments/${env}/README.md">Analysis & Best Practices</a>
                    <a href="/environments/${env}/docs/">Detailed Documentation</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🛠️ Templates</h3>
                <div class="links">
                    <a href="/templates/${env}/">All Templates</a>
                    <a href="/templates/${env}/rest-api/">REST API</a>
                    <a href="/templates/${env}/graphql-api/">GraphQL API</a>
                    <a href="/templates/${env}/grpc-api/">gRPC API</a>
                </div>
            </div>
            
            <div class="section">
                <h3>💡 Examples</h3>
                <div class="links">
                    <a href="/examples/${env}/">All Examples</a>
                    <a href="/examples/${env}/rest-endpoint-example/">REST Endpoint</a>
                    <a href="/examples/${env}/graphql-resolver-example/">GraphQL Resolver</a>
                    <a href="/examples/${env}/authentication-example/">Authentication</a>
                </div>
            </div>
            
            <div class="section">
                <h3>⚙️ Configuration</h3>
                <div class="links">
                    <a href="/configs/">CURSOR IDE Settings</a>
                    <a href="/configs/extensions.json">Extensions</a>
                    <a href="/configs/settings.json">Settings</a>
                    <a href="/configs/launch.json">Launch Configuration</a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

      await fs.writeFile(path.join(envPath, 'index.html'), html);
      console.log(chalk.gray(`  ✓ Generated page for ${env}`));
    }
    
    console.log(chalk.gray('  ✓ Environment pages generated'));
  }

  async generateSectionPages() {
    console.log(chalk.yellow('📄 Generating section pages...'));
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Generate Examples index page
    const examplesPath = path.join(this.buildDir, 'examples');
    await fs.ensureDir(examplesPath);
    
    const examplesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - Examples</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .environments { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .environment { border: 1px solid #e1e5e9; border-radius: 8px; padding: 20px; }
        .environment h3 { margin-top: 0; color: #0366d6; }
        .links { margin-top: 15px; }
        .links a { display: inline-block; margin-right: 10px; margin-bottom: 5px; color: #0366d6; text-decoration: none; }
        .links a:hover { text-decoration: underline; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>💡 CURSOR-SKILLS - Examples</h1>
            <p>Practical examples and code samples for all programming environments.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="environments">
            ${this.environments.map(env => `
                <div class="environment">
                    <h3>${env.charAt(0).toUpperCase() + env.slice(1)} Examples</h3>
                    <p>Practical examples and code samples for ${env} development.</p>
            <div class="links">
                <a href="/examples/${env}/">All Examples</a>
                ${this.getEnvironmentExamples(env).slice(0, 3).map(example => `
                    <a href="/examples/${env}/${example.id}/">${example.title}</a>
                `).join('')}
            </div>
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

    await fs.writeFile(path.join(examplesPath, 'index.html'), examplesHtml);
    console.log(chalk.gray('  ✓ Generated examples index page'));

    // Generate Templates index page
    const templatesPath = path.join(this.buildDir, 'templates');
    await fs.ensureDir(templatesPath);
    
    const templatesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - Templates</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .environments { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .environment { border: 1px solid #e1e5e9; border-radius: 8px; padding: 20px; }
        .environment h3 { margin-top: 0; color: #0366d6; }
        .links { margin-top: 15px; }
        .links a { display: inline-block; margin-right: 10px; margin-bottom: 5px; color: #0366d6; text-decoration: none; }
        .links a:hover { text-decoration: underline; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>🛠️ CURSOR-SKILLS - Templates</h1>
            <p>Project templates and boilerplates for all programming environments.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="environments">
            ${this.environments.map(env => `
                <div class="environment">
                    <h3>${env.charAt(0).toUpperCase() + env.slice(1)} Templates</h3>
                    <p>Project templates and boilerplates for ${env} development.</p>
            <div class="links">
                <a href="/templates/${env}/">All Templates</a>
                ${this.getEnvironmentTemplates(env).slice(0, 3).map(template => `
                    <a href="/templates/${env}/${template.id}/">${template.title}</a>
                `).join('')}
            </div>
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

    await fs.writeFile(path.join(templatesPath, 'index.html'), templatesHtml);
    console.log(chalk.gray('  ✓ Generated templates index page'));

    // Generate Docs index page
    const docsPath = path.join(this.buildDir, 'docs');
    await fs.ensureDir(docsPath);
    
    const docsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - Documentation</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .content { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .section { }
        .section h3 { color: #0366d6; margin-top: 0; }
        .links { margin-top: 15px; }
        .links a { display: block; margin-bottom: 8px; color: #0366d6; text-decoration: none; padding: 8px 12px; background: #f6f8fa; border-radius: 4px; }
        .links a:hover { background: #e1e5e9; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>📚 CURSOR-SKILLS - Documentation</h1>
            <p>Complete documentation and guides for all programming environments.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>📋 Main Documentation</h3>
                <div class="links">
                    <a href="/docs/README.md">Main Documentation</a>
                    <a href="/docs/CONTRIBUTING.md">Contributing Guide</a>
                    <a href="/docs/CHANGELOG.md">Changelog</a>
                    <a href="/docs/CURSOR.md">CURSOR IDE Rules</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🌍 Environment Documentation</h3>
                <div class="links">
                    <a href="/environments/php/README.md">PHP Documentation</a>
                    <a href="/environments/webdesign/README.md">Web Design Documentation</a>
                    <a href="/environments/python/README.md">Python Documentation</a>
                    <a href="/environments/node/README.md">Node.js Documentation</a>
                    <a href="/environments/api/README.md">API Documentation</a>
                    <a href="/environments/integrations/README.md">Integrations Documentation</a>
                    <a href="/environments/mobile/README.md">Mobile Documentation</a>
                    <a href="/environments/devops/README.md">DevOps Documentation</a>
                    <a href="/environments/testing/README.md">Testing Documentation</a>
                </div>
            </div>
            
            <div class="section">
                <h3>⚙️ Configuration Guides</h3>
                <div class="links">
                    <a href="/configs/">CURSOR IDE Settings</a>
                    <a href="/configs/extensions.json">Extensions</a>
                    <a href="/configs/settings.json">Settings</a>
                    <a href="/configs/launch.json">Launch Configuration</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🛠️ Development Guides</h3>
                <div class="links">
                    <a href="/docs/PROJECT_STRUCTURE.md">Project Structure</a>
                    <a href="/docs/NEXT_STEPS.md">Next Steps</a>
                    <a href="/docs/PROJECT_STATUS.md">Project Status</a>
                    <a href="/docs/DEPLOY.md">Deployment Guide</a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

    await fs.writeFile(path.join(docsPath, 'index.html'), docsHtml);
    console.log(chalk.gray('  ✓ Generated docs index page'));

    // Generate Configs index page
    const configsPath = path.join(this.buildDir, 'configs');
    await fs.ensureDir(configsPath);
    
    const configsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - Configuration</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .content { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .section { }
        .section h3 { color: #0366d6; margin-top: 0; }
        .links { margin-top: 15px; }
        .links a { display: block; margin-bottom: 8px; color: #0366d6; text-decoration: none; padding: 8px 12px; background: #f6f8fa; border-radius: 4px; }
        .links a:hover { background: #e1e5e9; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>⚙️ CURSOR-SKILLS - Configuration</h1>
            <p>CURSOR IDE configurations and settings for all programming environments.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>🔧 Main Configuration</h3>
                <div class="links">
                    <a href="/configs/settings.json">CURSOR IDE Settings</a>
                    <a href="/configs/extensions.json">Recommended Extensions</a>
                    <a href="/configs/launch.json">Launch Configuration</a>
                    <a href="/configs/tasks.json">Task Configuration</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🌍 Environment Configurations</h3>
                <div class="links">
                    <a href="/configs/php/">PHP Configuration</a>
                    <a href="/configs/webdesign/">Web Design Configuration</a>
                    <a href="/configs/python/">Python Configuration</a>
                    <a href="/configs/node/">Node.js Configuration</a>
                    <a href="/configs/api/">API Configuration</a>
                    <a href="/configs/integrations/">Integrations Configuration</a>
                    <a href="/configs/mobile/">Mobile Configuration</a>
                    <a href="/configs/devops/">DevOps Configuration</a>
                    <a href="/configs/testing/">Testing Configuration</a>
                </div>
            </div>
            
            <div class="section">
                <h3>📋 Setup Guides</h3>
                <div class="links">
                    <a href="/docs/GITHUB_SETUP.md">GitHub Setup</a>
                    <a href="/docs/VERCEL_DEPLOY.md">Vercel Deployment</a>
                    <a href="/docs/GITHUB_PAGES_SETUP.md">GitHub Pages Setup</a>
                    <a href="/docs/GITHUB_BRANCH_PROTECTION.md">Branch Protection</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🛠️ Development Tools</h3>
                <div class="links">
                    <a href="/docs/CONTRIBUTING.md">Contributing Guide</a>
                    <a href="/docs/CHANGELOG.md">Changelog</a>
                    <a href="/docs/README.md">Main Documentation</a>
                    <a href="/docs/CURSOR.md">CURSOR IDE Rules</a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

    await fs.writeFile(path.join(configsPath, 'index.html'), configsHtml);
    console.log(chalk.gray('  ✓ Generated configs index page'));
    
    console.log(chalk.gray('  ✓ Section pages generated'));
  }

  async generateEnvironmentSectionPages() {
    console.log(chalk.yellow('📄 Generating environment section pages...'));
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Generate examples pages for each environment
    for (const env of this.environments) {
      const examplesPath = path.join(this.buildDir, 'examples', env);
      await fs.ensureDir(examplesPath);
      
      const examplesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)} Examples</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .examples { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .example { border: 1px solid #e1e5e9; border-radius: 8px; padding: 20px; }
        .example h3 { margin-top: 0; color: #0366d6; }
        .example p { color: #666; margin-bottom: 15px; }
        .example-links { margin-top: 15px; }
        .example-links a { display: inline-block; margin-right: 10px; margin-bottom: 5px; color: #0366d6; text-decoration: none; padding: 5px 10px; background: #f6f8fa; border-radius: 4px; }
        .example-links a:hover { background: #e1e5e9; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>💡 CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)} Examples</h1>
            <p>Practical examples and code samples for ${env} development.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="examples">
            ${this.getEnvironmentExamples(env).map(example => `
                <div class="example">
                    <h3>${example.title}</h3>
                    <p>${example.description}</p>
                    <div class="example-links">
                        <a href="/examples/${env}/${example.id}/">View Example</a>
                        <a href="/examples/${env}/${example.id}/README.md">Documentation</a>
                        <a href="/examples/${env}/${example.id}/package.json">Package Info</a>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

      await fs.writeFile(path.join(examplesPath, 'index.html'), examplesHtml);
      console.log(chalk.gray(`  ✓ Generated examples page for ${env}`));
    }

    // Generate templates pages for each environment
    for (const env of this.environments) {
      const templatesPath = path.join(this.buildDir, 'templates', env);
      await fs.ensureDir(templatesPath);
      
      const templatesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)} Templates</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .templates { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .template { border: 1px solid #e1e5e9; border-radius: 8px; padding: 20px; }
        .template h3 { margin-top: 0; color: #0366d6; }
        .template p { color: #666; margin-bottom: 15px; }
        .template-links { margin-top: 15px; }
        .template-links a { display: inline-block; margin-right: 10px; margin-bottom: 5px; color: #0366d6; text-decoration: none; padding: 5px 10px; background: #f6f8fa; border-radius: 4px; }
        .template-links a:hover { background: #e1e5e9; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>🛠️ CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)} Templates</h1>
            <p>Project templates and boilerplates for ${env} development.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="templates">
            ${this.getEnvironmentTemplates(env).map(template => `
                <div class="template">
                    <h3>${template.title}</h3>
                    <p>${template.description}</p>
                    <div class="template-links">
                        <a href="/templates/${env}/${template.id}/">View Template</a>
                        <a href="/templates/${env}/${template.id}/README.md">Documentation</a>
                        <a href="/templates/${env}/${template.id}/package.json">Package Info</a>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

      await fs.writeFile(path.join(templatesPath, 'index.html'), templatesHtml);
      console.log(chalk.gray(`  ✓ Generated templates page for ${env}`));
    }
    
    console.log(chalk.gray('  ✓ Environment section pages generated'));
  }

  async generateEnvironmentConfigPages() {
    console.log(chalk.yellow('📄 Generating environment config pages...'));
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Generate config pages for each environment
    for (const env of this.environments) {
      const configPath = path.join(this.buildDir, 'configs', env);
      await fs.ensureDir(configPath);
      
      const configHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)} Configuration</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .content { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .section { }
        .section h3 { color: #0366d6; margin-top: 0; }
        .links { margin-top: 15px; }
        .links a { display: block; margin-bottom: 8px; color: #0366d6; text-decoration: none; padding: 8px 12px; background: #f6f8fa; border-radius: 4px; }
        .links a:hover { background: #e1e5e9; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>⚙️ CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)} Configuration</h1>
            <p>CURSOR IDE configurations and settings for ${env} development.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>🔧 Main Configuration</h3>
                <div class="links">
                    <a href="/configs/settings.json">CURSOR IDE Settings</a>
                    <a href="/configs/extensions.json">Recommended Extensions</a>
                    <a href="/configs/launch.json">Launch Configuration</a>
                    <a href="/configs/tasks.json">Task Configuration</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🌍 Environment-Specific</h3>
                <div class="links">
                    <a href="/configs/${env}/settings.json">${env.charAt(0).toUpperCase() + env.slice(1)} Settings</a>
                    <a href="/configs/${env}/extensions.json">${env.charAt(0).toUpperCase() + env.slice(1)} Extensions</a>
                    <a href="/configs/${env}/launch.json">${env.charAt(0).toUpperCase() + env.slice(1)} Launch Config</a>
                    <a href="/configs/${env}/tasks.json">${env.charAt(0).toUpperCase() + env.slice(1)} Tasks</a>
                </div>
            </div>
            
            <div class="section">
                <h3>📋 Setup Guides</h3>
                <div class="links">
                    <a href="/docs/GITHUB_SETUP.md">GitHub Setup</a>
                    <a href="/docs/VERCEL_DEPLOY.md">Vercel Deployment</a>
                    <a href="/docs/GITHUB_PAGES_SETUP.md">GitHub Pages Setup</a>
                    <a href="/docs/GITHUB_BRANCH_PROTECTION.md">Branch Protection</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🛠️ Development Tools</h3>
                <div class="links">
                    <a href="/docs/CONTRIBUTING.md">Contributing Guide</a>
                    <a href="/docs/CHANGELOG.md">Changelog</a>
                    <a href="/docs/README.md">Main Documentation</a>
                    <a href="/docs/CURSOR.md">CURSOR IDE Rules</a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

      await fs.writeFile(path.join(configPath, 'index.html'), configHtml);
      console.log(chalk.gray(`  ✓ Generated config page for ${env}`));
    }
    
    console.log(chalk.gray('  ✓ Environment config pages generated'));
  }

  async generateEnvironmentDocsPages() {
    console.log(chalk.yellow('📄 Generating environment docs pages...'));
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Generate docs pages for each environment
    for (const env of this.environments) {
      const docsPath = path.join(this.buildDir, 'environments', env, 'docs');
      await fs.ensureDir(docsPath);
      
      const docsHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)} Documentation</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f6f8fa; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #e1e5e9; padding-bottom: 20px; }
        .nav { margin-bottom: 30px; }
        .nav a { color: #0366d6; text-decoration: none; margin-right: 20px; }
        .nav a:hover { text-decoration: underline; }
        .content { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .section { }
        .section h3 { color: #0366d6; margin-top: 0; }
        .links { margin-top: 15px; }
        .links a { display: block; margin-bottom: 8px; color: #0366d6; text-decoration: none; padding: 8px 12px; background: #f6f8fa; border-radius: 4px; }
        .links a:hover { background: #e1e5e9; }
        .back-link { display: inline-block; margin-bottom: 20px; color: #0366d6; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .footer { margin-top: 60px; padding: 20px; background: #f6f8fa; border-radius: 8px; text-align: center; border-top: 2px solid #e1e5e9; }
        .footer-info { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
        .footer-item { }
        .footer-item strong { color: #0366d6; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #0366d6; text-decoration: none; margin: 0 10px; }
        .footer-links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-link">← Back to CURSOR-SKILLS</a>
        
        <div class="header">
            <h1>📚 CURSOR-SKILLS - ${env.charAt(0).toUpperCase() + env.slice(1)} Documentation</h1>
            <p>Complete documentation and guides for ${env} development with CURSOR IDE.</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>📋 Main Documentation</h3>
                <div class="links">
                    <a href="/environments/${env}/README.md">${env.charAt(0).toUpperCase() + env.slice(1)} Overview</a>
                    <a href="/environments/${env}/CURSOR.md">CURSOR IDE Rules</a>
                    <a href="/docs/README.md">Main Documentation</a>
                    <a href="/docs/CONTRIBUTING.md">Contributing Guide</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🛠️ Development Resources</h3>
                <div class="links">
                    <a href="/templates/${env}/">${env.charAt(0).toUpperCase() + env.slice(1)} Templates</a>
                    <a href="/examples/${env}/">${env.charAt(0).toUpperCase() + env.slice(1)} Examples</a>
                    <a href="/configs/${env}/">${env.charAt(0).toUpperCase() + env.slice(1)} Configuration</a>
                    <a href="/docs/CURSOR.md">CURSOR IDE Rules</a>
                </div>
            </div>
            
            <div class="section">
                <h3>📚 Additional Guides</h3>
                <div class="links">
                    <a href="/docs/GITHUB_SETUP.md">GitHub Setup</a>
                    <a href="/docs/VERCEL_DEPLOY.md">Vercel Deployment</a>
                    <a href="/docs/PROJECT_STRUCTURE.md">Project Structure</a>
                    <a href="/docs/NEXT_STEPS.md">Next Steps</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🔧 Configuration</h3>
                <div class="links">
                    <a href="/configs/settings.json">CURSOR IDE Settings</a>
                    <a href="/configs/extensions.json">Recommended Extensions</a>
                    <a href="/configs/launch.json">Launch Configuration</a>
                    <a href="/configs/tasks.json">Task Configuration</a>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-info">
                <div class="footer-item">
                    <strong>Last Updated:</strong><br>
                    ${currentDate} at ${currentTime}
                </div>
                <div class="footer-item">
                    <strong>Version:</strong><br>
                    v0.3.0
                </div>
                <div class="footer-item">
                    <strong>Status:</strong><br>
                    ✅ Production Ready
                </div>
            </div>
            <div class="footer-links">
                <a href="/docs/CHANGELOG.md">📋 View Changelog</a>
                <a href="https://github.com/araguaci/cursor-skills">🐙 GitHub Repository</a>
                <a href="/docs/CONTRIBUTING.md">🤝 Contribute</a>
                <a href="/docs/README.md">📖 Documentation</a>
            </div>
        </div>
    </div>
</body>
</html>`;

      await fs.writeFile(path.join(docsPath, 'index.html'), docsHtml);
      console.log(chalk.gray(`  ✓ Generated docs page for ${env}`));
    }
    
    console.log(chalk.gray('  ✓ Environment docs pages generated'));
  }

  getEnvironmentExamples(env) {
    const examplesMap = {
      'php': [
        { id: 'laravel-api-example', title: 'Laravel API Example', description: 'REST API with Laravel framework' },
        { id: 'symfony-service-example', title: 'Symfony Service Example', description: 'Service layer with Symfony' },
        { id: 'wordpress-plugin-example', title: 'WordPress Plugin Example', description: 'Custom plugin development' }
      ],
      'webdesign': [
        { id: 'css-grid-example', title: 'CSS Grid Example', description: 'Modern layout with CSS Grid' },
        { id: 'react-component-example', title: 'React Component Example', description: 'Reusable React component' },
        { id: 'vue-composition-example', title: 'Vue Composition Example', description: 'Vue 3 Composition API' }
      ],
      'python': [
        { id: 'django-model-example', title: 'Django Model Example', description: 'Database models with Django' },
        { id: 'flask-route-example', title: 'Flask Route Example', description: 'API routes with Flask' },
        { id: 'pandas-analysis-example', title: 'Pandas Analysis Example', description: 'Data analysis with Pandas' }
      ],
      'node': [
        { id: 'express-middleware-example', title: 'Express Middleware Example', description: 'Custom middleware for Express' },
        { id: 'nestjs-service-example', title: 'NestJS Service Example', description: 'Service layer with NestJS' },
        { id: 'socket-io-example', title: 'Socket.io Example', description: 'Real-time communication' }
      ],
      'api': [
        { id: 'authentication-example', title: 'Authentication Example', description: 'JWT authentication system' },
        { id: 'graphql-resolver-example', title: 'GraphQL Resolver Example', description: 'GraphQL API resolvers' },
        { id: 'rest-endpoint-example', title: 'REST Endpoint Example', description: 'RESTful API endpoints' }
      ],
      'integrations': [
        { id: 'database-migration-example', title: 'Database Migration Example', description: 'Database schema migrations' },
        { id: 'queue-worker-example', title: 'Queue Worker Example', description: 'Background job processing' },
        { id: 'webhook-receiver-example', title: 'Webhook Receiver Example', description: 'Webhook event handling' }
      ],
      'mobile': [
        { id: 'expo-camera-example', title: 'Expo Camera Example', description: 'Camera integration with Expo' },
        { id: 'flutter-widget-example', title: 'Flutter Widget Example', description: 'Custom Flutter widget' },
        { id: 'react-native-navigation-example', title: 'React Native Navigation Example', description: 'Navigation with React Native' }
      ],
      'devops': [
        { id: 'docker-compose-example', title: 'Docker Compose Example', description: 'Multi-container setup' },
        { id: 'github-actions-example', title: 'GitHub Actions Example', description: 'CI/CD pipeline setup' },
        { id: 'kubernetes-deployment-example', title: 'Kubernetes Deployment Example', description: 'K8s deployment configuration' }
      ],
      'testing': [
        { id: 'cypress-e2e-example', title: 'Cypress E2E Example', description: 'End-to-end testing with Cypress' },
        { id: 'jest-unit-test-example', title: 'Jest Unit Test Example', description: 'Unit testing with Jest' },
        { id: 'load-testing-example', title: 'Load Testing Example', description: 'Performance testing setup' }
      ]
    };
    
    return examplesMap[env] || [];
  }

  getEnvironmentTemplates(env) {
    const templatesMap = {
      'php': [
        { id: 'laravel-starter', title: 'Laravel Starter', description: 'Complete Laravel application template' },
        { id: 'symfony-starter', title: 'Symfony Starter', description: 'Symfony framework template' },
        { id: 'php-api', title: 'PHP API', description: 'REST API with pure PHP' },
        { id: 'wordpress-theme', title: 'WordPress Theme', description: 'Custom WordPress theme template' }
      ],
      'webdesign': [
        { id: 'react-starter', title: 'React Starter', description: 'React application template' },
        { id: 'vue-starter', title: 'Vue Starter', description: 'Vue.js application template' },
        { id: 'angular-starter', title: 'Angular Starter', description: 'Angular application template' },
        { id: 'vanilla-js', title: 'Vanilla JS', description: 'Pure JavaScript template' }
      ],
      'python': [
        { id: 'django-starter', title: 'Django Starter', description: 'Django web application template' },
        { id: 'flask-starter', title: 'Flask Starter', description: 'Flask web application template' },
        { id: 'fastapi-starter', title: 'FastAPI Starter', description: 'FastAPI application template' },
        { id: 'data-science', title: 'Data Science', description: 'Data science project template' }
      ],
      'node': [
        { id: 'express-starter', title: 'Express Starter', description: 'Express.js application template' },
        { id: 'nestjs-starter', title: 'NestJS Starter', description: 'NestJS application template' },
        { id: 'nextjs-starter', title: 'Next.js Starter', description: 'Next.js application template' },
        { id: 'node-api', title: 'Node API', description: 'Node.js API template' }
      ],
      'api': [
        { id: 'rest-api', title: 'REST API', description: 'RESTful API template' },
        { id: 'graphql-api', title: 'GraphQL API', description: 'GraphQL API template' },
        { id: 'grpc-api', title: 'gRPC API', description: 'gRPC API template' },
        { id: 'microservice', title: 'Microservice', description: 'Microservice template' }
      ],
      'integrations': [
        { id: 'database-connector', title: 'Database Connector', description: 'Database integration template' },
        { id: 'message-queue', title: 'Message Queue', description: 'Message queue integration template' },
        { id: 'service-mesh', title: 'Service Mesh', description: 'Service mesh integration template' },
        { id: 'webhook-handler', title: 'Webhook Handler', description: 'Webhook integration template' }
      ],
      'mobile': [
        { id: 'react-native-starter', title: 'React Native Starter', description: 'React Native application template' },
        { id: 'flutter-starter', title: 'Flutter Starter', description: 'Flutter application template' },
        { id: 'expo-starter', title: 'Expo Starter', description: 'Expo application template' },
        { id: 'native-starter', title: 'Native Starter', description: 'Native development template' }
      ],
      'devops': [
        { id: 'docker-starter', title: 'Docker Starter', description: 'Docker containerization template' },
        { id: 'kubernetes-starter', title: 'Kubernetes Starter', description: 'Kubernetes deployment template' },
        { id: 'ci-cd-pipeline', title: 'CI/CD Pipeline', description: 'Continuous integration template' },
        { id: 'monitoring', title: 'Monitoring', description: 'Application monitoring template' }
      ],
      'testing': [
        { id: 'unit-testing', title: 'Unit Testing', description: 'Unit testing template' },
        { id: 'integration-testing', title: 'Integration Testing', description: 'Integration testing template' },
        { id: 'e2e-testing', title: 'E2E Testing', description: 'End-to-end testing template' },
        { id: 'performance-testing', title: 'Performance Testing', description: 'Performance testing template' }
      ]
    };
    
    return templatesMap[env] || [];
  }

  async copyAssets() {
    console.log(chalk.yellow('📦 Copying assets...'));
    
    const assetsDir = path.join(this.buildDir, 'assets');
    await fs.ensureDir(assetsDir);
    
    // Create a simple CSS file
    const cssContent = `
/* CURSOR-SKILLS Styles */
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
.environment { border: 1px solid #e1e5e9; border-radius: 8px; padding: 20px; margin: 10px 0; }
.environment h3 { color: #0366d6; margin-top: 0; }
.links a { color: #0366d6; text-decoration: none; margin-right: 15px; }
.links a:hover { text-decoration: underline; }
    `.trim();
    
    await fs.writeFile(path.join(assetsDir, 'styles.css'), cssContent);
    console.log(chalk.gray('  ✓ Copied assets'));
  }
}

// Run build if called directly
if (require.main === module) {
  const builder = new CursorSkillsBuilder();
  builder.run();
}

module.exports = CursorSkillsBuilder;
