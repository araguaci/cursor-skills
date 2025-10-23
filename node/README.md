# Análise do Ambiente Node.js para CURSOR IDE

## Visão Geral
Este documento analisa as melhores práticas e padrões para desenvolvimento Node.js no CURSOR IDE, cobrindo frameworks como Express.js, NestJS, Next.js, e desenvolvimento de APIs e aplicações full-stack.

## Estrutura do Ambiente

### Configuração do CURSOR IDE
- **Extensões obrigatórias**: JavaScript (ES6) code snippets, Node.js Modules Intellisense, npm Intellisense
- **Integração npm/yarn**: Gerenciamento de dependências
- **Snippets específicos**: Express, NestJS, Next.js, Socket.io
- **Configurações otimizadas**: Para performance e produtividade Node.js

### Estrutura de Projeto Padrão
```
project/
├── src/ (código fonte)
├── public/ (arquivos estáticos)
├── config/ (arquivos de configuração)
├── tests/ (arquivos de teste)
├── node_modules/ (dependências)
├── package.json
├── package-lock.json
├── .env
└── server.js / app.js
```

## Padrões Identificados

### Padrões de Framework
- **Express.js**: Middleware, routing, templating, static files
- **NestJS**: Decorators, dependency injection, modules, guards
- **Next.js**: SSR, SSG, API routes, file-based routing
- **Socket.io**: Real-time communication, events, rooms

### Padrões de Qualidade
- **ESLint**: Configuração para Node.js/Express
- **Prettier**: Formatação consistente de código
- **Jest/Mocha**: Testes unitários e integração
- **TypeScript**: Tipagem estática (recomendado)
- **Husky**: Git hooks para qualidade

### Padrões de Performance
- **Async/Await**: Para operações assíncronas
- **Clustering**: Multi-process para CPU-intensive
- **Caching**: Redis, in-memory, CDN
- **Database Optimization**: Connection pooling, indexing
- **Monitoring**: APM, logging, metrics

## Características Únicas

### Integração npm/yarn
- Gerenciamento de dependências obrigatório
- Scripts personalizados no package.json
- Separação de dependências dev/prod
- Lock de dependências com package-lock.json

### Framework-Specific
- **Express**: Middleware, routing, error handling
- **NestJS**: Decorators, DI, testing, validation
- **Next.js**: SSR, SSG, API routes, optimization
- **Socket.io**: Real-time, events, rooms, namespaces

### Real-time Features
- **WebSockets**: Socket.io, ws, uws
- **Server-Sent Events**: Para streaming
- **WebRTC**: Para peer-to-peer
- **Message Queues**: Redis, RabbitMQ, Bull

## Recursos Incluídos

### Scripts de Automação
- **setup-project.sh**: Configuração inicial de projeto
- **install-dependencies.sh**: Instalação de dependências
- **run-tests.sh**: Execução de testes
- **format-code.sh**: Formatação de código
- **deploy.sh**: Deploy para produção

### Templates de Projeto
- **express-template**: Estrutura base para Express.js
- **nestjs-template**: Estrutura base para NestJS
- **nextjs-template**: Estrutura base para Next.js
- **node-api-template**: Estrutura base para APIs

### Configurações CURSOR
- **settings.json**: Configurações específicas para Node.js
- **extensions.json**: Lista de extensões recomendadas
- **launch.json**: Configurações de debugging
- **tasks.json**: Tarefas automatizadas

### Estrutura de Diretórios
```
node/
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
2. **Estrutura do projeto**: Framework + dependências
3. **Desenvolvimento**: Código + testes + documentação
4. **Debugging**: Node debugger + logging + profiling
5. **Deploy**: CI/CD + produção + monitoramento

### Constantes
- Padrões ES6+ obrigatórios
- npm para dependências
- Testes com Jest/Mocha
- Async/await para assíncrono
- Error handling adequado

### Variáveis
- Framework escolhido (Express/NestJS/Next.js)
- Estrutura específica do projeto
- Configurações de ambiente
- Dependências necessárias

## Casos de Uso

### Quando Usar
- Desenvolvimento de APIs REST/GraphQL
- Aplicações web full-stack
- Microserviços e integrações
- Real-time applications
- Server-side rendering

### Quando NÃO Usar
- Projetos que não precisam de JavaScript
- Aplicações que não precisam de servidor
- Projetos simples sem necessidade de framework
- Aplicações que não precisam de real-time

## Qualidade e Padrões

### Requisitos de Código
- Conformidade com padrões ES6+
- Cobertura de testes mínima 80%
- Documentação JSDoc
- TypeScript quando possível
- Error handling adequado

### Padrões de Framework
- Seguir convenções do framework
- Implementar arquitetura adequada
- Usar recursos nativos do framework
- Seguir padrões de segurança
- Implementar testes apropriados

### Validação
- Verificar conformidade ESLint
- Executar testes automaticamente
- Validar performance
- Verificar segurança
- Garantir documentação

## Recursos Técnicos

### Ferramentas de Desenvolvimento
- **npm/yarn**: Gerenciamento de dependências
- **Jest/Mocha**: Framework de testes
- **ESLint/Prettier**: Linting e formatação
- **TypeScript**: Tipagem estática
- **PM2**: Process manager para produção

### Integração CURSOR
- **Extensões**: JavaScript, Node.js, npm
- **Configurações**: Otimizadas para Node.js
- **Debugging**: Node debugger integration
- **IntelliSense**: Autocomplete e sugestões
- **Snippets**: Para frameworks específicos

### Performance
- **Async/Await**: Para operações I/O
- **Clustering**: Multi-process
- **Caching**: Redis, in-memory
- **Database Optimization**: Connection pooling
- **Monitoring**: APM, logging, metrics

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
- Adicionar real-time features
