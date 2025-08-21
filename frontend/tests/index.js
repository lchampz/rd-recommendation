// 🧪 Testes Automatizados - Recomendador RD Station
// Este arquivo serve como ponto de entrada para todos os testes

// Testes de Serviços
import './services/recommendation.service.test';
import './services/product.service.test';

// Testes de Hooks
import './hooks/useForm.test';
import './hooks/useProducts.test';
import './hooks/useRecommendations.test';

// Testes de Integração
import './integration/integration.test';

console.log('🧪 Todos os testes foram carregados com sucesso!');
console.log('📁 Estrutura de testes organizada em:');
console.log('   ├── tests/services/     - Testes dos serviços');
console.log('   ├── tests/hooks/        - Testes dos hooks customizados');
console.log('   ├── tests/integration/  - Testes de integração');
console.log('   └── tests/__mocks__/    - Mocks e arquivos de teste'); 