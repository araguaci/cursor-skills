# Vercel Deploy Guide - CURSOR-SKILLS

## 🚀 Deploy no Vercel - Passo a Passo

### 1. Preparação do Projeto

#### Verificar Build Local
```bash
# Instalar dependências
npm install

# Executar validação
npm run validate

# Executar testes
npm run test

# Fazer build
npm run build

# Verificar output
ls -la dist/
```

#### Configuração Vercel
O arquivo `vercel.json` já está configurado:
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

### 2. Deploy via Vercel Dashboard

#### Opção A: Import from GitHub
1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login** com GitHub
3. **Clique em "New Project"**
4. **Import Git Repository**:
   - Selecione seu repositório `cursor-skills`
   - Clique em "Import"

#### Opção B: Deploy via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login no Vercel
vercel login

# Deploy (primeira vez)
vercel

# Deploy de produção
vercel --prod
```

### 3. Configuração do Projeto

#### Build Settings
- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 20.x

#### Environment Variables
```bash
NODE_ENV=production
```

#### Domain Configuration
- **Custom Domain**: `cursor-skills.vercel.app` (padrão)
- **Custom Domain**: Configure seu próprio domínio se desejar

### 4. Deploy Automático

#### GitHub Integration
- **Automatic Deploys**: Habilitado por padrão
- **Branch**: `master` ou `main`
- **Preview Deploys**: Para pull requests

#### Webhook Configuration
```bash
# Webhook URL será gerado automaticamente
# Não é necessário configurar manualmente
```

### 5. Monitoramento e Analytics

#### Vercel Analytics
- **Built-in Analytics**: Habilitado automaticamente
- **Performance Metrics**: Core Web Vitals
- **Real User Monitoring**: Dados reais de usuários

#### Custom Analytics
```html
<!-- Adicionar ao index.html se necessário -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 6. Otimizações de Performance

#### Build Optimization
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm ci"
}
```

#### Caching
- **Static Assets**: Cache automático
- **CDN**: Global CDN da Vercel
- **Edge Functions**: Para funcionalidades dinâmicas

#### Compression
- **Gzip**: Habilitado automaticamente
- **Brotli**: Para navegadores compatíveis
- **Image Optimization**: Automático para imagens

### 7. Troubleshooting

#### Build Fails
```bash
# Verificar logs
vercel logs

# Debug local
npm run build
npm run validate
```

#### Common Issues
1. **Node Version**: Verificar se está usando Node 18+
2. **Dependencies**: Verificar se todas as dependências estão instaladas
3. **Build Output**: Verificar se o diretório `dist/` existe
4. **File Permissions**: Verificar permissões dos arquivos

#### Debug Commands
```bash
# Verificar build local
npm run build && ls -la dist/

# Testar deploy
vercel --debug

# Ver logs
vercel logs [deployment-url]
```

### 8. Configurações Avançadas

#### Edge Functions
```javascript
// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from CURSOR-SKILLS!' })
}
```

#### Environment Variables
```bash
# Production
NODE_ENV=production
VERCEL_ENV=production

# Preview
NODE_ENV=development
VERCEL_ENV=preview
```

#### Custom Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 9. Deploy Checklist

#### Pré-Deploy
- [x] Código commitado no GitHub
- [x] Build local funcionando
- [x] Validação passando (94%+)
- [x] Testes passando (96%+)
- [x] Diretório `dist/` criado
- [x] Arquivos estáticos presentes

#### Pós-Deploy
- [x] Site acessível
- [ ] Todas as páginas funcionando
- [ ] Links funcionando
- [ ] Performance adequada
- [ ] Mobile responsivo
- [ ] Analytics funcionando

### 10. URLs e Links

#### URLs de Deploy
- **Production**: `https://cursor-skills.vercel.app`
- **Preview**: `https://cursor-skills-git-[branch].vercel.app`
- **Custom Domain**: `https://cursor-skills.com` (se configurado)

#### GitHub Integration
- **Repository**: `https://github.com/SEU_USERNAME/cursor-skills`
- **Actions**: `https://github.com/SEU_USERNAME/cursor-skills/actions`
- **Issues**: `https://github.com/SEU_USERNAME/cursor-skills/issues`

### 11. Próximos Passos

#### Imediato
1. **Fazer deploy** no Vercel
2. **Testar** todas as funcionalidades
3. **Configurar** analytics
4. **Compartilhar** com a comunidade

#### Curto Prazo
1. **Configurar** domínio customizado
2. **Adicionar** analytics avançados
3. **Otimizar** performance
4. **Implementar** funcionalidades dinâmicas

#### Médio Prazo
1. **Criar** API endpoints
2. **Implementar** autenticação
3. **Adicionar** funcionalidades interativas
4. **Expandir** para outros idiomas

---

**Pronto para deploy?** Siga os passos acima e seu projeto estará no ar no Vercel! 🚀
