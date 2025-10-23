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
                    <a href="/${env}/">CURSOR IDE Rules</a>
                    <a href="/${env}/">Analysis & Best Practices</a>
                    <a href="/${env}/">Detailed Documentation</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🛠️ Templates</h3>
                <div class="links">
                    <a href="/${env}/">All Templates</a>
                    <a href="/${env}/">Laravel Starter</a>
                    <a href="/${env}/">React Starter</a>
                    <a href="/${env}/">Django Starter</a>
                </div>
            </div>
            
            <div class="section">
                <h3>💡 Examples</h3>
                <div class="links">
                    <a href="/${env}/">All Examples</a>
                    <a href="/${env}/">API Example</a>
                    <a href="/${env}/">Component Example</a>
                    <a href="/${env}/">Service Example</a>
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
