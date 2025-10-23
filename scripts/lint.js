#!/usr/bin/env node

/**
 * CURSOR-SKILLS Linting Script
 * Lints code and documentation for quality and consistency
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

class CursorSkillsLinter {
  constructor() {
    this.projectRoot = process.cwd();
    this.environments = ['php', 'webdesign', 'python', 'node', 'api', 'integrations', 'mobile', 'devops', 'testing'];
    this.lintResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      total: 0
    };
  }

  async run() {
    console.log(chalk.blue.bold('🔍 CURSOR-SKILLS Linting'));
    console.log(chalk.gray('Linting code and documentation...\n'));

    try {
      await this.lintJavaScript();
      await this.lintMarkdown();
      await this.lintJSON();
      await this.lintProjectStructure();
      await this.lintDocumentation();
      
      this.printLintResults();
    } catch (error) {
      console.error(chalk.red.bold('❌ Linting failed:'), error.message);
      process.exit(1);
    }
  }

  async lintJavaScript() {
    console.log(chalk.yellow('🔧 Linting JavaScript files...'));
    
    try {
      // Check if ESLint is available
      const eslintPath = path.join(this.projectRoot, 'node_modules', '.bin', 'eslint');
      if (await fs.pathExists(eslintPath)) {
        execSync('npx eslint scripts/ --format=compact', { stdio: 'inherit' });
        this.lintResults.passed++;
        console.log(chalk.gray('  ✓ JavaScript files linted'));
      } else {
        this.lintResults.warnings++;
        console.log(chalk.yellow('  ⚠️  ESLint not available, skipping JavaScript linting'));
      }
    } catch (error) {
      this.lintResults.failed++;
      console.log(chalk.red(`  ❌ JavaScript linting failed: ${error.message}`));
    }
    
    this.lintResults.total++;
  }

  async lintMarkdown() {
    console.log(chalk.yellow('📝 Linting Markdown files...'));
    
    try {
      // Check if markdownlint is available
      const markdownlintPath = path.join(this.projectRoot, 'node_modules', '.bin', 'markdownlint');
      if (await fs.pathExists(markdownlintPath)) {
        execSync('npx markdownlint "**/*.md" --ignore node_modules', { stdio: 'inherit' });
        this.lintResults.passed++;
        console.log(chalk.gray('  ✓ Markdown files linted'));
      } else {
        this.lintResults.warnings++;
        console.log(chalk.yellow('  ⚠️  markdownlint not available, skipping Markdown linting'));
      }
    } catch (error) {
      this.lintResults.failed++;
      console.log(chalk.red(`  ❌ Markdown linting failed: ${error.message}`));
    }
    
    this.lintResults.total++;
  }

  async lintJSON() {
    console.log(chalk.yellow('📄 Linting JSON files...'));
    
    const jsonFiles = [
      'package.json',
      'configs/settings.json',
      'configs/extensions.json',
      'configs/launch.json',
      'configs/tasks.json'
    ];
    
    for (const file of jsonFiles) {
      const filePath = path.join(this.projectRoot, file);
      if (await fs.pathExists(filePath)) {
        try {
          const content = await fs.readFile(filePath, 'utf8');
          JSON.parse(content);
          this.lintResults.passed++;
          console.log(chalk.gray(`  ✓ ${file} is valid JSON`));
        } catch (error) {
          this.lintResults.failed++;
          console.log(chalk.red(`  ❌ ${file} is invalid JSON: ${error.message}`));
        }
      } else {
        this.lintResults.warnings++;
        console.log(chalk.yellow(`  ⚠️  ${file} not found`));
      }
    }
    
    this.lintResults.total += jsonFiles.length;
  }

  async lintProjectStructure() {
    console.log(chalk.yellow('📁 Linting project structure...'));
    
    // Check required directories
    const requiredDirs = ['scripts', 'configs'];
    for (const dir of requiredDirs) {
      const dirPath = path.join(this.projectRoot, dir);
      if (await fs.pathExists(dirPath)) {
        this.lintResults.passed++;
        console.log(chalk.gray(`  ✓ Directory ${dir}/ exists`));
      } else {
        this.lintResults.failed++;
        console.log(chalk.red(`  ❌ Directory ${dir}/ missing`));
      }
    }
    
    // Check environment directories
    for (const env of this.environments) {
      const envPath = path.join(this.projectRoot, env);
      if (await fs.pathExists(envPath)) {
        this.lintResults.passed++;
        console.log(chalk.gray(`  ✓ Environment ${env}/ exists`));
        
        // Check environment subdirectories
        const subdirs = ['scripts', 'templates', 'examples', 'configs', 'docs'];
        for (const subdir of subdirs) {
          const subdirPath = path.join(envPath, subdir);
          if (await fs.pathExists(subdirPath)) {
            this.lintResults.passed++;
            console.log(chalk.gray(`    ✓ ${env}/${subdir}/ exists`));
          } else {
            this.lintResults.warnings++;
            console.log(chalk.yellow(`    ⚠️  ${env}/${subdir}/ missing`));
          }
        }
      } else {
        this.lintResults.failed++;
        console.log(chalk.red(`  ❌ Environment ${env}/ missing`));
      }
    }
    
    this.lintResults.total += requiredDirs.length + this.environments.length;
  }

  async lintDocumentation() {
    console.log(chalk.yellow('📚 Linting documentation...'));
    
    // Check required documentation files
    const requiredDocs = [
      'README.md',
      'CURSOR.md',
      'CONTRIBUTING.md',
      'LICENSE',
      'CHANGELOG.md',
      'PROJECT_STRUCTURE.md'
    ];
    
    for (const doc of requiredDocs) {
      const docPath = path.join(this.projectRoot, doc);
      if (await fs.pathExists(docPath)) {
        this.lintResults.passed++;
        console.log(chalk.gray(`  ✓ ${doc} exists`));
        
        // Check content quality
        const content = await fs.readFile(docPath, 'utf8');
        if (content.length > 100) {
          this.lintResults.passed++;
          console.log(chalk.gray(`    ✓ ${doc} has substantial content`));
        } else {
          this.lintResults.warnings++;
          console.log(chalk.yellow(`    ⚠️  ${doc} content seems minimal`));
        }
      } else {
        this.lintResults.failed++;
        console.log(chalk.red(`  ❌ ${doc} missing`));
      }
    }
    
    // Check environment documentation
    for (const env of this.environments) {
      const envPath = path.join(this.projectRoot, env);
      if (await fs.pathExists(envPath)) {
        const cursorFile = path.join(envPath, 'CURSOR.md');
        const readmeFile = path.join(envPath, 'README.md');
        
        if (await fs.pathExists(cursorFile)) {
          this.lintResults.passed++;
          console.log(chalk.gray(`  ✓ ${env}/CURSOR.md exists`));
          
          const content = await fs.readFile(cursorFile, 'utf8');
          if (content.includes('# CURSOR IDE Rules')) {
            this.lintResults.passed++;
            console.log(chalk.gray(`    ✓ ${env}/CURSOR.md has proper header`));
          } else {
            this.lintResults.warnings++;
            console.log(chalk.yellow(`    ⚠️  ${env}/CURSOR.md missing proper header`));
          }
        } else {
          this.lintResults.failed++;
          console.log(chalk.red(`  ❌ ${env}/CURSOR.md missing`));
        }
        
        if (await fs.pathExists(readmeFile)) {
          this.lintResults.passed++;
          console.log(chalk.gray(`  ✓ ${env}/README.md exists`));
        } else {
          this.lintResults.warnings++;
          console.log(chalk.yellow(`  ⚠️  ${env}/README.md missing`));
        }
      }
    }
    
    this.lintResults.total += requiredDocs.length + (this.environments.length * 2);
  }

  printLintResults() {
    console.log('\n' + chalk.blue.bold('📊 Lint Results:'));
    console.log(chalk.green(`  ✅ Passed: ${this.lintResults.passed}`));
    console.log(chalk.yellow(`  ⚠️  Warnings: ${this.lintResults.warnings}`));
    console.log(chalk.red(`  ❌ Failed: ${this.lintResults.failed}`));
    console.log(chalk.blue(`  📊 Total: ${this.lintResults.total}`));
    
    const successRate = this.lintResults.total > 0 
      ? Math.round((this.lintResults.passed / this.lintResults.total) * 100) 
      : 0;
    
    console.log(chalk.blue(`  📈 Success Rate: ${successRate}%`));
    
    if (this.lintResults.failed > 0) {
      console.log('\n' + chalk.red.bold('❌ Linting failed with errors!'));
      process.exit(1);
    } else if (this.lintResults.warnings > 0) {
      console.log('\n' + chalk.yellow.bold('⚠️  Linting completed with warnings.'));
    } else {
      console.log('\n' + chalk.green.bold('✅ Linting passed successfully!'));
    }
  }
}

// Run linting if called directly
if (require.main === module) {
  const linter = new CursorSkillsLinter();
  linter.run();
}

module.exports = CursorSkillsLinter;
