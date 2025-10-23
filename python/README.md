# Análise do Ambiente Python para CURSOR IDE

## Visão Geral
Este documento analisa as melhores práticas e padrões para desenvolvimento Python no CURSOR IDE, cobrindo frameworks como Django, Flask, FastAPI, e aplicações de Data Science com pandas, numpy, scikit-learn.

## Estrutura do Ambiente

### Configuração do CURSOR IDE
- **Extensões obrigatórias**: Python, Pylance, Python Debugger, Jupyter
- **Integração pip/conda**: Gerenciamento de dependências
- **Snippets específicos**: Django, Flask, FastAPI, pandas
- **Configurações otimizadas**: Para performance e produtividade Python

### Estrutura de Projeto Padrão
```
project/
├── app/ (código da aplicação)
├── config/ (arquivos de configuração)
├── static/ (arquivos estáticos)
├── templates/ (templates HTML)
├── tests/ (arquivos de teste)
├── requirements.txt
├── requirements-dev.txt
├── .env
└── manage.py (Django) / app.py (Flask)
```

## Padrões Identificados

### Padrões de Framework
- **Django**: MTV (Model-Template-View), ORM, admin, migrations
- **Flask**: Microframework, blueprints, extensions, Jinja2
- **FastAPI**: Async/await, type hints, automatic docs, Pydantic
- **Data Science**: Jupyter notebooks, pandas, numpy, matplotlib

### Padrões de Qualidade
- **PEP Standards**: PEP 8, PEP 257, PEP 484
- **Ferramentas**: Black, isort, flake8, mypy, pytest
- **Documentação**: Docstrings, type hints, README
- **Testes**: Unit, integração, cobertura mínima 80%

### Padrões de Performance
- **Async/Await**: Para operações I/O intensivas
- **Caching**: Redis, Memcached, in-memory
- **Database Optimization**: Query optimization, indexing
- **Memory Management**: Garbage collection, profiling
- **Concurrency**: Threading, multiprocessing, asyncio

## Características Únicas

### Integração pip/conda
- Gerenciamento de dependências obrigatório
- Virtual environments (venv, conda)
- Separação de dependências dev/prod
- Lock de dependências com requirements.txt

### Framework-Specific
- **Django**: ORM, admin, migrations, middleware
- **Flask**: Blueprints, extensions, Jinja2
- **FastAPI**: Async, type hints, automatic docs
- **Data Science**: Jupyter, pandas, numpy, scikit-learn

### Data Science Integration
- **Jupyter Notebooks**: Desenvolvimento interativo
- **Pandas**: Manipulação de dados
- **NumPy**: Computação numérica
- **Matplotlib/Seaborn**: Visualização de dados
- **Scikit-learn**: Machine learning

## Recursos Incluídos

### Scripts de Automação
- **setup-project.sh**: Configuração inicial de projeto
- **install-dependencies.sh**: Instalação de dependências
- **run-tests.sh**: Execução de testes
- **format-code.sh**: Formatação de código
- **deploy.sh**: Deploy para produção

### Templates de Projeto
- **django-template**: Estrutura base para Django
- **flask-template**: Estrutura base para Flask
- **fastapi-template**: Estrutura base para FastAPI
- **data-science-template**: Estrutura base para Data Science

### Configurações CURSOR
- **settings.json**: Configurações específicas para Python
- **extensions.json**: Lista de extensões recomendadas
- **launch.json**: Configurações de debugging
- **tasks.json**: Tarefas automatizadas

### Estrutura de Diretórios
```
python/
├── CURSOR.md (regras em inglês)
├── README.md (análise em português)
├── scripts/ (scripts de automação)
├── templates/ (templates de projeto)
├── examples/ (exemplos práticos)
├── configs/ (configurações CURSOR)
└── docs/ (documentação adicional)
```

## Fluxo de Trabalho

### Processo de Desenvolvimento
1. **Configuração inicial**: CURSOR IDE + extensões
2. **Estrutura do projeto**: Framework + virtual environment
3. **Desenvolvimento**: Código + testes + documentação
4. **Debugging**: Python debugger + logging + profiling
5. **Deploy**: CI/CD + produção + monitoramento

### Constantes
- Padrões PEP obrigatórios
- Virtual environment obrigatório
- Testes com pytest
- Type hints recomendados
- Documentação com docstrings

### Variáveis
- Framework escolhido (Django/Flask/FastAPI)
- Estrutura específica do projeto
- Configurações de ambiente
- Dependências necessárias

## Casos de Uso

### Quando Usar
- Desenvolvimento de APIs REST
- Aplicações web com Python
- Data Science e Machine Learning
- Scripts de automação
- Microserviços e integrações

### Quando NÃO Usar
- Projetos que não precisam de Python
- Aplicações que não precisam de framework
- Projetos simples sem necessidade de estrutura
- Aplicações que não precisam de banco de dados

## Qualidade e Padrões

### Requisitos de Código
- Conformidade com padrões PEP
- Cobertura de testes mínima 80%
- Documentação com docstrings
- Type hints quando possível
- Tratamento de erros adequado

### Padrões de Framework
- Seguir convenções do framework
- Implementar arquitetura adequada
- Usar recursos nativos do framework
- Seguir padrões de segurança
- Implementar testes apropriados

### Validação
- Verificar conformidade PEP
- Executar testes automaticamente
- Validar type hints
- Verificar performance
- Garantir documentação

## Recursos Técnicos

### Ferramentas de Desenvolvimento
- **pip/conda**: Gerenciamento de dependências
- **pytest**: Framework de testes
- **Black**: Formatação de código
- **flake8**: Linting
- **mypy**: Verificação de tipos

### Integração CURSOR
- **Extensões**: Python, Pylance, Jupyter
- **Configurações**: Otimizadas para Python
- **Debugging**: Python debugger integration
- **IntelliSense**: Autocomplete e sugestões
- **Snippets**: Para frameworks específicos

### Performance
- **Async/Await**: Para operações I/O
- **Caching**: Estratégias de cache
- **Database Optimization**: Query optimization
- **Memory Management**: Profiling e otimização
- **Concurrency**: Threading e multiprocessing

## Manutenção e Atualizações

### Atualizações Técnicas
- Manter dependências atuais
- Atualizar frameworks
- Manter compatibilidade
- Testar com novas versões
- Seguir changelog

### Extensões
- Adicionar novos frameworks
- Expandir ferramentas de teste
- Melhorar debugging
- Aprimorar performance
- Adicionar Data Science tools
