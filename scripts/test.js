#!/usr/bin/env node

/**
 * CURSOR-SKILLS Test Script
 * Runs tests for the project structure and content
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class CursorSkillsTester {
  constructor() {
    this.projectRoot = process.cwd();
    this.environments = ['php', 'webdesign', 'python', 'node', 'api', 'integrations', 'mobile', 'devops', 'testing'];
    this.testResults = {
      passed: 0,
      failed: 0,
      total: 0
    };
  }

  async run() {
    console.log(chalk.blue.bold('🧪 CURSOR-SKILLS Testing'));
    console.log(chalk.gray('Running comprehensive tests...\n'));

    try {
      await this.testProjectStructure();
      await this.testFileIntegrity();
      await this.testContentQuality();
      await this.testScriptsFunctionality();
      await this.testTemplatesValidity();
      await this.testExamplesCompleteness();
      await this.testConfigurations();
      
      this.printTestResults();
    } catch (error) {
      console.error(chalk.red.bold('❌ Testing failed:'), error.message);
      process.exit(1);
    }
  }

  async testProjectStructure() {
    console.log(chalk.yellow('📁 Testing project structure...'));
    
    // Test main directories
    const mainDirs = ['scripts', 'configs'];
    for (const dir of mainDirs) {
      await this.runTest(
        `Main directory ${dir}/ exists`,
        async () => await fs.pathExists(path.join(this.projectRoot, dir))
      );
    }
    
    // Test environment directories
    for (const env of this.environments) {
      await this.runTest(
        `Environment ${env}/ exists`,
        async () => await fs.pathExists(path.join(this.projectRoot, env))
      );
    }
  }

  async testFileIntegrity() {
    console.log(chalk.yellow('📄 Testing file integrity...'));
    
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
      await this.runTest(
        `Required file ${file} exists`,
        async () => await fs.pathExists(path.join(this.projectRoot, file))
      );
    }
    
    // Test package.json validity
    await this.runTest(
      'package.json is valid JSON',
      async () => {
        const packagePath = path.join(this.projectRoot, 'package.json');
        const content = await fs.readFile(packagePath, 'utf8');
        JSON.parse(content);
        return true;
      }
    );
  }

  async testContentQuality() {
    console.log(chalk.yellow('📝 Testing content quality...'));
    
    // Test README.md content
    await this.runTest(
      'README.md has substantial content',
      async () => {
        const readmePath = path.join(this.projectRoot, 'README.md');
        const content = await fs.readFile(readmePath, 'utf8');
        return content.length > 1000 && content.includes('CURSOR-SKILLS');
      }
    );
    
    // Test CURSOR.md content
    await this.runTest(
      'CURSOR.md has proper structure',
      async () => {
        const cursorPath = path.join(this.projectRoot, 'CURSOR.md');
        const content = await fs.readFile(cursorPath, 'utf8');
        return content.includes('# CURSOR IDE Best Practices') && content.length > 2000;
      }
    );
    
    // Test environment-specific files
    for (const env of this.environments) {
      const envPath = path.join(this.projectRoot, env);
      if (await fs.pathExists(envPath)) {
        await this.runTest(
          `${env}/CURSOR.md has proper content`,
          async () => {
            const cursorPath = path.join(envPath, 'CURSOR.md');
            if (await fs.pathExists(cursorPath)) {
              const content = await fs.readFile(cursorPath, 'utf8');
              return content.includes('# CURSOR IDE Rules') && content.length > 500;
            }
            return false;
          }
        );
      }
    }
  }

  async testScriptsFunctionality() {
    console.log(chalk.yellow('🔧 Testing scripts functionality...'));
    
    const scriptsDir = path.join(this.projectRoot, 'scripts');
    const requiredScripts = ['setup.js', 'validate.js', 'build.js', 'test.js', 'docs.js', 'lint.js', 'format.js'];
    
    for (const script of requiredScripts) {
      await this.runTest(
        `Script ${script} exists and is executable`,
        async () => {
          const scriptPath = path.join(scriptsDir, script);
          if (await fs.pathExists(scriptPath)) {
            const stats = await fs.stat(scriptPath);
            return stats.mode & 0o111; // Check if executable
          }
          return false;
        }
      );
    }
    
    // Test script content
    await this.runTest(
      'Scripts have proper shebang',
      async () => {
        const scriptPath = path.join(scriptsDir, 'setup.js');
        const content = await fs.readFile(scriptPath, 'utf8');
        return content.startsWith('#!/usr/bin/env node');
      }
    );
  }

  async testTemplatesValidity() {
    console.log(chalk.yellow('📋 Testing templates validity...'));
    
    for (const env of this.environments) {
      const templatesDir = path.join(this.projectRoot, env, 'templates');
      if (await fs.pathExists(templatesDir)) {
        const templates = await fs.readdir(templatesDir);
        
        await this.runTest(
          `${env}/templates/ has templates`,
          async () => templates.length > 0
        );
        
        for (const template of templates) {
          const templatePath = path.join(templatesDir, template);
          if ((await fs.stat(templatePath)).isDirectory()) {
            await this.runTest(
              `Template ${env}/${template} has README.md`,
              async () => await fs.pathExists(path.join(templatePath, 'README.md'))
            );
            
            await this.runTest(
              `Template ${env}/${template} has package.json`,
              async () => await fs.pathExists(path.join(templatePath, 'package.json'))
            );
          }
        }
      }
    }
  }

  async testExamplesCompleteness() {
    console.log(chalk.yellow('📝 Testing examples completeness...'));
    
    for (const env of this.environments) {
      const examplesDir = path.join(this.projectRoot, env, 'examples');
      if (await fs.pathExists(examplesDir)) {
        const examples = await fs.readdir(examplesDir);
        
        await this.runTest(
          `${env}/examples/ has examples`,
          async () => examples.length > 0
        );
        
        for (const example of examples) {
          const examplePath = path.join(examplesDir, example);
          if ((await fs.stat(examplePath)).isDirectory()) {
            await this.runTest(
              `Example ${env}/${example} has README.md`,
              async () => await fs.pathExists(path.join(examplePath, 'README.md'))
            );
          }
        }
      }
    }
  }

  async testConfigurations() {
    console.log(chalk.yellow('⚙️  Testing configurations...'));
    
    const configsDir = path.join(this.projectRoot, 'configs');
    const requiredConfigs = ['settings.json', 'extensions.json', 'launch.json', 'tasks.json'];
    
    for (const config of requiredConfigs) {
      await this.runTest(
        `Configuration ${config} exists and is valid JSON`,
        async () => {
          const configPath = path.join(configsDir, config);
          if (await fs.pathExists(configPath)) {
            const content = await fs.readFile(configPath, 'utf8');
            JSON.parse(content);
            return true;
          }
          return false;
        }
      );
    }
  }

  async runTest(testName, testFunction) {
    this.testResults.total++;
    
    try {
      const result = await testFunction();
      if (result) {
        this.testResults.passed++;
        console.log(chalk.green(`  ✅ ${testName}`));
      } else {
        this.testResults.failed++;
        console.log(chalk.red(`  ❌ ${testName}`));
      }
    } catch (error) {
      this.testResults.failed++;
      console.log(chalk.red(`  ❌ ${testName} - Error: ${error.message}`));
    }
  }

  printTestResults() {
    console.log('\n' + chalk.blue.bold('📊 Test Results:'));
    console.log(chalk.green(`  ✅ Passed: ${this.testResults.passed}`));
    console.log(chalk.red(`  ❌ Failed: ${this.testResults.failed}`));
    console.log(chalk.blue(`  📊 Total: ${this.testResults.total}`));
    
    const successRate = this.testResults.total > 0 
      ? Math.round((this.testResults.passed / this.testResults.total) * 100) 
      : 0;
    
    console.log(chalk.blue(`  📈 Success Rate: ${successRate}%`));
    
    if (this.testResults.failed > 0) {
      console.log('\n' + chalk.red.bold('❌ Some tests failed!'));
      process.exit(1);
    } else {
      console.log('\n' + chalk.green.bold('✅ All tests passed!'));
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new CursorSkillsTester();
  tester.run();
}

module.exports = CursorSkillsTester;
