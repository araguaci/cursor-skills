# GitHub Pages Setup - CURSOR-SKILLS

## 🚨 Problema Identificado

Baseado no erro do GitHub Actions:
```
Error: Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions
Error: HttpError: Not Found
```

O GitHub Pages não está habilitado no repositório.

## 🔧 Solução: Habilitar GitHub Pages

### Passo 1: Habilitar GitHub Pages

1. **Acesse**: [https://github.com/araguaci/cursor-skills/settings/pages](https://github.com/araguaci/cursor-skills/settings/pages)

2. **Configure**:
   - **Source**: GitHub Actions
   - **Branch**: main
   - **Folder**: / (root)

3. **Clique em "Save"**

### Passo 2: Verificar Configuração

Após habilitar, você deve ver:
- ✅ **GitHub Pages is enabled**
- ✅ **Source**: GitHub Actions
- ✅ **Status**: Ready to deploy

### Passo 3: Re-executar Workflow

1. **Vá para**: [https://github.com/araguaci/cursor-skills/actions](https://github.com/araguaci/cursor-skills/actions)
2. **Clique em "Re-run all jobs"** no workflow que falhou
3. **Aguarde** a execução

## 🚀 Alternativa: Deploy no Vercel (Recomendado)

Se preferir uma solução mais rápida, use o Vercel:

### Opção A: Via Dashboard
1. **Acesse**: [vercel.com](https://vercel.com)
2. **Sign in** com GitHub
3. **Import Project**: `araguaci/cursor-skills`
4. **Deploy automático**

### Opção B: Via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📋 Checklist de Solução

### **Para GitHub Pages**
- [ ] Acessar Settings → Pages
- [ ] Habilitar GitHub Pages
- [ ] Source: GitHub Actions
- [ ] Re-executar workflow
- [ ] Verificar deploy

### **Para Vercel (Alternativa)**
- [ ] Acessar vercel.com
- [ ] Import GitHub repository
- [ ] Configurar build settings
- [ ] Deploy automático

## 🔧 Configuração Detalhada

### GitHub Pages Settings
```
Source: GitHub Actions
Branch: main
Folder: / (root)
Custom domain: (opcional)
```

### Build Settings
```
Build Command: npm run build
Output Directory: dist
Node Version: 20.x
```

## 🎯 Próximos Passos

### **Imediato**
1. **Habilitar** GitHub Pages
2. **Re-executar** workflow
3. **Verificar** deploy

### **Alternativa**
1. **Configurar** Vercel
2. **Deploy** automático
3. **Testar** funcionalidade

## 📞 Troubleshooting

### Se GitHub Pages não funcionar:
1. **Verificar** se Pages está habilitado
2. **Aguardar** alguns minutos
3. **Re-executar** workflow
4. **Usar** Vercel como alternativa

### Se Vercel não funcionar:
1. **Verificar** build local
2. **Configurar** secrets (se necessário)
3. **Testar** deploy manual

---

**Escolha sua opção e siga os passos!** 🚀
