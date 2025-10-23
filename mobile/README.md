# Análise do Ambiente Mobile para CURSOR IDE

## Visão Geral
Este documento analisa as melhores práticas e padrões para desenvolvimento mobile no CURSOR IDE, cobrindo React Native, Flutter, Expo, desenvolvimento nativo e aplicações híbridas.

## Estrutura do Ambiente

### Configuração do CURSOR IDE
- **Extensões obrigatórias**: React Native Tools, Flutter, Expo Tools, Android Studio
- **Integração de Plataformas**: iOS, Android, Web
- **Snippets específicos**: React Native, Flutter, Expo, Native modules
- **Configurações otimizadas**: Para desenvolvimento mobile multiplataforma

### Estrutura de Projeto Padrão
```
project/
├── src/ (código fonte)
├── components/ (componentes reutilizáveis)
├── screens/ (telas da aplicação)
├── navigation/ (navegação)
├── services/ (serviços e APIs)
├── assets/ (imagens, ícones, fonts)
├── tests/ (testes)
├── package.json
└── app.json / pubspec.yaml
```

## Padrões Identificados

### Padrões de Framework
- **React Native**: Components, hooks, navigation, state management
- **Flutter**: Widgets, state management, routing, platform channels
- **Expo**: Managed workflow, bare workflow, EAS Build
- **Native**: iOS (Swift/Objective-C), Android (Kotlin/Java)

### Padrões de Qualidade
- **ESLint/Dart**: Linting para JavaScript/Dart
- **Prettier**: Formatação consistente de código
- **Jest/Flutter Test**: Testes unitários e integração
- **Detox/Integration Tests**: Testes E2E
- **TypeScript**: Tipagem estática (React Native)

### Padrões de Performance
- **Code Splitting**: Lazy loading de telas
- **Image Optimization**: WebP, lazy loading, caching
- **Memory Management**: Garbage collection, profiling
- **Bundle Optimization**: Tree shaking, minification
- **Native Performance**: Platform-specific optimizations

## Características Únicas

### Integração Multiplataforma
- Desenvolvimento para iOS e Android
- Código compartilhado entre plataformas
- Platform-specific code quando necessário
- Testing em múltiplos dispositivos

### Framework-Specific
- **React Native**: JavaScript bridge, native modules
- **Flutter**: Dart, widgets, platform channels
- **Expo**: Managed workflow, OTA updates
- **Native**: Platform-specific development

### Mobile-Specific Features
- **Push Notifications**: Firebase, APNs, FCM
- **Deep Linking**: URL schemes, universal links
- **Offline Support**: Local storage, sync
- **Camera/Gallery**: Image picker, camera access
- **Location Services**: GPS, geolocation

## Recursos Incluídos

### Scripts de Automação
- **setup-project.sh**: Configuração inicial de projeto
- **install-dependencies.sh**: Instalação de dependências
- **run-tests.sh**: Execução de testes
- **build-app.sh**: Build para produção
- **deploy.sh**: Deploy para stores

### Templates de Projeto
- **react-native-template**: Estrutura base para React Native
- **flutter-template**: Estrutura base para Flutter
- **expo-template**: Estrutura base para Expo
- **native-template**: Estrutura base para desenvolvimento nativo

### Configurações CURSOR
- **settings.json**: Configurações específicas para mobile
- **extensions.json**: Lista de extensões recomendadas
- **launch.json**: Configurações de debugging
- **tasks.json**: Tarefas automatizadas

### Estrutura de Diretórios
```
mobile/
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
1. **Configuração inicial**: CURSOR IDE + extensões + emuladores
2. **Estrutura do projeto**: Framework + dependências
3. **Desenvolvimento**: Telas + componentes + testes
4. **Debugging**: Emuladores + devices + profiling
5. **Deploy**: Build + stores + monitoramento

### Constantes
- Responsive design obrigatório
- Testes em múltiplos dispositivos
- Performance otimizada
- Acessibilidade (WCAG 2.1)
- Offline support

### Variáveis
- Framework escolhido (React Native/Flutter/Expo)
- Plataformas suportadas (iOS/Android/Web)
- Configurações de build
- Dependências necessárias

## Casos de Uso

### Quando Usar
- Desenvolvimento de aplicações mobile
- Apps multiplataforma
- Prototipagem rápida
- Aplicações que precisam de recursos nativos
- Apps que precisam de performance nativa

### Quando NÃO Usar
- Aplicações que não precisam de mobile
- Projetos que não precisam de multiplataforma
- Aplicações que não precisam de recursos nativos
- Projetos simples sem necessidade de app

## Qualidade e Padrões

### Requisitos de Código
- Componentes reutilizáveis
- Cobertura de testes mínima 80%
- Acessibilidade WCAG 2.1
- Performance otimizada
- Offline support

### Padrões de Framework
- Seguir convenções do framework
- Implementar arquitetura adequada
- Usar recursos nativos do framework
- Seguir padrões de performance
- Implementar testes apropriados

### Validação
- Verificar acessibilidade
- Executar testes automaticamente
- Validar performance
- Verificar compatibilidade
- Garantir responsividade

## Recursos Técnicos

### Ferramentas de Desenvolvimento
- **React Native CLI**: Desenvolvimento React Native
- **Flutter SDK**: Desenvolvimento Flutter
- **Expo CLI**: Desenvolvimento Expo
- **Android Studio**: Desenvolvimento Android
- **Xcode**: Desenvolvimento iOS

### Integração CURSOR
- **Extensões**: React Native, Flutter, Expo
- **Configurações**: Otimizadas para mobile
- **Debugging**: Emuladores e devices
- **IntelliSense**: Autocomplete e sugestões
- **Snippets**: Para frameworks específicos

### Performance
- **Code Splitting**: Lazy loading
- **Image Optimization**: WebP, lazy loading
- **Memory Management**: Profiling
- **Bundle Optimization**: Tree shaking
- **Native Performance**: Platform-specific

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
- Adicionar recursos nativos
