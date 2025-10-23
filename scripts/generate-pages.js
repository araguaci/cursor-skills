const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const environments = [
  'php', 'webdesign', 'python', 'node', 'api', 'integrations', 'mobile', 'devops', 'testing'
];

const generateEnvironmentPage = async (env) => {
  console.log(chalk.blue(`📄 Generating page for ${env}...`));
  
  const envPath = path.join('dist', 'environments', env);
  await fs.ensureDir(envPath);
  
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
                    <a href="../environments/${env}/CURSOR.md">CURSOR IDE Rules</a>
                    <a href="../environments/${env}/README.md">Analysis & Best Practices</a>
                    <a href="../environments/${env}/docs/">Detailed Documentation</a>
                </div>
            </div>
            
            <div class="section">
                <h3>🛠️ Templates</h3>
                <div class="links">
                    <a href="../templates/${env}/">All Templates</a>
                    <a href="../templates/${env}/laravel-starter/">Laravel Starter</a>
                    <a href="../templates/${env}/react-starter/">React Starter</a>
                    <a href="../templates/${env}/django-starter/">Django Starter</a>
                </div>
            </div>
            
            <div class="section">
                <h3>💡 Examples</h3>
                <div class="links">
                    <a href="../examples/${env}/">All Examples</a>
                    <a href="../examples/${env}/api-example/">API Example</a>
                    <a href="../examples/${env}/component-example/">Component Example</a>
                    <a href="../examples/${env}/service-example/">Service Example</a>
                </div>
            </div>
            
            <div class="section">
                <h3>⚙️ Configuration</h3>
                <div class="links">
                    <a href="../configs/">CURSOR IDE Settings</a>
                    <a href="../configs/extensions.json">Extensions</a>
                    <a href="../configs/settings.json">Settings</a>
                    <a href="../configs/launch.json">Launch Configuration</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

  await fs.writeFile(path.join(envPath, 'index.html'), html);
  console.log(chalk.green(`✅ Generated page for ${env}`));
};

const generatePages = async () => {
  console.log(chalk.green('🚀 Generating environment pages...'));
  
  for (const env of environments) {
    await generateEnvironmentPage(env);
  }
  
  console.log(chalk.green('✅ All environment pages generated!'));
};

generatePages();
