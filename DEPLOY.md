# CURSOR-SKILLS - Deploy Guide

## 🚀 Deploy Options

### 1. Vercel (Recommended)

#### Automatic Deploy
1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables** (if needed):
   - `NODE_ENV`: `production`

#### Manual Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 2. GitHub Pages

#### Automatic Deploy
1. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select "GitHub Actions" as source

2. **Workflow Configuration**:
   - The `.github/workflows/pages.yml` file is already configured
   - Push to master/main branch to trigger deploy

#### Manual Deploy
```bash
# Build the project
npm run build

# The dist/ directory will be deployed to GitHub Pages
```

### 3. Netlify

#### Automatic Deploy
1. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Select your repository

2. **Configure Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `20`

#### Manual Deploy
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### 4. Firebase Hosting

#### Setup
```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## 🔧 Build Configuration

### Package.json Scripts
```json
{
  "scripts": {
    "build": "node scripts/build.js",
    "validate": "node scripts/validate.js",
    "test": "node scripts/test.js"
  }
}
```

### Vercel Configuration
```json
{
  "version": 2,
  "name": "cursor-skills",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ]
}
```

## 📊 Deployment Status

### Current Status
- ✅ **Vercel**: Ready for deployment
- ✅ **GitHub Pages**: Workflow configured
- ✅ **Netlify**: Ready for deployment
- ✅ **Firebase**: Ready for deployment

### Build Output
- **Directory**: `dist/`
- **Files**: Static HTML, CSS, JS
- **Size**: ~2MB (estimated)
- **Performance**: Optimized for fast loading

## 🎯 Deployment Checklist

### Pre-Deploy
- [ ] Run `npm run validate` (should show 94%+ success)
- [ ] Run `npm run test` (should show 96%+ coverage)
- [ ] Run `npm run build` (should create dist/ directory)
- [ ] Check dist/ directory contents
- [ ] Verify all files are present

### Post-Deploy
- [ ] Test website functionality
- [ ] Check all links work
- [ ] Verify responsive design
- [ ] Test on different browsers
- [ ] Check performance metrics

## 🚨 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Deploy Fails
```bash
# Check build output
ls -la dist/

# Verify package.json
cat package.json

# Check for errors
npm run validate
```

#### Performance Issues
- Optimize images
- Minify CSS/JS
- Enable compression
- Use CDN for assets

## 📈 Monitoring

### Analytics
- **Google Analytics**: Add tracking code
- **Vercel Analytics**: Built-in with Vercel
- **GitHub Insights**: Repository analytics

### Performance
- **Lighthouse**: Run performance audit
- **PageSpeed Insights**: Check Core Web Vitals
- **GTmetrix**: Monitor loading times

## 🔄 Continuous Deployment

### GitHub Actions
- **CI/CD Pipeline**: `.github/workflows/ci.yml`
- **Pages Deploy**: `.github/workflows/pages.yml`
- **Automatic**: Deploys on push to main branch

### Manual Deploy
```bash
# Build and deploy
npm run build
git add .
git commit -m "Deploy: Update documentation"
git push origin main
```

## 📞 Support

### Documentation
- **README.md**: Main project documentation
- **CONTRIBUTING.md**: Contribution guidelines
- **CHANGELOG.md**: Version history

### Community
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community support
- **Pull Requests**: Contributions

### Contact
- **Email**: [Your email]
- **GitHub**: [Your GitHub profile]
- **Website**: [Your website]

---

**Ready to deploy?** Choose your preferred platform and follow the steps above! 🚀
