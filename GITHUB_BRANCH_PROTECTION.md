# GitHub Branch Protection - CURSOR-SKILLS

## 🛡️ Configuração de Proteção de Branch

### Problema Atual
```
Required status checks cannot be empty. Please add at least one status check or disable the rule.
```

### Solução: Configurar Status Checks

## 🔧 Passo a Passo

### 1. **Configuração Básica (Recomendada)**

#### Opção A: Desabilitar Status Checks (Mais Simples)
1. **Vá para**: `https://github.com/araguaci/cursor-skills/settings/rules/new?target=branch`
2. **Configure**:
   - **Branch name pattern**: `master`
   - ✅ **Require a pull request before merging**
   - ❌ **Require status checks to pass before merging** (DESABILITAR)
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require linear history**
   - ✅ **Include administrators**
   - ✅ **Allow force pushes** (opcional)
   - ✅ **Allow deletions** (opcional)

#### Opção B: Configurar Status Checks (Avançado)
1. **Primeiro**: Configure GitHub Actions
2. **Depois**: Configure branch protection

### 2. **Configurar GitHub Actions Primeiro**

#### Criar Workflow de Status Check
```yaml
# .github/workflows/status-check.yml
name: Status Check

on:
  pull_request:
    branches: [ master ]
  push:
    branches: [ master ]

jobs:
  status-check:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run validation
      run: npm run validate
      
    - name: Run tests
      run: npm run test
      
    - name: Run build
      run: npm run build
```

#### Commitar o Workflow
```bash
# Criar diretório se não existir
mkdir -p .github/workflows

# Adicionar workflow
git add .github/workflows/status-check.yml
git commit -m "feat: Add status check workflow"
git push origin master
```

### 3. **Configurar Branch Protection**

#### Após GitHub Actions estar funcionando:
1. **Vá para**: `https://github.com/araguaci/cursor-skills/settings/rules/new?target=branch`
2. **Configure**:
   - **Branch name pattern**: `master`
   - ✅ **Require a pull request before merging**
   - ✅ **Require status checks to pass before merging**
   - **Status checks**: Selecione `status-check`
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require linear history**
   - ✅ **Include administrators**

## 🚀 Solução Rápida (Recomendada)

### Para Deploy Imediato
1. **Desabilite status checks** por enquanto
2. **Configure apenas**:
   - ✅ **Require a pull request before merging**
   - ❌ **Require status checks to pass before merging** (DESABILITAR)
   - ✅ **Require branches to be up to date before merging**
   - ✅ **Require linear history**

### Configuração Final
```
Branch name pattern: master
✅ Require a pull request before merging
❌ Require status checks to pass before merging
✅ Require branches to be up to date before merging
✅ Require linear history
✅ Include administrators
```

## 📋 Checklist de Configuração

### **Opção 1: Configuração Simples (Recomendada)**
- [ ] Branch name pattern: `master`
- [ ] Require a pull request before merging: ✅
- [ ] Require status checks: ❌ (DESABILITAR)
- [ ] Require branches to be up to date: ✅
- [ ] Require linear history: ✅
- [ ] Include administrators: ✅

### **Opção 2: Configuração Avançada**
- [ ] Criar workflow de status check
- [ ] Commitar e fazer push
- [ ] Aguardar workflow funcionar
- [ ] Configurar branch protection com status checks

## 🔧 Comandos para Configuração Avançada

### 1. Criar Workflow
```bash
# Criar diretório
mkdir -p .github/workflows

# Criar arquivo de workflow
cat > .github/workflows/status-check.yml << 'EOF'
name: Status Check

on:
  pull_request:
    branches: [ master ]
  push:
    branches: [ master ]

jobs:
  status-check:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run validation
      run: npm run validate
      
    - name: Run tests
      run: npm run test
      
    - name: Run build
      run: npm run build
EOF
```

### 2. Commitar Workflow
```bash
git add .github/workflows/status-check.yml
git commit -m "feat: Add status check workflow for branch protection"
git push origin master
```

### 3. Configurar Branch Protection
1. **Aguardar** workflow funcionar (1-2 minutos)
2. **Configurar** branch protection com status checks

## 🎯 Recomendação Final

### **Para Deploy Imediato**
Use a **Opção 1** (configuração simples):
- Desabilite status checks por enquanto
- Configure apenas as proteções básicas
- Adicione status checks depois

### **Para Configuração Completa**
Use a **Opção 2** (configuração avançada):
- Configure GitHub Actions primeiro
- Depois configure branch protection
- Tenha status checks funcionando

## 📞 Próximos Passos

### **Imediato**
1. **Escolha uma opção** acima
2. **Configure** branch protection
3. **Teste** criando um pull request
4. **Proceda** com o deploy

### **Futuro**
1. **Configure** status checks avançados
2. **Adicione** mais validações
3. **Otimize** o processo de CI/CD

---

**Escolha sua opção e configure a branch protection!** 🚀
