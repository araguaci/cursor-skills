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
      await this.generateSpecificTemplatePages();
      await this.generateEnvironmentConfigFiles();
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
                    ${this.getEnvironmentTemplates(env).slice(0, 3).map(template => `
                        <a href="/templates/${env}/${template.id}/">${template.title}</a>
                    `).join('')}
                </div>
            </div>
            
            <div class="section">
                <h3>💡 Examples</h3>
                <div class="links">
                    <a href="/examples/${env}/">All Examples</a>
                    ${this.getEnvironmentExamples(env).slice(0, 3).map(example => `
                        <a href="/examples/${env}/${example.id}/">${example.title}</a>
                    `).join('')}
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

  async generateSpecificTemplatePages() {
    console.log(chalk.yellow('📄 Generating specific template pages...'));
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Generate individual template pages
    for (const env of this.environments) {
      const templates = this.getEnvironmentTemplates(env);
      
      for (const template of templates) {
        const templatePath = path.join(this.buildDir, 'templates', env, template.id);
        await fs.ensureDir(templatePath);
        
        const templateHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CURSOR-SKILLS - ${template.title}</title>
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
            <h1>🛠️ ${template.title}</h1>
            <p>${template.description}</p>
        </div>
        
        <div class="nav">
            <a href="/">Home</a>
            <a href="/docs/">Documentation</a>
            <a href="/templates/">Templates</a>
            <a href="/examples/">Examples</a>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>📋 Template Files</h3>
                <div class="links">
                    <a href="/templates/${env}/${template.id}/README.md">Documentation</a>
                    <a href="/templates/${env}/${template.id}/package.json">Package Info</a>
                    <a href="/templates/${env}/${template.id}/src/">Source Code</a>
                    <a href="/templates/${env}/${template.id}/config/">Configuration</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🛠️ Development</h3>
                <div class="links">
                    <a href="/examples/${env}/">${env.charAt(0).toUpperCase() + env.slice(1)} Examples</a>
                    <a href="/configs/${env}/">${env.charAt(0).toUpperCase() + env.slice(1)} Configuration</a>
                    <a href="/environments/${env}/">${env.charAt(0).toUpperCase() + env.slice(1)} Environment</a>
                    <a href="/docs/CURSOR.md">CURSOR IDE Rules</a>
                </div>
            </div>
            
            <div class="section">
                <h3>📚 Resources</h3>
                <div class="links">
                    <a href="/docs/README.md">Main Documentation</a>
                    <a href="/docs/CONTRIBUTING.md">Contributing Guide</a>
                    <a href="/docs/CHANGELOG.md">Changelog</a>
                    <a href="/docs/CURSOR.md">CURSOR IDE Rules</a>
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

        await fs.writeFile(path.join(templatePath, 'index.html'), templateHtml);
        console.log(chalk.gray(`  ✓ Generated template page for ${env}/${template.id}`));
      }
    }
    
    console.log(chalk.gray('  ✓ Specific template pages generated'));
  }

  async generateEnvironmentConfigFiles() {
    console.log(chalk.yellow('📄 Generating environment config files...'));
    
    // Generate config files for each environment
    for (const env of this.environments) {
      const configDir = path.join(this.buildDir, 'configs', env);
      await fs.ensureDir(configDir);
      
      // Generate settings.json
      const settingsJson = {
        "editor": {
          "fontSize": 14,
          "fontFamily": "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
          "fontLigatures": true,
          "tabSize": 2,
          "insertSpaces": true,
          "wordWrap": "on",
          "lineNumbers": "on",
          "minimap": { "enabled": true },
          "bracketPairColorization": { "enabled": true }
        },
        "files": {
          "autoSave": "afterDelay",
          "autoSaveDelay": 1000,
          "exclude": {
            "**/node_modules": true,
            "**/dist": true,
            "**/build": true,
            "**/.git": true
          }
        },
        "search": {
          "exclude": {
            "**/node_modules": true,
            "**/dist": true,
            "**/build": true
          }
        },
        "terminal": {
          "integrated": {
            "fontSize": 14,
            "fontFamily": "'Fira Code', 'Cascadia Code', monospace"
          }
        }
      };
      
      await fs.writeFile(
        path.join(configDir, 'settings.json'), 
        JSON.stringify(settingsJson, null, 2)
      );
      console.log(chalk.gray(`  ✓ Generated ${env}/settings.json`));
      
      // Generate extensions.json
      const extensionsJson = {
        "recommendations": this.getEnvironmentExtensions(env)
      };
      
      await fs.writeFile(
        path.join(configDir, 'extensions.json'), 
        JSON.stringify(extensionsJson, null, 2)
      );
      console.log(chalk.gray(`  ✓ Generated ${env}/extensions.json`));
      
      // Generate launch.json
      const launchJson = {
        "version": "0.2.0",
        "configurations": this.getEnvironmentLaunchConfigs(env)
      };
      
      await fs.writeFile(
        path.join(configDir, 'launch.json'), 
        JSON.stringify(launchJson, null, 2)
      );
      console.log(chalk.gray(`  ✓ Generated ${env}/launch.json`));
      
      // Generate tasks.json
      const tasksJson = {
        "version": "2.0.0",
        "tasks": this.getEnvironmentTasks(env)
      };
      
      await fs.writeFile(
        path.join(configDir, 'tasks.json'), 
        JSON.stringify(tasksJson, null, 2)
      );
      console.log(chalk.gray(`  ✓ Generated ${env}/tasks.json`));
    }
    
    console.log(chalk.gray('  ✓ Environment config files generated'));
  }

  getEnvironmentExtensions(env) {
    const extensionsMap = {
      'php': [
        'bmewburn.vscode-intelephense-client',
        'xdebug.php-debug',
        'bradlc.vscode-tailwindcss',
        'formulahendry.auto-rename-tag'
      ],
      'webdesign': [
        'esbenp.prettier-vscode',
        'bradlc.vscode-tailwindcss',
        'ms-vscode.vscode-typescript-next',
        'formulahendry.auto-rename-tag'
      ],
      'python': [
        'ms-python.python',
        'ms-python.pylint',
        'ms-python.black-formatter',
        'ms-toolsai.jupyter'
      ],
      'node': [
        'ms-vscode.vscode-typescript-next',
        'esbenp.prettier-vscode',
        'ms-vscode.vscode-json',
        'bradlc.vscode-tailwindcss'
      ],
      'api': [
        'ms-vscode.vscode-typescript-next',
        'esbenp.prettier-vscode',
        'humao.rest-client',
        'ms-vscode.vscode-json'
      ],
      'integrations': [
        'ms-vscode.vscode-typescript-next',
        'esbenp.prettier-vscode',
        'ms-vscode.vscode-json',
        'humao.rest-client'
      ],
      'mobile': [
        'ms-vscode.vscode-typescript-next',
        'esbenp.prettier-vscode',
        'ms-vscode.vscode-json',
        'bradlc.vscode-tailwindcss'
      ],
      'devops': [
        'ms-kubernetes-tools.vscode-kubernetes-tools',
        'ms-azuretools.vscode-docker',
        'redhat.vscode-yaml',
        'ms-vscode.vscode-json'
      ],
      'testing': [
        'ms-vscode.vscode-typescript-next',
        'esbenp.prettier-vscode',
        'ms-vscode.vscode-json',
        'humao.rest-client'
      ]
    };
    
    return extensionsMap[env] || [];
  }

  getEnvironmentLaunchConfigs(env) {
    const launchConfigsMap = {
      'php': [
        {
          "name": "PHP Debug",
          "type": "php",
          "request": "launch",
          "program": "${file}",
          "cwd": "${fileDirname}",
          "port": 9003
        }
      ],
      'webdesign': [
        {
          "name": "Launch Chrome",
          "type": "chrome",
          "request": "launch",
          "url": "http://localhost:3000",
          "webRoot": "${workspaceFolder}"
        }
      ],
      'python': [
        {
          "name": "Python: Current File",
          "type": "python",
          "request": "launch",
          "program": "${file}",
          "console": "integratedTerminal"
        }
      ],
      'node': [
        {
          "name": "Launch Node",
          "type": "node",
          "request": "launch",
          "program": "${file}",
          "console": "integratedTerminal"
        }
      ],
      'api': [
        {
          "name": "Launch API Server",
          "type": "node",
          "request": "launch",
          "program": "${workspaceFolder}/src/server.js",
          "console": "integratedTerminal"
        }
      ],
      'integrations': [
        {
          "name": "Launch Integration",
          "type": "node",
          "request": "launch",
          "program": "${file}",
          "console": "integratedTerminal"
        }
      ],
      'mobile': [
        {
          "name": "Launch Mobile App",
          "type": "node",
          "request": "launch",
          "program": "${file}",
          "console": "integratedTerminal"
        }
      ],
      'devops': [
        {
          "name": "Docker Debug",
          "type": "node",
          "request": "launch",
          "program": "${file}",
          "console": "integratedTerminal"
        }
      ],
      'testing': [
        {
          "name": "Run Tests",
          "type": "node",
          "request": "launch",
          "program": "${workspaceFolder}/node_modules/.bin/jest",
          "args": ["--runInBand"],
          "console": "integratedTerminal"
        }
      ]
    };
    
    return launchConfigsMap[env] || [];
  }

  getEnvironmentTasks(env) {
    const tasksMap = {
      'php': [
        {
          "label": "PHP: Run",
          "type": "shell",
          "command": "php",
          "args": ["${file}"],
          "group": "build"
        }
      ],
      'webdesign': [
        {
          "label": "Web: Build",
          "type": "shell",
          "command": "npm",
          "args": ["run", "build"],
          "group": "build"
        }
      ],
      'python': [
        {
          "label": "Python: Run",
          "type": "shell",
          "command": "python",
          "args": ["${file}"],
          "group": "build"
        }
      ],
      'node': [
        {
          "label": "Node: Run",
          "type": "shell",
          "command": "node",
          "args": ["${file}"],
          "group": "build"
        }
      ],
      'api': [
        {
          "label": "API: Start",
          "type": "shell",
          "command": "npm",
          "args": ["start"],
          "group": "build"
        }
      ],
      'integrations': [
        {
          "label": "Integration: Run",
          "type": "shell",
          "command": "node",
          "args": ["${file}"],
          "group": "build"
        }
      ],
      'mobile': [
        {
          "label": "Mobile: Start",
          "type": "shell",
          "command": "npm",
          "args": ["start"],
          "group": "build"
        }
      ],
      'devops': [
        {
          "label": "Docker: Build",
          "type": "shell",
          "command": "docker",
          "args": ["build", "-t", "app", "."],
          "group": "build"
        }
      ],
      'testing': [
        {
          "label": "Test: Run",
          "type": "shell",
          "command": "npm",
          "args": ["test"],
          "group": "test"
        }
      ]
    };
    
    return tasksMap[env] || [];
  }

  getEnvironmentExamples(env) {
    const examplesMap = {
      'php': [
        { 
          id: 'laravel-api-example', 
          title: 'Laravel API Example', 
          description: 'REST API with Laravel framework',
          code: `<?php
// Laravel API Controller Example
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;
use App\\Models\\User;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::with('profile')->paginate(15);
        return response()->json($users);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8'
        ]);

        $user = User::create($validated);
        return response()->json($user, 201);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user->load('profile'));
    }
}`,
          files: ['app/Http/Controllers/UserController.php', 'app/Models/User.php', 'routes/api.php']
        },
        { 
          id: 'symfony-service-example', 
          title: 'Symfony Service Example', 
          description: 'Service layer with Symfony',
          code: `<?php
// Symfony Service Example
namespace App\\Service;

use Doctrine\\ORM\\EntityManagerInterface;
use App\\Entity\\Product;
use App\\Repository\\ProductRepository;

class ProductService
{
    private EntityManagerInterface $em;
    private ProductRepository $productRepository;

    public function __construct(
        EntityManagerInterface $em,
        ProductRepository $productRepository
    ) {
        $this->em = $em;
        $this->productRepository = $productRepository;
    }

    public function createProduct(array $data): Product
    {
        $product = new Product();
        $product->setName($data['name']);
        $product->setPrice($data['price']);
        $product->setDescription($data['description'] ?? '');

        $this->em->persist($product);
        $this->em->flush();

        return $product;
    }

    public function getProductsByCategory(string $category): array
    {
        return $this->productRepository->findBy(['category' => $category]);
    }
}`,
          files: ['src/Service/ProductService.php', 'src/Entity/Product.php', 'src/Repository/ProductRepository.php']
        },
        { 
          id: 'wordpress-plugin-example', 
          title: 'WordPress Plugin Example', 
          description: 'Custom plugin development',
          code: `<?php
/**
 * Plugin Name: Custom Contact Form
 * Description: A custom contact form plugin for WordPress
 * Version: 1.0.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class CustomContactForm {
    
    public function __construct() {
        add_action('init', [$this, 'init']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('wp_ajax_submit_contact_form', [$this, 'handle_form_submission']);
        add_action('wp_ajax_nopriv_submit_contact_form', [$this, 'handle_form_submission']);
    }

    public function init() {
        add_shortcode('contact_form', [$this, 'render_contact_form']);
    }

    public function enqueue_scripts() {
        wp_enqueue_script('contact-form-js', plugin_dir_url(__FILE__) . 'assets/script.js', ['jquery'], '1.0.0', true);
        wp_enqueue_style('contact-form-css', plugin_dir_url(__FILE__) . 'assets/style.css', [], '1.0.0');
    }

    public function render_contact_form() {
        ob_start();
        ?>
        <form id="contact-form" method="post">
            <input type="text" name="name" placeholder="Your Name" required>
            <input type="email" name="email" placeholder="Your Email" required>
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
        </form>
        <?php
        return ob_get_clean();
    }

    public function handle_form_submission() {
        // Handle form submission logic here
        wp_send_json_success(['message' => 'Form submitted successfully!']);
    }
}

new CustomContactForm();`,
          files: ['contact-form.php', 'assets/script.js', 'assets/style.css']
        }
      ],
      'webdesign': [
        { 
          id: 'css-grid-example', 
          title: 'CSS Grid Example', 
          description: 'Modern layout with CSS Grid',
          code: `/* CSS Grid Layout Example */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}

.grid-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.grid-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

/* Responsive Grid */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-gap: 15px;
    padding: 15px;
  }
}

/* Grid Areas Example */
.layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`,
          files: ['styles/grid.css', 'index.html', 'js/grid.js']
        },
        { 
          id: 'react-component-example', 
          title: 'React Component Example', 
          description: 'Reusable React component',
          code: `import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Custom Button Component
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick,
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };
  
  const classes = \`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`;
  
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

// Usage Example
const App = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Button Component Example</h1>
      <div className="space-x-4">
        <Button onClick={() => setCount(count + 1)}>
          Count: {count}
        </Button>
        <Button variant="secondary" size="large">
          Secondary
        </Button>
        <Button variant="danger" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
};

export default App;`,
          files: ['src/components/Button.jsx', 'src/App.jsx', 'package.json']
        },
        { 
          id: 'vue-composition-example', 
          title: 'Vue Composition Example', 
          description: 'Vue 3 Composition API',
          code: `<!-- Vue 3 Composition API Example -->
<template>
  <div class="todo-app">
    <h1>Todo List with Vue 3 Composition API</h1>
    
    <form @submit.prevent="addTodo" class="todo-form">
      <input 
        v-model="newTodo" 
        placeholder="Add a new todo..."
        class="todo-input"
      />
      <button type="submit" class="add-btn">Add</button>
    </form>
    
    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter"
        @click="currentFilter = filter"
        :class="{ active: currentFilter === filter }"
        class="filter-btn"
      >
        {{ filter }}
      </button>
    </div>
    
    <ul class="todo-list">
      <li 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <input 
          type="checkbox" 
          v-model="todo.completed"
          class="todo-checkbox"
        />
        <span class="todo-text">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)" class="delete-btn">
          Delete
        </button>
      </li>
    </ul>
    
    <div class="stats">
      <p>Total: {{ todos.length }}</p>
      <p>Completed: {{ completedCount }}</p>
      <p>Remaining: {{ remainingCount }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Reactive state
const todos = ref([]);
const newTodo = ref('');
const currentFilter = ref('all');

const filters = ['all', 'active', 'completed'];

// Computed properties
const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed);
    case 'completed':
      return todos.value.filter(todo => todo.completed);
    default:
      return todos.value;
  }
});

