#!/usr/bin/env node

/**
 * CURSOR-SKILLS Formatting Script
 * Formats code and documentation for consistency
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

class CursorSkillsFormatter {
  constructor() {
    this.projectRoot = process.cwd();
    this.environments = ['php', 'webdesign', 'python', 'node', 'api', 'integrations', 'mobile', 'devops', 'testing'];
    this.formatResults = {
      formatted: 0,
      skipped: 0,
      failed: 0,
      total: 0
    };
  }

  async run() {
    console.log(chalk.blue.bold('✨ CURSOR-SKILLS Formatting'));
    console.log(chalk.gray('Formatting code and documentation...\n'));

    try {
      await this.formatJavaScript();
      await this.formatMarkdown();
      await this.formatJSON();
      await this.formatProjectStructure();
      await this.formatDocumentation();
      
      this.printFormatResults();
    } catch (error) {
      console.error(chalk.red.bold('❌ Formatting failed:'), error.message);
      process.exit(1);
    }
  }

  async formatJavaScript() {
    console.log(chalk.yellow('🔧 Formatting JavaScript files...'));
    
    try {
      // Check if Prettier is available
      const prettierPath = path.join(this.projectRoot, 'node_modules', '.bin', 'prettier');
      if (await fs.pathExists(prettierPath)) {
        execSync('npx prettier --write "scripts/**/*.js"', { stdio: 'inherit' });
        this.formatResults.formatted++;
        console.log(chalk.gray('  ✓ JavaScript files formatted'));
      } else {
        this.formatResults.skipped++;
        console.log(chalk.yellow('  ⚠️  Prettier not available, skipping JavaScript formatting'));
      }
    } catch (error) {
      this.formatResults.failed++;
      console.log(chalk.red(`  ❌ JavaScript formatting failed: ${error.message}`));
    }
    
    this.formatResults.total++;
  }

  async formatMarkdown() {
    console.log(chalk.yellow('📝 Formatting Markdown files...'));
    
    try {
      // Check if Prettier is available
      const prettierPath = path.join(this.projectRoot, 'node_modules', '.bin', 'prettier');
      if (await fs.pathExists(prettierPath)) {
        execSync('npx prettier --write "**/*.md" --ignore-path .gitignore', { stdio: 'inherit' });
        this.formatResults.formatted++;
        console.log(chalk.gray('  ✓ Markdown files formatted'));
      } else {
        this.formatResults.skipped++;
        console.log(chalk.yellow('  ⚠️  Prettier not available, skipping Markdown formatting'));
      }
    } catch (error) {
      this.formatResults.failed++;
      console.log(chalk.red(`  ❌ Markdown formatting failed: ${error.message}`));
    }
    
    this.formatResults.total++;
  }

  async formatJSON() {
    console.log(chalk.yellow('📄 Formatting JSON files...'));
    
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
          const parsed = JSON.parse(content);
          const formatted = JSON.stringify(parsed, null, 2);
          
          if (content !== formatted) {
            await fs.writeFile(filePath, formatted);
            this.formatResults.formatted++;
            console.log(chalk.gray(`  ✓ ${file} formatted`));
          } else {
            this.formatResults.skipped++;
            console.log(chalk.gray(`  - ${file} already formatted`));
          }
        } catch (error) {
          this.formatResults.failed++;
          console.log(chalk.red(`  ❌ ${file} formatting failed: ${error.message}`));
        }
      } else {
        this.formatResults.skipped++;
        console.log(chalk.yellow(`  ⚠️  ${file} not found`));
      }
    }
    
    this.formatResults.total += jsonFiles.length;
  }

  async formatProjectStructure() {
    console.log(chalk.yellow('📁 Formatting project structure...'));
    
    // Ensure required directories exist
    const requiredDirs = ['scripts', 'configs'];
    for (const dir of requiredDirs) {
      const dirPath = path.join(this.projectRoot, dir);
      if (!(await fs.pathExists(dirPath))) {
        await fs.ensureDir(dirPath);
        this.formatResults.formatted++;
        console.log(chalk.gray(`  ✓ Created directory ${dir}/`));
      } else {
        this.formatResults.skipped++;
        console.log(chalk.gray(`  - Directory ${dir}/ already exists`));
      }
    }
    
    // Ensure environment directories exist
    for (const env of this.environments) {
      const envPath = path.join(this.projectRoot, env);
      if (!(await fs.pathExists(envPath))) {
        await fs.ensureDir(envPath);
        this.formatResults.formatted++;
        console.log(chalk.gray(`  ✓ Created environment ${env}/`));
      } else {
        this.formatResults.skipped++;
        console.log(chalk.gray(`  - Environment ${env}/ already exists`));
      }
      
      // Ensure environment subdirectories exist
      const subdirs = ['scripts', 'templates', 'examples', 'configs', 'docs'];
      for (const subdir of subdirs) {
        const subdirPath = path.join(envPath, subdir);
        if (!(await fs.pathExists(subdirPath))) {
          await fs.ensureDir(subdirPath);
          this.formatResults.formatted++;
          console.log(chalk.gray(`    ✓ Created ${env}/${subdir}/`));
        } else {
          this.formatResults.skipped++;
          console.log(chalk.gray(`    - ${env}/${subdir}/ already exists`));
        }
      }
    }
    
    this.formatResults.total += requiredDirs.length + this.environments.length;
  }

  async formatDocumentation() {
    console.log(chalk.yellow('📚 Formatting documentation...'));
    
    // Format main documentation files
    const mainDocs = ['README.md', 'CURSOR.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'PROJECT_STRUCTURE.md'];
    
    for (const doc of mainDocs) {
      const docPath = path.join(this.projectRoot, doc);
      if (await fs.pathExists(docPath)) {
        try {
          const content = await fs.readFile(docPath, 'utf8');
          const formatted = this.formatMarkdownContent(content);
          
          if (content !== formatted) {
            await fs.writeFile(docPath, formatted);
            this.formatResults.formatted++;
            console.log(chalk.gray(`  ✓ ${doc} formatted`));
          } else {
            this.formatResults.skipped++;
            console.log(chalk.gray(`  - ${doc} already formatted`));
          }
        } catch (error) {
          this.formatResults.failed++;
          console.log(chalk.red(`  ❌ ${doc} formatting failed: ${error.message}`));
        }
      } else {
        this.formatResults.skipped++;
        console.log(chalk.yellow(`  ⚠️  ${doc} not found`));
      }
    }
    
    // Format environment documentation
    for (const env of this.environments) {
      const envPath = path.join(this.projectRoot, env);
      if (await fs.pathExists(envPath)) {
        const cursorFile = path.join(envPath, 'CURSOR.md');
        const readmeFile = path.join(envPath, 'README.md');
        
        for (const file of [cursorFile, readmeFile]) {
          if (await fs.pathExists(file)) {
            try {
              const content = await fs.readFile(file, 'utf8');
              const formatted = this.formatMarkdownContent(content);
              
              if (content !== formatted) {
                await fs.writeFile(file, formatted);
                this.formatResults.formatted++;
                console.log(chalk.gray(`  ✓ ${path.relative(this.projectRoot, file)} formatted`));
              } else {
                this.formatResults.skipped++;
                console.log(chalk.gray(`  - ${path.relative(this.projectRoot, file)} already formatted`));
              }
            } catch (error) {
              this.formatResults.failed++;
              console.log(chalk.red(`  ❌ ${path.relative(this.projectRoot, file)} formatting failed: ${error.message}`));
            }
          }
        }
      }
    }
    
    this.formatResults.total += mainDocs.length + (this.environments.length * 2);
  }

  formatMarkdownContent(content) {
    // Basic Markdown formatting
    let formatted = content;
    
    // Ensure consistent line endings
    formatted = formatted.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // Ensure consistent spacing around headers
    formatted = formatted.replace(/\n(#{1,6})\s*/g, '\n\n$1 ');
    formatted = formatted.replace(/\n(#{1,6})\s+([^\n]+)\n/g, '\n$1 $2\n');
    
    // Ensure consistent spacing around lists
    formatted = formatted.replace(/\n(\s*[-*+])\s*/g, '\n$1 ');
    formatted = formatted.replace(/\n(\s*\d+\.)\s*/g, '\n$1 ');
    
    // Ensure consistent spacing around code blocks
    formatted = formatted.replace(/\n```/g, '\n\n```');
    formatted = formatted.replace(/```\n/g, '```\n\n');
    
    // Ensure consistent spacing around paragraphs
    formatted = formatted.replace(/\n\n\n+/g, '\n\n');
    
    // Remove trailing whitespace
    formatted = formatted.replace(/[ \t]+$/gm, '');
    
    // Ensure file ends with newline
    if (!formatted.endsWith('\n')) {
      formatted += '\n';
    }
    
    return formatted;
  }

  printFormatResults() {
    console.log('\n' + chalk.blue.bold('📊 Format Results:'));
    console.log(chalk.green(`  ✅ Formatted: ${this.formatResults.formatted}`));
    console.log(chalk.gray(`  - Skipped: ${this.formatResults.skipped}`));
    console.log(chalk.red(`  ❌ Failed: ${this.formatResults.failed}`));
    console.log(chalk.blue(`  📊 Total: ${this.formatResults.total}`));
    
    const successRate = this.formatResults.total > 0 
      ? Math.round(((this.formatResults.formatted + this.formatResults.skipped) / this.formatResults.total) * 100) 
      : 0;
    
    console.log(chalk.blue(`  📈 Success Rate: ${successRate}%`));
    
    if (this.formatResults.failed > 0) {
      console.log('\n' + chalk.red.bold('❌ Formatting failed with errors!'));
      process.exit(1);
    } else {
      console.log('\n' + chalk.green.bold('✅ Formatting completed successfully!'));
    }
  }
}

// Run formatting if called directly
if (require.main === module) {
  const formatter = new CursorSkillsFormatter();
  formatter.run();
}

module.exports = CursorSkillsFormatter;
