# GitHub Setup Guide - CURSOR-SKILLS

## 🚀 Passo a Passo para Publicar no GitHub

### 1. Criar Repositório no GitHub

#### Opção A: Via GitHub Web Interface
1. **Acesse GitHub.com** e faça login
2. **Clique em "New repository"** (botão verde)
3. **Configure o repositório**:
   - **Repository name**: `cursor-skills` ou `skills-cursor`
   - **Description**: `A comprehensive repository of best practices, rules, and guidelines for working with CURSOR IDE across different programming environments`
   - **Visibility**: Public (recomendado para projeto open source)
   - **Initialize**: ❌ NÃO marcar (já temos arquivos locais)
4. **Clique em "Create repository"**

#### Opção B: Via GitHub CLI
```bash
# Instalar GitHub CLI (se não tiver)
# Windows: winget install GitHub.cli
# macOS: brew install gh
# Linux: apt install gh

# Login no GitHub
gh auth login

# Criar repositório
gh repo create cursor-skills --public --description "CURSOR IDE best practices and guidelines"
```

### 2. Conectar Repositório Local ao GitHub

```bash
# Adicionar remote origin (substitua SEU_USERNAME)
git remote add origin https://github.com/SEU_USERNAME/cursor-skills.git

# Verificar remote
git remote -v

# Fazer push inicial
git push -u origin master
```

### 3. Configurar Branch Protection

1. **Vá para Settings** do repositório
2. **Clique em "Branches"** no menu lateral
3. **Clique em "Add rule"**
4. **Configure**:
   - **Branch name pattern**: `master`
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require linear history**

### 4. Configurar GitHub Actions Secrets (para Vercel)

1. **Vá para Settings** → **Secrets and variables** → **Actions**
2. **Adicione os seguintes secrets**:
   - `VERCEL_TOKEN`: Token do Vercel
   - `ORG_ID`: ID da organização Vercel
   - `PROJECT_ID`: ID do projeto Vercel

### 5. Configurar GitHub Pages (Alternativa)

1. **Vá para Settings** → **Pages**
2. **Source**: GitHub Actions
3. **O workflow já está configurado** em `.github/workflows/pages.yml`

## 🔧 Configurações Adicionais

### README.md Badges
Adicione estes badges ao README.md:

```markdown
![Version](https://img.shields.io/badge/version-0.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-production-brightgreen.svg)
![Validation](https://img.shields.io/badge/validation-94%25-success.svg)
![Tests](https://img.shields.io/badge/tests-96%25-success.svg)
```

### Topics/Tags
Adicione estes topics ao repositório:
- `cursor-ide`
- `best-practices`
- `development`
- `templates`
- `automation`
- `community`
- `documentation`
- `javascript`
- `php`
- `python`
- `nodejs`
- `web-development`

### Issues e Discussions
1. **Habilite Issues**: Settings → Features → Issues
2. **Habilite Discussions**: Settings → Features → Discussions
3. **Configure templates**: Crie `.github/ISSUE_TEMPLATE/` e `.github/DISCUSSION_TEMPLATE/`

## 📊 Métricas e Analytics

### GitHub Insights
- **Traffic**: Views, clones, referrers
- **Contributors**: Activity, commits, issues
- **Community**: Stars, forks, watchers

### Configurar Analytics
```bash
# Adicionar Google Analytics (opcional)
# Adicionar ao README.md
```

## 🚀 Deploy Automático

### Vercel (Recomendado)
1. **Conecte o repositório** ao Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy automático** em cada push

### GitHub Pages
1. **Workflow já configurado** em `.github/workflows/pages.yml`
2. **Deploy automático** em push para master
3. **URL**: `https://SEU_USERNAME.github.io/cursor-skills`

## 📋 Checklist de Publicação

### Pré-Publicação
- [x] Repositório criado no GitHub
- [x] Remote origin configurado
- [x] Primeiro push realizado
- [x] README.md atualizado
- [x] Badges adicionados
- [ ] Topics configurados
- [x] Issues habilitados
- [x] Discussions habilitados

### Pós-Publicação
- [ ] Testar deploy automático
- [ ] Verificar GitHub Actions
- [ ] Testar GitHub Pages
- [ ] Configurar Vercel (se escolhido)
- [ ] Adicionar analytics
- [ ] Compartilhar nas redes sociais

## 🎯 Próximos Passos

### Imediato (Hoje)
1. **Criar repositório** no GitHub
2. **Fazer push** do código
3. **Configurar** branch protection
4. **Testar** deploy automático

### Curto Prazo (Esta Semana)
1. **Configurar** Vercel ou GitHub Pages
2. **Adicionar** analytics
3. **Compartilhar** com a comunidade
4. **Solicitar** primeiros contribuidores

### Médio Prazo (Próximo Mês)
1. **Criar** website da comunidade
2. **Desenvolver** extensões CURSOR IDE
3. **Organizar** workshops e tutoriais
4. **Expandir** para outros idiomas

## 📞 Suporte

### Documentação
- **README.md**: Documentação principal
- **CONTRIBUTING.md**: Guia de contribuição
- **DEPLOY.md**: Guia de deploy
- **CHANGELOG.md**: Histórico de versões

### Comunidade
- **GitHub Issues**: Reportar bugs e solicitar features
- **GitHub Discussions**: Discussões da comunidade
- **Pull Requests**: Contribuições

---

**Pronto para publicar?** Siga os passos acima e seu projeto estará no ar! 🚀
