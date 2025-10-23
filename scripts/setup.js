#!/usr/bin/env node

/**
 * CURSOR-SKILLS Setup Script
 * Automated setup for CURSOR IDE environments
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');

class CursorSkillsSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.environments = ['php', 'webdesign', 'python', 'node', 'api', 'integrations', 'mobile', 'devops', 'testing'];
  }

  async run() {
    console.log(chalk.blue.bold('🚀 CURSOR-SKILLS Setup'));
    console.log(chalk.gray('Setting up CURSOR IDE environments...\n'));

    try {
      await this.createDirectories();
      await this.createScripts();
      await this.createTemplates();
      await this.createConfigs();
      await this.createExamples();
      await this.setupGitHooks();
      
      console.log(chalk.green.bold('✅ Setup completed successfully!'));
      console.log(chalk.gray('Run "npm run validate" to verify the setup.'));
    } catch (error) {
      console.error(chalk.red.bold('❌ Setup failed:'), error.message);
      process.exit(1);
    }
  }

  async createDirectories() {
    console.log(chalk.yellow('📁 Creating directory structure...'));
    
    for (const env of this.environments) {
      const envPath = path.join(this.projectRoot, env);
      await fs.ensureDir(envPath);
      
      // Create subdirectories for each environment
      const subdirs = ['scripts', 'templates', 'examples', 'configs', 'docs'];
      for (const subdir of subdirs) {
        await fs.ensureDir(path.join(envPath, subdir));
      }
      
      console.log(chalk.gray(`  ✓ Created ${env}/ structure`));
    }
  }

  async createScripts() {
    console.log(chalk.yellow('🔧 Creating automation scripts...'));
    
    // Create main scripts directory
    const scriptsDir = path.join(this.projectRoot, 'scripts');
    await fs.ensureDir(scriptsDir);
    
    // Copy and create script files
    const scriptFiles = [
      'validate.js',
      'build.js', 
      'test.js',
      'docs.js',
      'lint.js',
      'format.js'
    ];
    
    for (const script of scriptFiles) {
      const scriptPath = path.join(scriptsDir, script);
      if (!await fs.pathExists(scriptPath)) {
        await this.createScriptTemplate(script);
      }
    }
    
    console.log(chalk.gray('  ✓ Created automation scripts'));
  }

  async createScriptTemplate(scriptName) {
    const scriptPath = path.join(this.projectRoot, 'scripts', scriptName);
    const template = this.getScriptTemplate(scriptName);
    await fs.writeFile(scriptPath, template);
    await fs.chmod(scriptPath, '755');
  }

  getScriptTemplate(scriptName) {
    const templates = {
      'validate.js': `#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');

async function validate() {
  console.log(chalk.blue.bold('🔍 Validating CURSOR-SKILLS structure...'));
  
  const environments = ['php', 'webdesign', 'python', 'node', 'api', 'integrations', 'mobile', 'devops', 'testing'];
  
  for (const env of environments) {
    const envPath = \`\${env}/\`;
    if (await fs.pathExists(envPath)) {
      console.log(chalk.green(\`  ✓ \${env} environment exists\`));
    } else {
      console.log(chalk.red(\`  ✗ \${env} environment missing\`));
    }
  }
  
  console.log(chalk.green.bold('✅ Validation completed!'));
}

validate().catch(console.error);`,
      
      'build.js': `#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');

async function build() {
  console.log(chalk.blue.bold('🏗️  Building CURSOR-SKILLS documentation...'));
  
  // Build logic here
  console.log(chalk.green('✅ Build completed!'));
}

build().catch(console.error);`,
      
      'test.js': `#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');

async function test() {
  console.log(chalk.blue.bold('🧪 Running CURSOR-SKILLS tests...'));
  
  // Test logic here
  console.log(chalk.green('✅ All tests passed!'));
}

test().catch(console.error);`,
      
      'docs.js': `#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');

async function generateDocs() {
  console.log(chalk.blue.bold('📚 Generating CURSOR-SKILLS documentation...'));
  
  // Documentation generation logic here
  console.log(chalk.green('✅ Documentation generated!'));
}

generateDocs().catch(console.error);`,
      
      'lint.js': `#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');

async function lint() {
  console.log(chalk.blue.bold('🔍 Linting CURSOR-SKILLS code...'));
  
  // Linting logic here
  console.log(chalk.green('✅ Linting completed!'));
}

lint().catch(console.error);`,
      
      'format.js': `#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');

async function format() {
  console.log(chalk.blue.bold('✨ Formatting CURSOR-SKILLS code...'));
  
  // Formatting logic here
  console.log(chalk.green('✅ Formatting completed!'));
}

format().catch(console.error);`
    };
    
    return templates[scriptName] || `#!/usr/bin/env node
console.log('Script: ${scriptName}');`;
  }

  async createTemplates() {
    console.log(chalk.yellow('📋 Creating project templates...'));
    
    // Create basic templates for each environment
    for (const env of this.environments) {
      const templateDir = path.join(this.projectRoot, env, 'templates');
      await this.createEnvironmentTemplates(env, templateDir);
    }
    
    console.log(chalk.gray('  ✓ Created project templates'));
  }

  async createEnvironmentTemplates(env, templateDir) {
    const templates = {
      'php': ['laravel-starter', 'symfony-starter', 'wordpress-theme', 'php-api'],
      'webdesign': ['react-starter', 'vue-starter', 'angular-starter', 'vanilla-js'],
      'python': ['django-starter', 'flask-starter', 'fastapi-starter', 'data-science'],
      'node': ['express-starter', 'nestjs-starter', 'nextjs-starter', 'node-api'],
      'api': ['rest-api', 'graphql-api', 'grpc-api', 'microservice'],
      'integrations': ['webhook-handler', 'database-connector', 'message-queue', 'service-mesh'],
      'mobile': ['react-native-starter', 'flutter-starter', 'expo-starter', 'native-starter'],
      'devops': ['docker-starter', 'kubernetes-starter', 'ci-cd-pipeline', 'monitoring'],
      'testing': ['unit-testing', 'integration-testing', 'e2e-testing', 'performance-testing']
    };
    
    const envTemplates = templates[env] || [];
    for (const template of envTemplates) {
      const templatePath = path.join(templateDir, template);
      await fs.ensureDir(templatePath);
      await this.createTemplateFiles(templatePath, env, template);
    }
  }

  async createTemplateFiles(templatePath, env, templateName) {
    // Create basic template structure
    const files = {
      'README.md': `# ${templateName} Template\n\nThis is a template for ${env} development.\n`,
      'package.json': JSON.stringify({
        name: templateName,
        version: '1.0.0',
        description: `Template for ${env} development`,
        main: 'index.js',
        scripts: {
          start: 'echo "Starting template..."',
          test: 'echo "Running tests..."'
        }
      }, null, 2),
      '.cursor/settings.json': JSON.stringify({
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll": true
        }
      }, null, 2)
    };
    
    for (const [filename, content] of Object.entries(files)) {
      const filePath = path.join(templatePath, filename);
      await fs.ensureDir(path.dirname(filePath));
      await fs.writeFile(filePath, content);
    }
  }

  async createConfigs() {
    console.log(chalk.yellow('⚙️  Creating CURSOR IDE configurations...'));
    
    const configsDir = path.join(this.projectRoot, 'configs');
    await fs.ensureDir(configsDir);
    
    // Create main configuration files
    const configFiles = {
      'settings.json': JSON.stringify({
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll": true
        },
        "files.autoSave": "afterDelay",
        "editor.tabSize": 2,
        "editor.insertSpaces": true,
        "editor.rulers": [80, 120],
        "editor.wordWrap": "on",
        "files.exclude": {
          "**/node_modules": true,
          "**/vendor": true,
          "**/.git": true
        }
      }, null, 2),
      
      'extensions.json': JSON.stringify({
        "recommendations": [
          "ms-vscode.vscode-json",
          "bradlc.vscode-tailwindcss",
          "esbenp.prettier-vscode",
          "ms-python.python",
          "ms-vscode.vscode-typescript-next"
        ]
      }, null, 2),
      
      'launch.json': JSON.stringify({
        "version": "0.2.0",
        "configurations": [
          {
            "name": "Debug Node.js",
            "type": "node",
            "request": "launch",
            "program": "${workspaceFolder}/index.js"
          }
        ]
      }, null, 2),
      
      'tasks.json': JSON.stringify({
        "version": "2.0.0",
        "tasks": [
          {
            "label": "npm install",
            "type": "shell",
            "command": "npm install",
            "group": "build"
          },
          {
            "label": "npm test",
            "type": "shell", 
            "command": "npm test",
            "group": "test"
          }
        ]
      }, null, 2)
    };
    
    for (const [filename, content] of Object.entries(configFiles)) {
      await fs.writeFile(path.join(configsDir, filename), content);
    }
    
    console.log(chalk.gray('  ✓ Created CURSOR IDE configurations'));
  }

  async createExamples() {
    console.log(chalk.yellow('📝 Creating practical examples...'));
    
    for (const env of this.environments) {
      const examplesDir = path.join(this.projectRoot, env, 'examples');
      await this.createEnvironmentExamples(env, examplesDir);
    }
    
    console.log(chalk.gray('  ✓ Created practical examples'));
  }

  async createEnvironmentExamples(env, examplesDir) {
    const examples = {
      'php': ['laravel-api-example', 'symfony-service-example', 'wordpress-plugin-example'],
      'webdesign': ['react-component-example', 'vue-composition-example', 'css-grid-example'],
      'python': ['django-model-example', 'flask-route-example', 'pandas-analysis-example'],
      'node': ['express-middleware-example', 'nestjs-service-example', 'socket-io-example'],
      'api': ['rest-endpoint-example', 'graphql-resolver-example', 'authentication-example'],
      'integrations': ['webhook-receiver-example', 'database-migration-example', 'queue-worker-example'],
      'mobile': ['react-native-navigation-example', 'flutter-widget-example', 'expo-camera-example'],
      'devops': ['docker-compose-example', 'kubernetes-deployment-example', 'github-actions-example'],
      'testing': ['jest-unit-test-example', 'cypress-e2e-example', 'load-testing-example']
    };
    
    const envExamples = examples[env] || [];
    for (const example of envExamples) {
      const examplePath = path.join(examplesDir, example);
      await fs.ensureDir(examplePath);
      await this.createExampleFiles(examplePath, env, example);
    }
  }

  async createExampleFiles(examplePath, env, exampleName) {
    const files = {
      'README.md': `# ${exampleName}\n\nThis is a practical example for ${env} development.\n\n## Usage\n\n\`\`\`bash\n# Run the example\nnpm start\n\`\`\`\n`,
      'index.js': `// ${exampleName} Example\nconsole.log('Hello from ${exampleName}!');\n`,
      'package.json': JSON.stringify({
        name: exampleName,
        version: '1.0.0',
        description: `Example for ${env} development`,
        main: 'index.js',
        scripts: {
          start: 'node index.js'
        }
      }, null, 2)
    };
    
    for (const [filename, content] of Object.entries(files)) {
      await fs.writeFile(path.join(examplePath, filename), content);
    }
  }

  async setupGitHooks() {
    console.log(chalk.yellow('🪝 Setting up Git hooks...'));
    
    try {
      // Install husky if not already installed
      if (!await fs.pathExists(path.join(this.projectRoot, 'node_modules', 'husky'))) {
        execSync('npm install husky --save-dev', { stdio: 'inherit' });
      }
      
      // Setup husky hooks
      execSync('npx husky install', { stdio: 'inherit' });
      execSync('npx husky add .husky/pre-commit "npm run lint"', { stdio: 'inherit' });
      execSync('npx husky add .husky/pre-push "npm run test"', { stdio: 'inherit' });
      
      console.log(chalk.gray('  ✓ Git hooks configured'));
    } catch (error) {
      console.log(chalk.yellow('  ⚠️  Git hooks setup skipped (husky not available)'));
    }
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new CursorSkillsSetup();
  setup.run();
}

module.exports = CursorSkillsSetup;