const completedCount = computed(() => 
  todos.value.filter(todo => todo.completed).length
);

const remainingCount = computed(() => 
  todos.value.filter(todo => !todo.completed).length
);

// Methods
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    });
    newTodo.value = '';
  }
};

const removeTodo = (id) => {
  const index = todos.value.findIndex(todo => todo.id === id);
  if (index > -1) {
    todos.value.splice(index, 1);
  }
};

// Lifecycle
onMounted(() => {
  // Load todos from localStorage
  const saved = localStorage.getItem('todos');
  if (saved) {
    todos.value = JSON.parse(saved);
  }
});

// Watch for changes and save to localStorage
watch(todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos));
}, { deep: true });
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 5px 15px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
}

.filter-btn.active {
  background: #007bff;
  color: white;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #eee;
  margin-bottom: 5px;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}
</style>`,
          files: ['src/components/TodoApp.vue', 'src/main.js', 'package.json']
        }
      ],
      'python': [
        { 
          id: 'django-model-example', 
          title: 'Django Model Example', 
          description: 'Database models with Django',
          code: `# Django Models Example
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']
    
    def __str__(self):
        return self.name

class Product(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    stock_quantity = models.PositiveIntegerField(default=0)
    rating = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        null=True, blank=True
    )
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'status']),
            models.Index(fields=['price']),
        ]
    
    def __str__(self):
        return self.name
    
    def is_in_stock(self):
        return self.stock_quantity > 0
    
    def get_discount_price(self, discount_percent):
        return self.price * (1 - discount_percent / 100)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/')
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-is_primary', 'created_at']`,
          files: ['models.py', 'admin.py', 'views.py', 'serializers.py']
        },
        { 
          id: 'flask-route-example', 
          title: 'Flask Route Example', 
          description: 'API routes with Flask',
          code: `# Flask API Routes Example
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import Schema, fields, validate
from datetime import datetime
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<User {self.username}>'

# Schemas
class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True)
    created_at = fields.DateTime(dump_only=True)

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Routes
@app.route('/api/users', methods=['GET'])
def get_users():
    """Get all users with pagination"""
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    users = User.query.paginate(
        page=page, 
        per_page=per_page, 
        error_out=False
    )
    
    return jsonify({
        'users': users_schema.dump(users.items),
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': users.total,
            'pages': users.pages
        }
    })

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get a specific user by ID"""
    user = User.query.get_or_404(user_id)
    return jsonify(user_schema.dump(user))

@app.route('/api/users', methods=['POST'])
def create_user():
    """Create a new user"""
    try:
        data = request.get_json()
        errors = user_schema.validate(data)
        
        if errors:
            return jsonify({'errors': errors}), 400
        
        user = User(
            username=data['username'],
            email=data['email']
        )
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify(user_schema.dump(user)), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update a user"""
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    
    db.session.commit()
    return jsonify(user_schema.dump(user))

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Delete a user"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'message': 'User deleted successfully'}), 200

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)`,
          files: ['app.py', 'models.py', 'requirements.txt', 'config.py']
        },
        { 
          id: 'pandas-analysis-example', 
          title: 'Pandas Analysis Example', 
          description: 'Data analysis with Pandas',
          code: `# Pandas Data Analysis Example
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Sample data generation
def generate_sample_data():
    """Generate sample sales data"""
    np.random.seed(42)
    dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
    
    data = {
        'date': dates,
        'product': np.random.choice(['Laptop', 'Phone', 'Tablet', 'Monitor'], len(dates)),
        'category': np.random.choice(['Electronics', 'Computers', 'Mobile'], len(dates)),
        'sales_amount': np.random.normal(1000, 300, len(dates)),
        'quantity': np.random.randint(1, 10, len(dates)),
        'region': np.random.choice(['North', 'South', 'East', 'West'], len(dates)),
        'customer_id': np.random.randint(1000, 9999, len(dates))
    }
    
    return pd.DataFrame(data)

# Data analysis functions
def analyze_sales_trends(df):
    """Analyze sales trends over time"""
    df['month'] = df['date'].dt.month
    df['quarter'] = df['date'].dt.quarter
    
    # Monthly sales summary
    monthly_sales = df.groupby('month')['sales_amount'].agg(['sum', 'mean', 'count']).reset_index()
    monthly_sales.columns = ['month', 'total_sales', 'avg_sales', 'transaction_count']
    
    return monthly_sales

def product_performance_analysis(df):
    """Analyze product performance"""
    product_stats = df.groupby('product').agg({
        'sales_amount': ['sum', 'mean', 'count'],
        'quantity': 'sum'
    }).round(2)
    
    product_stats.columns = ['total_revenue', 'avg_sale', 'transaction_count', 'total_quantity']
    product_stats = product_stats.sort_values('total_revenue', ascending=False)
    
    return product_stats

def regional_analysis(df):
    """Analyze sales by region"""
    regional_stats = df.groupby('region').agg({
        'sales_amount': ['sum', 'mean'],
        'customer_id': 'nunique'
    }).round(2)
    
    regional_stats.columns = ['total_revenue', 'avg_sale', 'unique_customers']
    regional_stats['revenue_share'] = (regional_stats['total_revenue'] / 
                                      regional_stats['total_revenue'].sum() * 100).round(2)
    
    return regional_stats

def create_visualizations(df):
    """Create data visualizations"""
    plt.style.use('seaborn-v0_8')
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    
    # Monthly sales trend
    monthly_data = df.groupby(df['date'].dt.month)['sales_amount'].sum()
    axes[0, 0].plot(monthly_data.index, monthly_data.values, marker='o')
    axes[0, 0].set_title('Monthly Sales Trend')
    axes[0, 0].set_xlabel('Month')
    axes[0, 0].set_ylabel('Sales Amount')
    
    # Product performance
    product_sales = df.groupby('product')['sales_amount'].sum().sort_values(ascending=True)
    axes[0, 1].barh(product_sales.index, product_sales.values)
    axes[0, 1].set_title('Product Sales Performance')
    axes[0, 1].set_xlabel('Sales Amount')
    
    # Regional distribution
    regional_sales = df.groupby('region')['sales_amount'].sum()
    axes[1, 0].pie(regional_sales.values, labels=regional_sales.index, autopct='%1.1f%%')
    axes[1, 0].set_title('Sales Distribution by Region')
    
    # Sales amount distribution
    axes[1, 1].hist(df['sales_amount'], bins=30, alpha=0.7, edgecolor='black')
    axes[1, 1].set_title('Sales Amount Distribution')
    axes[1, 1].set_xlabel('Sales Amount')
    axes[1, 1].set_ylabel('Frequency')
    
    plt.tight_layout()
    plt.savefig('sales_analysis.png', dpi=300, bbox_inches='tight')
    plt.show()

def generate_report(df):
    """Generate comprehensive sales report"""
    print("=" * 50)
    print("SALES ANALYSIS REPORT")
    print("=" * 50)
    
    # Basic statistics
    print(f"\\nTotal Records: {len(df):,}")
    print(f"Date Range: {df['date'].min().strftime('%Y-%m-%d')} to {df['date'].max().strftime('%Y-%m-%d')}")
    print(f"Total Revenue: \${df['sales_amount'].sum():,.2f}")
    print(f"Average Sale: \${df['sales_amount'].mean():.2f}")
    print(f"Total Quantity Sold: {df['quantity'].sum():,}")
    
    # Top products
    print("\\n" + "=" * 30)
    print("TOP PRODUCTS BY REVENUE")
    print("=" * 30)
    top_products = product_performance_analysis(df)
    print(top_products.head())
    
    # Regional analysis
    print("\\n" + "=" * 30)
    print("REGIONAL ANALYSIS")
    print("=" * 30)
    regional = regional_analysis(df)
    print(regional)
    
    # Monthly trends
    print("\\n" + "=" * 30)
    print("MONTHLY SALES SUMMARY")
    print("=" * 30)
    monthly = analyze_sales_trends(df)
    print(monthly)

# Main execution
if __name__ == "__main__":
    # Generate and analyze data
    df = generate_sample_data()
    
    # Perform analysis
    generate_report(df)
    
    # Create visualizations
    create_visualizations(df)
    
    # Save processed data
    df.to_csv('sales_data_processed.csv', index=False)
    print("\\nAnalysis complete! Data saved to 'sales_data_processed.csv'")`,
          files: ['analysis.py', 'requirements.txt', 'data/sales_data.csv', 'notebooks/analysis.ipynb']
        }
      ],
      'node': [
        { 
          id: 'express-middleware-example', 
          title: 'Express Middleware Example', 
          description: 'Custom middleware for Express',
          code: `// Express Middleware Example
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Logging middleware
app.use(morgan('combined'));

// Custom authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Verify JWT token (simplified example)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Request validation middleware
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }
    next();
  };
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid credentials'
    });
  }
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

// Async error wrapper
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Example routes using middleware
app.get('/api/public', (req, res) => {
  res.json({ message: 'Public endpoint' });
});

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ 
    message: 'Protected endpoint',
    user: req.user 
  });
});

app.post('/api/users', 
  validateRequest(userSchema),
  asyncHandler(async (req, res) => {
    // Create user logic here
    res.status(201).json({ message: 'User created successfully' });
  })
);

// Apply error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          files: ['middleware/auth.js', 'middleware/validation.js', 'middleware/error.js', 'app.js']
        },
        { 
          id: 'nestjs-service-example', 
          title: 'NestJS Service Example', 
          description: 'Service layer with NestJS',
          code: `// NestJS Service Example
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password before saving
    const hashedPassword = await this.hashPassword(createUserDto.password);
    
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ users: User[], total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
      select: ['id', 'email', 'firstName', 'lastName', 'createdAt'],
      order: { createdAt: 'DESC' }
    });

    return { users, total };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'createdAt', 'updatedAt']
    });

    if (!user) {
      throw new NotFoundException(\`User with ID \${id} not found\`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Check if email is being updated and if it's already taken
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email }
      });

      if (existingUser) {
        throw new ConflictException('Email already in use');
      }
    }

    // Hash new password if provided
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    await this.userRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'firstName', 'lastName']
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    
    if (user && await this.comparePassword(password, user.password)) {
      const { password: _, ...result } = user;
      return result as User;
    }
    
    return null;
  }

  private async hashPassword(password: string): Promise<string> {
    const bcrypt = require('bcrypt');
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(password, hashedPassword);
  }

  // Business logic methods
  async getUserStats(userId: string): Promise<{ totalPosts: number, lastLogin: Date }> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      totalPosts: user.posts?.length || 0,
      lastLogin: user.updatedAt
    };
  }

  async searchUsers(query: string, paginationDto: PaginationDto): Promise<{ users: User[], total: number }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .where('user.firstName ILIKE :query OR user.lastName ILIKE :query OR user.email ILIKE :query', {
        query: \`%\${query}%\`
      })
      .skip(skip)
      .take(limit)
      .orderBy('user.createdAt', 'DESC');

    const [users, total] = await queryBuilder.getManyAndCount();

    return { users, total };
  }
}`,
          files: ['user.service.ts', 'user.entity.ts', 'dto/create-user.dto.ts', 'dto/update-user.dto.ts']
        },
        { 
          id: 'socket-io-example', 
          title: 'Socket.io Example', 
          description: 'Real-time communication',
          code: `// Socket.io Real-time Communication Example
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Store connected users
const connectedUsers = new Map();
const rooms = new Map();

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(\`User connected: \${socket.id}\`);

  // User joins with authentication
  socket.on('join', async (userData) => {
    try {
      // Validate user data
      const { userId, username, roomId } = userData;
      
      if (!userId || !username) {
        socket.emit('error', { message: 'Invalid user data' });
        return;
      }

      // Store user information
      connectedUsers.set(socket.id, {
        userId,
        username,
        roomId: roomId || 'general',
        socketId: socket.id,
        joinedAt: new Date()
      });

      // Join room
      socket.join(roomId || 'general');
      
      // Notify room about new user
      socket.to(roomId || 'general').emit('user_joined', {
        userId,
        username,
        timestamp: new Date()
      });

      // Send current room users to the new user
      const roomUsers = Array.from(connectedUsers.values())
        .filter(user => user.roomId === (roomId || 'general'))
        .map(user => ({
          userId: user.userId,
          username: user.username
        }));

      socket.emit('room_users', roomUsers);

      console.log(\`User \${username} joined room \${roomId || 'general'}\`);
    } catch (error) {
      socket.emit('error', { message: 'Failed to join room' });
    }
  });

  // Handle chat messages
  socket.on('send_message', (messageData) => {
    const user = connectedUsers.get(socket.id);
    
    if (!user) {
      socket.emit('error', { message: 'User not authenticated' });
      return;
    }

    const message = {
      id: Date.now() + Math.random(),
      userId: user.userId,
      username: user.username,
      content: messageData.content,
      timestamp: new Date(),
      roomId: user.roomId,
      type: messageData.type || 'text'
    };

    // Broadcast message to room
    io.to(user.roomId).emit('new_message', message);
    
    // Store message in room history
    if (!rooms.has(user.roomId)) {
      rooms.set(user.roomId, []);
    }
    
    const roomMessages = rooms.get(user.roomId);
    roomMessages.push(message);
    
    // Keep only last 100 messages per room
    if (roomMessages.length > 100) {
      roomMessages.shift();
    }
  });

  // Handle typing indicators
  socket.on('typing_start', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.to(user.roomId).emit('user_typing', {
        userId: user.userId,
        username: user.username
      });
    }
  });

  socket.on('typing_stop', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.to(user.roomId).emit('user_stopped_typing', {
        userId: user.userId,
        username: user.username
      });
    }
  });

  // Handle room switching
  socket.on('switch_room', (newRoomId) => {
    const user = connectedUsers.get(socket.id);
    
    if (user) {
      // Leave current room
      socket.leave(user.roomId);
      socket.to(user.roomId).emit('user_left', {
        userId: user.userId,
        username: user.username,
        timestamp: new Date()
      });

      // Join new room
      user.roomId = newRoomId;
      socket.join(newRoomId);
      
      // Notify new room
      socket.to(newRoomId).emit('user_joined', {
        userId: user.userId,
        username: user.username,
        timestamp: new Date()
      });

      // Send room history
      const roomHistory = rooms.get(newRoomId) || [];
      socket.emit('room_history', roomHistory);

      // Send new room users
      const roomUsers = Array.from(connectedUsers.values())
        .filter(u => u.roomId === newRoomId)
        .map(u => ({
          userId: u.userId,
          username: u.username
        }));

      socket.emit('room_users', roomUsers);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    
    if (user) {
      // Notify room about user leaving
      socket.to(user.roomId).emit('user_left', {
        userId: user.userId,
        username: user.username,
        timestamp: new Date()
      });

      // Remove user from connected users
      connectedUsers.delete(socket.id);
      
      console.log(\`User \${user.username} disconnected\`);
    }
  });

  // Handle errors
  socket.on('error', (error) => {
    console.error(\`Socket error: \${error}\`);
    socket.emit('error', { message: 'An error occurred' });
  });
});

// REST API endpoints
app.get('/api/rooms/:roomId/messages', (req, res) => {
  const { roomId } = req.params;
  const messages = rooms.get(roomId) || [];
  res.json(messages);
});

app.get('/api/rooms/:roomId/users', (req, res) => {
  const { roomId } = req.params;
  const roomUsers = Array.from(connectedUsers.values())
    .filter(user => user.roomId === roomId)
    .map(user => ({
      userId: user.userId,
      username: user.username,
      joinedAt: user.joinedAt
    }));
  
  res.json(roomUsers);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          files: ['server.js', 'client.js', 'package.json', 'public/index.html']
        }
      ],
      'api': [
        { 
          id: 'authentication-example', 
          title: 'Authentication Example', 
          description: 'JWT authentication system',
          code: `// JWT Authentication System Example
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

// In-memory user store (use database in production)
const users = [];
const refreshTokens = new Set();

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
const JWT_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

// Helper functions
const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'your-app',
    audience: 'your-app-users'
  });

  const refreshToken = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN
  });

  return { accessToken, refreshToken };
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Routes
// Register
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'user',
      createdAt: new Date()
    };

    users.push(user);

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    refreshTokens.add(refreshToken);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);
    refreshTokens.add(refreshToken);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Refresh token
