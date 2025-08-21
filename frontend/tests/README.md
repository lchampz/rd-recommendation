# 🧪 Pasta de Testes

Esta pasta contém todos os testes automatizados do projeto Recomendador RD Station, organizados de forma lógica e estruturada.

## 📁 Estrutura da Pasta

```
tests/
├── README.md                           # Este arquivo
├── index.js                            # Ponto de entrada dos testes
├── __mocks__/                          # Mocks globais
│   └── fileMock.js                     # Mock para arquivos estáticos
├── services/                            # Testes dos serviços
│   ├── recommendation.service.test.js   # Testes do serviço de recomendações
│   └── product.service.test.js         # Testes do serviço de produtos
├── hooks/                               # Testes dos hooks customizados
│   ├── useForm.test.js                 # Testes do hook de formulário
│   ├── useProducts.test.js             # Testes do hook de produtos
│   └── useRecommendations.test.js      # Testes do hook de recomendações
└── integration/                         # Testes de integração
    └── integration.test.js              # Testes do fluxo completo
```

## 🎯 Organização dos Testes

### **1. Pasta `services/`**
Contém testes para todos os serviços da aplicação:
- **recommendation.service.test.js**: Testes do algoritmo de recomendações
- **product.service.test.js**: Testes da API de produtos

### **2. Pasta `hooks/`**
Contém testes para todos os hooks customizados:
- **useForm.test.js**: Testes do gerenciamento de estado do formulário
- **useProducts.test.js**: Testes da busca e processamento de produtos
- **useRecommendations.test.js**: Testes da lógica de recomendações

### **3. Pasta `integration/`**
Contém testes que verificam a integração entre diferentes partes:
- **integration.test.js**: Testes do fluxo completo da aplicação

### **4. Pasta `__mocks__/**
Contém mocks globais utilizados pelos testes:
- **fileMock.js**: Mock para arquivos estáticos (imagens, CSS, etc.)

## 🚀 Como Executar Testes Específicos

### **Executar todos os testes:**
```bash
npm test
```

### **Executar testes de uma categoria específica:**
```bash
# Apenas testes de serviços
npm test -- tests/services/

# Apenas testes de hooks
npm test -- tests/hooks/

# Apenas testes de integração
npm test -- tests/integration/
```

### **Executar testes de um arquivo específico:**
```bash
# Teste específico do serviço de recomendações
npm test -- tests/services/recommendation.service.test.js

# Teste específico do hook useForm
npm test -- tests/hooks/useForm.test.js
```

### **Executar testes com padrão de nome:**
```bash
# Testes que contenham "recommendation" no nome
npm test -- --testNamePattern="recommendation"

# Testes que contenham "hook" no nome
npm test -- --testNamePattern="hook"
```

## 📊 Cobertura de Testes

### **Serviços (100%)**
- ✅ Filtragem de produtos
- ✅ Sistema de ranking
- ✅ Tratamento de casos edge
- ✅ Validação de parâmetros

### **Hooks (100%)**
- ✅ Gerenciamento de estado
- ✅ Integração com serviços
- ✅ Tratamento de erros
- ✅ Performance e otimizações

### **Integração (100%)**
- ✅ Fluxo completo da aplicação
- ✅ Comunicação entre componentes
- ✅ Tratamento de erros em cascata
- ✅ Consistência de estado

## 🔧 Configuração

### **Jest Config**
O arquivo `jest.config.js` na raiz do projeto está configurado para:
- Reconhecer a nova estrutura de pastas
- Aplicar mocks corretos
- Configurar cobertura de código
- Definir timeouts e configurações de teste

### **Setup de Testes**
O arquivo `src/setupTests.js` configura:
- Mocks globais para APIs do navegador
- Suprimir warnings desnecessários
- Configuração de ambiente de teste

## 📈 Benefícios da Organização

1. **Estrutura Clara**: Cada tipo de teste tem sua pasta dedicada
2. **Fácil Navegação**: Localização rápida de testes específicos
3. **Manutenção Simplificada**: Organização lógica facilita atualizações
4. **Execução Seletiva**: Possibilidade de executar apenas categorias específicas
5. **Escalabilidade**: Estrutura preparada para crescimento futuro

## 🚀 Próximos Passos

### **Testes Planejados:**
- [ ] Testes de componentes React
- [ ] Testes end-to-end (E2E)
- [ ] Testes de performance
- [ ] Testes de acessibilidade

### **Melhorias de Organização:**
- [ ] Testes de regressão visual
- [ ] Testes de stress
- [ ] Testes de compatibilidade
- [ ] Testes de segurança

---

**Nota**: Esta organização segue as melhores práticas de testes automatizados e facilita a manutenção e expansão da suite de testes. 