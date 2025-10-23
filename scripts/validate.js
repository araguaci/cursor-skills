#!/usr/bin/env node

/**
 * CURSOR-SKILLS Validation Script
 * Validates project structure and compliance
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class CursorSkillsValidator {
  constructor() {
    this.projectRoot = process.cwd();
    this.environments = ['php', 'webdesign', 'python', 'node', 'api', 'integrations', 'mobile', 'devops', 'testing'];
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  async run() {
    console.log(chalk.blue.bold('🔍 CURSOR-SKILLS Validation'));
    console.log(chalk.gray('Validating project structure and compliance...\n'));

    try {
      await this.validateStructure();
      await this.validateFiles();
      await this.validateContent();
      await this.validateScripts();
      await this.validateTemplates();
      await this.validateExamples();
      await this.validateConfigs();
      
      this.printResults();
    } catch (error) {
      console.error(chalk.red.bold('❌ Validation failed:'), error.message);
      process.exit(1);
    }
  }

  async validateStructure() {
    console.log(chalk.yellow('📁 Validating directory structure...'));
    
    // Check main directories
    const mainDirs = ['scripts', 'configs', 'templates', 'examples'];
    for (const dir of mainDirs) {
      const dirPath = path.join(this.projectRoot, dir);
      if (await fs.pathExists(dirPath)) {
        this.success.push(`✓ Main directory ${dir}/ exists`);
      } else {
        this.errors.push(`✗ Main directory ${dir}/ missing`);
      }
    }

    // Check environment directories
    for (const env of this.environments) {
      const envPath = path.join(this.projectRoot, env);
      if (await fs.pathExists(envPath)) {
        this.success.push(`✓ Environment ${env}/ exists`);
        
        // Check environment subdirectories
        const subdirs = ['scripts', 'templates', 'examples', 'configs', 'docs'];
        for (const subdir of subdirs) {
          const subdirPath = path.join(envPath, subdir);
          if (await fs.pathExists(subdirPath)) {
            this.success.push(`  ✓ ${env}/${subdir}/ exists`);
          } else {
            this.warnings.push(`  ⚠️  ${env}/${subdir}/ missing`);
          }
        }
      } else {
        this.errors.push(`✗ Environment ${env}/ missing`);
      }
    }
  }

  async validateFiles() {
    console.log(chalk.yellow('📄 Validating required files...'));
    
    const requiredFiles = [
      'README.md',
      'CURSOR.md',
      'CONTRIBUTING.md',
      'LICENSE',
      'CHANGELOG.md',
      'package.json',
      'PROJECT_STRUCTURE.md'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(this.projectRoot, file);
      if (await fs.pathExists(filePath)) {
        this.success.push(`✓ Required file ${file} exists`);
      } else {
        this.errors.push(`✗ Required file ${file} missing`);
      }
    }

    // Check environment-specific files
    for (const env of this.environments) {
      const envPath = path.join(this.projectRoot, env);
      if (await fs.pathExists(envPath)) {
        const cursorFile = path.join(envPath, 'CURSOR.md');
        const readmeFile = path.join(envPath, 'README.md');
        
        if (await fs.pathExists(cursorFile)) {
          this.success.push(`✓ ${env}/CURSOR.md exists`);
        } else {
          this.errors.push(`✗ ${env}/CURSOR.md missing`);
        }
        
        if (await fs.pathExists(readmeFile)) {
          this.success.push(`✓ ${env}/README.md exists`);
        } else {
          this.warnings.push(`⚠️  ${env}/README.md missing`);
        }
      }
    }
  }

  async validateContent() {
    console.log(chalk.yellow('📝 Validating file content...'));
    
    // Validate package.json
    try {
      const packagePath = path.join(this.projectRoot, 'package.json');
      if (await fs.pathExists(packagePath)) {
        const packageContent = await fs.readJson(packagePath);
        
        if (packageContent.name && packageContent.name === 'cursor-skills') {
          this.success.push('✓ package.json has correct name');
        } else {
          this.errors.push('✗ package.json name is incorrect');
        }
        
        if (packageContent.scripts) {
          const requiredScripts = ['setup', 'validate', 'build', 'test', 'docs', 'lint', 'format'];
          for (const script of requiredScripts) {
            if (packageContent.scripts[script]) {
              this.success.push(`✓ Script '${script}' defined`);
            } else {
              this.warnings.push(`⚠️  Script '${script}' missing`);
            }
          }
        }
      }
    } catch (error) {
      this.errors.push('✗ package.json is invalid JSON');
    }

    // Validate CURSOR.md files
    for (const env of this.environments) {
      const cursorFile = path.join(this.projectRoot, env, 'CURSOR.md');
      if (await fs.pathExists(cursorFile)) {
        const content = await fs.readFile(cursorFile, 'utf8');
        
        if (content.includes('# CURSOR IDE Rules')) {
          this.success.push(`✓ ${env}/CURSOR.md has proper header`);
        } else {
          this.warnings.push(`⚠️  ${env}/CURSOR.md missing proper header`);
        }
        
        if (content.length > 1000) {
          this.success.push(`✓ ${env}/CURSOR.md has substantial content`);
        } else {
          this.warnings.push(`⚠️  ${env}/CURSOR.md content seems minimal`);
        }
      }
    }
  }

  async validateScripts() {
    console.log(chalk.yellow('🔧 Validating automation scripts...'));
    
    const scriptsDir = path.join(this.projectRoot, 'scripts');
    const requiredScripts = ['setup.js', 'validate.js', 'build.js', 'test.js', 'docs.js', 'lint.js', 'format.js'];
    
    for (const script of requiredScripts) {
      const scriptPath = path.join(scriptsDir, script);
      if (await fs.pathExists(scriptPath)) {
        this.success.push(`✓ Script ${script} exists`);
        
        // Check if script is executable
        const stats = await fs.stat(scriptPath);
        if (stats.mode & 0o111) {
          this.success.push(`  ✓ Script ${script} is executable`);
        } else {
          this.warnings.push(`  ⚠️  Script ${script} is not executable`);
        }
      } else {
        this.errors.push(`✗ Script ${script} missing`);
      }
    }
  }

  async validateTemplates() {
    console.log(chalk.yellow('📋 Validating project templates...'));
    
    for (const env of this.environments) {
      const templatesDir = path.join(this.projectRoot, env, 'templates');
      if (await fs.pathExists(templatesDir)) {
        const templates = await fs.readdir(templatesDir);
        
        if (templates.length > 0) {
          this.success.push(`✓ ${env}/templates/ has ${templates.length} template(s)`);
          
          for (const template of templates) {
            const templatePath = path.join(templatesDir, template);
            const templateFiles = await fs.readdir(templatePath);
            
            if (templateFiles.includes('README.md')) {
              this.success.push(`  ✓ Template ${template} has README.md`);
            } else {
              this.warnings.push(`  ⚠️  Template ${template} missing README.md`);
            }
            
            if (templateFiles.includes('package.json')) {
              this.success.push(`  ✓ Template ${template} has package.json`);
            } else {
              this.warnings.push(`  ⚠️  Template ${template} missing package.json`);
            }
          }
        } else {
          this.warnings.push(`⚠️  ${env}/templates/ is empty`);
        }
      }
    }
  }

  async validateExamples() {
    console.log(chalk.yellow('📝 Validating practical examples...'));
    
    for (const env of this.environments) {
      const examplesDir = path.join(this.projectRoot, env, 'examples');
      if (await fs.pathExists(examplesDir)) {
        const examples = await fs.readdir(examplesDir);
        
        if (examples.length > 0) {
          this.success.push(`✓ ${env}/examples/ has ${examples.length} example(s)`);
          
          for (const example of examples) {
            const examplePath = path.join(examplesDir, example);
            const exampleFiles = await fs.readdir(examplePath);
            
            if (exampleFiles.includes('README.md')) {
              this.success.push(`  ✓ Example ${example} has README.md`);
            } else {
              this.warnings.push(`  ⚠️  Example ${example} missing README.md`);
            }
          }
        } else {
          this.warnings.push(`⚠️  ${env}/examples/ is empty`);
        }
      }
    }
  }

  async validateConfigs() {
    console.log(chalk.yellow('⚙️  Validating CURSOR IDE configurations...'));
    
    const configsDir = path.join(this.projectRoot, 'configs');
    const requiredConfigs = ['settings.json', 'extensions.json', 'launch.json', 'tasks.json'];
    
    for (const config of requiredConfigs) {
      const configPath = path.join(configsDir, config);
      if (await fs.pathExists(configPath)) {
        this.success.push(`✓ Configuration ${config} exists`);
        
        try {
          const content = await fs.readJson(configPath);
          this.success.push(`  ✓ Configuration ${config} is valid JSON`);
        } catch (error) {
          this.errors.push(`✗ Configuration ${config} is invalid JSON`);
        }
      } else {
        this.warnings.push(`⚠️  Configuration ${config} missing`);
      }
    }
  }

  printResults() {
    console.log('\n' + chalk.blue.bold('📊 Validation Results:'));
    
    if (this.success.length > 0) {
      console.log('\n' + chalk.green.bold('✅ Success:'));
      this.success.forEach(item => console.log(chalk.green(`  ${item}`)));
    }
    
    if (this.warnings.length > 0) {
      console.log('\n' + chalk.yellow.bold('⚠️  Warnings:'));
      this.warnings.forEach(item => console.log(chalk.yellow(`  ${item}`)));
    }
    
    if (this.errors.length > 0) {
      console.log('\n' + chalk.red.bold('❌ Errors:'));
      this.errors.forEach(item => console.log(chalk.red(`  ${item}`)));
    }
    
    console.log('\n' + chalk.blue.bold('📈 Summary:'));
    console.log(chalk.green(`  ✅ Success: ${this.success.length}`));
    console.log(chalk.yellow(`  ⚠️  Warnings: ${this.warnings.length}`));
    console.log(chalk.red(`  ❌ Errors: ${this.errors.length}`));
    
    const total = this.success.length + this.warnings.length + this.errors.length;
    const score = total > 0 ? Math.round((this.success.length / total) * 100) : 0;
    
    console.log(chalk.blue(`  📊 Score: ${score}%`));
    
    if (this.errors.length > 0) {
      console.log('\n' + chalk.red.bold('❌ Validation failed with errors!'));
      process.exit(1);
    } else if (this.warnings.length > 0) {
      console.log('\n' + chalk.yellow.bold('⚠️  Validation completed with warnings.'));
    } else {
      console.log('\n' + chalk.green.bold('✅ Validation passed successfully!'));
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new CursorSkillsValidator();
  validator.run();
}

module.exports = CursorSkillsValidator;