app.post('/api/auth/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    if (!refreshTokens.has(refreshToken)) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const decoded = verifyToken(refreshToken, JWT_REFRESH_SECRET);
    const user = users.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);
    
    // Remove old refresh token and add new one
    refreshTokens.delete(refreshToken);
    refreshTokens.add(newRefreshToken);

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    });

  } catch (error) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  const { refreshToken } = req.body;
  
  if (refreshToken) {
    refreshTokens.delete(refreshToken);
  }

  res.json({ message: 'Logout successful' });
});

// Protected routes
app.get('/api/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  res.json({
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      createdAt: user.createdAt
    }
  });
});

app.get('/api/admin/users', authenticateToken, authorize('admin'), (req, res) => {
  const userList = users.map(user => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    createdAt: user.createdAt
  }));

  res.json({ users: userList });
});

// Change password
app.put('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = users.find(u => u.id === req.user.id);

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const saltRounds = 12;
    user.password = await bcrypt.hash(newPassword, saltRounds);

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Password change failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Authentication server running on port \${PORT}\`);
});`,
          files: ['auth.js', 'middleware/auth.js', 'models/User.js', 'routes/auth.js']
        },
        { 
          id: 'graphql-resolver-example', 
          title: 'GraphQL Resolver Example', 
          description: 'GraphQL API resolvers',
          code: `// GraphQL API Resolvers Example
const { ApolloServer } = require('apollo-server-express');
const { buildSchema } = require('graphql');
const express = require('express');

// Sample data (use database in production)
let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, posts: [] },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25, posts: [] }
];

let posts = [
  { id: '1', title: 'First Post', content: 'This is my first post', authorId: '1', published: true },
  { id: '2', title: 'Second Post', content: 'This is my second post', authorId: '1', published: false },
  { id: '3', title: 'Third Post', content: 'This is my third post', authorId: '2', published: true }
];

// GraphQL Schema
const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    published: Boolean!
    createdAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
    searchUsers(query: String!): [User!]!
    publishedPosts: [Post!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean!
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post
    deletePost(id: ID!): Boolean!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  input CreatePostInput {
    title: String!
    content: String!
    authorId: ID!
    published: Boolean = false
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
  }
\`;

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    
    user: (_, { id }) => {
      const user = users.find(u => u.id === id);
      if (!user) {
        throw new Error(\`User with ID \${id} not found\`);
      }
      return user;
    },
    
    posts: () => posts,
    
    post: (_, { id }) => {
      const post = posts.find(p => p.id === id);
      if (!post) {
        throw new Error(\`Post with ID \${id} not found\`);
      }
      return post;
    },
    
    searchUsers: (_, { query }) => {
      return users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    },
    
    publishedPosts: () => posts.filter(post => post.published)
  },

  Mutation: {
    createUser: (_, { input }) => {
      const user = {
        id: (users.length + 1).toString(),
        ...input,
        posts: []
      };
      users.push(user);
      return user;
    },
    
    updateUser: (_, { id, input }) => {
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error(\`User with ID \${id} not found\`);
      }
      
      users[userIndex] = { ...users[userIndex], ...input };
      return users[userIndex];
    },
    
    deleteUser: (_, { id }) => {
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error(\`User with ID \${id} not found\`);
      }
      
      users.splice(userIndex, 1);
      // Also delete user's posts
      posts = posts.filter(p => p.authorId !== id);
      return true;
    },
    
    createPost: (_, { input }) => {
      const author = users.find(u => u.id === input.authorId);
      if (!author) {
        throw new Error(\`User with ID \${input.authorId} not found\`);
      }
      
      const post = {
        id: (posts.length + 1).toString(),
        ...input,
        createdAt: new Date().toISOString()
      };
      posts.push(post);
      return post;
    },
    
    updatePost: (_, { id, input }) => {
      const postIndex = posts.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new Error(\`Post with ID \${id} not found\`);
      }
      
      posts[postIndex] = { ...posts[postIndex], ...input };
      return posts[postIndex];
    },
    
    deletePost: (_, { id }) => {
      const postIndex = posts.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new Error(\`Post with ID \${id} not found\`);
      }
      
      posts.splice(postIndex, 1);
      return true;
    }
  },

  User: {
    posts: (user) => posts.filter(post => post.authorId === user.id)
  },

  Post: {
    author: (post) => users.find(user => user.id === post.authorId)
  }
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add authentication context here
    return {
      user: req.user || null
    };
  },
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      locations: error.locations,
      path: error.path
    };
  }
});

const app = express();

// Apply middleware
server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(\`GraphQL server running at http://localhost:\${PORT}\${server.graphqlPath}\`);
});

module.exports = { server, app };`,
          files: ['server.js', 'schema.js', 'resolvers.js', 'types.js']
        },
        { 
          id: 'rest-endpoint-example', 
          title: 'REST Endpoint Example', 
          description: 'RESTful API endpoints',
          code: `// RESTful API Endpoints Example
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Sample data (use database in production)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, createdAt: new Date() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, createdAt: new Date() }
];

let posts = [
  { id: 1, title: 'First Post', content: 'This is my first post', userId: 1, published: true },
  { id: 2, title: 'Second Post', content: 'This is my second post', userId: 1, published: false },
  { id: 3, title: 'Third Post', content: 'This is my third post', userId: 2, published: true }
];

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

// User validation rules
const userValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('age').optional().isInt({ min: 0, max: 120 }).withMessage('Age must be between 0 and 120')
];

const postValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('userId').isInt().withMessage('Valid user ID is required'),
  body('published').optional().isBoolean().withMessage('Published must be boolean')
];

// Helper functions
const findUserById = (id) => users.find(u => u.id === parseInt(id));
const findPostById = (id) => posts.find(p => p.id === parseInt(id));
const getNextId = (array) => Math.max(...array.map(item => item.id), 0) + 1;

// USER ENDPOINTS

// GET /api/users - Get all users with pagination and filtering
app.get('/api/users', (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'id', sortOrder = 'asc' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    let filteredUsers = [...users];

    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    filteredUsers.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (sortOrder === 'desc') {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });

    // Pagination
    const paginatedUsers = filteredUsers.slice(offset, offset + limitNum);
    const totalPages = Math.ceil(filteredUsers.length / limitNum);

    res.json({
      users: paginatedUsers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredUsers.length,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = findUserById(req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// POST /api/users - Create new user
app.post('/api/users', userValidationRules, validateRequest, (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const newUser = {
      id: getNextId(users),
      name,
      email,
      age: age || null,
      createdAt: new Date()
    };

    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id - Update user
app.put('/api/users/:id', userValidationRules, validateRequest, (req, res) => {
  try {
    const user = findUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, email, age } = req.body;

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = users.find(u => u.email === email && u.id !== user.id);
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }
    }

    // Update user
    Object.assign(user, { name, email, age });
    user.updatedAt = new Date();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id - Delete user
app.delete('/api/users/:id', (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user's posts
    posts = posts.filter(p => p.userId !== parseInt(req.params.id));
    
    // Delete user
    users.splice(userIndex, 1);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// POST ENDPOINTS

// GET /api/posts - Get all posts with filtering
app.get('/api/posts', (req, res) => {
  try {
    const { userId, published, page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    let filteredPosts = [...posts];

    // Filter by user
    if (userId) {
      filteredPosts = filteredPosts.filter(p => p.userId === parseInt(userId));
    }

    // Filter by published status
    if (published !== undefined) {
      const isPublished = published === 'true';
      filteredPosts = filteredPosts.filter(p => p.published === isPublished);
    }

    // Pagination
    const paginatedPosts = filteredPosts.slice(offset, offset + limitNum);
    const totalPages = Math.ceil(filteredPosts.length / limitNum);

    res.json({
      posts: paginatedPosts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredPosts.length,
        totalPages,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:id - Get post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = findPostById(req.params.id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post);
});

// POST /api/posts - Create new post
app.post('/api/posts', postValidationRules, validateRequest, (req, res) => {
  try {
    const { title, content, userId, published = false } = req.body;

    // Check if user exists
    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newPost = {
      id: getNextId(posts),
      title,
      content,
      userId: parseInt(userId),
      published: Boolean(published),
      createdAt: new Date()
    };

    posts.push(newPost);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT /api/posts/:id - Update post
app.put('/api/posts/:id', postValidationRules, validateRequest, (req, res) => {
  try {
    const post = findPostById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const { title, content, published } = req.body;

    // Update post
    Object.assign(post, { title, content, published: Boolean(published) });
    post.updatedAt = new Date();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE /api/posts/:id - Delete post
app.delete('/api/posts/:id', (req, res) => {
  try {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }

    posts.splice(postIndex, 1);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Apply error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`REST API server running on port \${PORT}\`);
});`,
          files: ['server.js', 'routes/users.js', 'routes/posts.js', 'middleware/validation.js']
        }
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
