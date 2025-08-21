import recommendationService from './recommendation.service';

// Mock de produtos para testes
const mockProducts = [
  {
    id: 1,
    name: 'RD Station CRM',
    category: 'Vendas',
    preferences: [
      'Integração fácil com ferramentas de e-mail',
      'Relatórios avançados de desempenho de vendas',
      'Segmentação avançada de leads'
    ],
    features: [
      'Gestão de leads e oportunidades',
      'Automação de fluxos de trabalho de vendas',
      'Rastreamento de interações com clientes'
    ]
  },
  {
    id: 2,
    name: 'RD Station Marketing',
    category: 'Marketing',
    preferences: [
      'Automação de marketing',
      'Testes A/B para otimização de campanhas',
      'Segmentação avançada de leads'
    ],
    features: [
      'Criação e gestão de campanhas de e-mail',
      'Rastreamento de comportamento do usuário',
      'Análise de retorno sobre investimento (ROI) de campanhas'
    ]
  },
  {
    id: 3,
    name: 'RD Conversas',
    category: 'Omnichannel',
    preferences: [
      'Integração com chatbots',
      'Histórico unificado de interações',
      'Respostas automáticas e personalizadas'
    ],
    features: [
      'Gestão de conversas em diferentes canais',
      'Chat ao vivo e mensagens automatizadas',
      'Integração com RD Station CRM e Marketing'
    ]
  }
];

describe('RecommendationService', () => {
  describe('getRecommendations', () => {
    it('deve retornar array vazio quando não há produtos', () => {
      const result = recommendationService.getRecommendations({}, []);
      expect(result).toEqual([]);
    });

    it('deve retornar array vazio quando produtos é null', () => {
      const result = recommendationService.getRecommendations({}, null);
      expect(result).toEqual([]);
    });

    it('deve retornar array vazio quando produtos é undefined', () => {
      const result = recommendationService.getRecommendations({}, undefined);
      expect(result).toEqual([]);
    });

    it('deve retornar todos os produtos quando não há seleções', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: []
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[1].name).toBe('RD Station Marketing');
      expect(result[2].name).toBe('RD Conversas');
    });

    it('deve filtrar produtos que atendem pelo menos uma preferência', () => {
      const formData = {
        selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
        selectedFeatures: []
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('RD Station CRM');
    });

    it('deve filtrar produtos que atendem pelo menos uma funcionalidade', () => {
      const formData = {
        selectedPreferences: [],
        selectedFeatures: ['Gestão de leads e oportunidades']
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('RD Station CRM');
    });

    it('deve filtrar produtos que atendem tanto preferências quanto funcionalidades', () => {
      const formData = {
        selectedPreferences: ['Segmentação avançada de leads'],
        selectedFeatures: ['Segmentação avançada de leads']
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);

      expect(result).toHaveLength(2); // CRM e Marketing têm essa funcionalidade
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[1].name).toBe('RD Station Marketing');
    });

    it('deve ordenar produtos por score (maior primeiro)', () => {
      const formData = {
        selectedPreferences: ['Segmentação avançada de leads', 'Integração fácil com ferramentas de e-mail'],
        selectedFeatures: ['Gestão de leads e oportunidades']
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);

      // CRM deve aparecer primeiro pois tem 3 matches (2 preferências + 1 funcionalidade)
      // Marketing deve aparecer segundo pois tem 1 match (1 preferência)
      expect(result[0].name).toBe('RD Station CRM');
      expect(result[1].name).toBe('RD Station Marketing');
    });

    it('deve retornar produto único quando oneProduct é true', () => {
      const formData = {
        selectedPreferences: ['Segmentação avançada de leads'],
        selectedFeatures: []
      };

      const result = recommendationService.getRecommendations(formData, mockProducts, true);

      expect(Array.isArray(result)).toBe(false);
      expect(result.name).toBe('RD Station CRM');
    });

    it('deve retornar null quando oneProduct é true mas não há produtos', () => {
      const formData = {
        selectedPreferences: ['Preferência inexistente'],
        selectedFeatures: []
      };

      const result = recommendationService.getRecommendations(formData, mockProducts, true);

      expect(result).toBeNull();
    });

    it('deve lidar com produtos sem preferências ou funcionalidades', () => {
      const productsWithoutFeatures = [
        {
          id: 1,
          name: 'Produto Teste',
          category: 'Teste',
          preferences: [],
          features: []
        }
      ];

      const formData = {
        selectedPreferences: ['Qualquer coisa'],
        selectedFeatures: ['Qualquer coisa']
      };

      const result = recommendationService.getRecommendations(formData, productsWithoutFeatures);

      expect(result).toHaveLength(0);
    });

    it('deve lidar com seleções vazias ou undefined', () => {
      const formData1 = {
        selectedPreferences: undefined,
        selectedFeatures: []
      };

      const formData2 = {
        selectedPreferences: [],
        selectedFeatures: null
      };

      const result1 = recommendationService.getRecommendations(formData1, mockProducts);
      const result2 = recommendationService.getRecommendations(formData2, mockProducts);

      expect(result1).toHaveLength(3); // Deve retornar todos os produtos
      expect(result2).toHaveLength(3); // Deve retornar todos os produtos
    });

    it('deve calcular score corretamente para produtos com múltiplos matches', () => {
      const formData = {
        selectedPreferences: ['Segmentação avançada de leads', 'Integração fácil com ferramentas de e-mail'],
        selectedFeatures: ['Gestão de leads e oportunidades', 'Automação de fluxos de trabalho de vendas']
      };

      const result = recommendationService.getRecommendations(formData, mockProducts);

      // CRM deve ter score mais alto pois tem 4 matches totais
      expect(result[0].name).toBe('RD Station CRM');
    });
  });

  describe('getScorePoints', () => {
    it('deve calcular score corretamente para preferências', () => {
      const product = mockProducts[0];
      const selectedPreferences = ['Integração fácil com ferramentas de e-mail', 'Relatórios avançados de desempenho de vendas'];
      const selectedFeatures = [];

      const result = recommendationService.getRecommendations(
        { selectedPreferences, selectedFeatures },
        [product]
      );

      expect(result[0].name).toBe('RD Station CRM');
    });

    it('deve calcular score corretamente para funcionalidades', () => {
      const product = mockProducts[0];
      const selectedPreferences = [];
      const selectedFeatures = ['Gestão de leads e oportunidades', 'Automação de fluxos de trabalho de vendas'];

      const result = recommendationService.getRecommendations(
        { selectedPreferences, selectedFeatures },
        [product]
      );

      expect(result[0].name).toBe('RD Station CRM');
    });

    it('deve calcular score corretamente para preferências e funcionalidades combinadas', () => {
      const product = mockProducts[0];
      const selectedPreferences = ['Integração fácil com ferramentas de e-mail'];
      const selectedFeatures = ['Gestão de leads e oportunidades'];

      const result = recommendationService.getRecommendations(
        { selectedPreferences, selectedFeatures },
        [product]
      );

      expect(result[0].name).toBe('RD Station CRM');
    });
  });
});
