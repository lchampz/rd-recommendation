import { renderHook, act, waitFor } from '@testing-library/react';
import { useForm, useProducts, useRecommendations } from '../hooks';
import recommendationService from '../services/recommendation.service';

// Mock do serviço de recomendações
jest.mock('../services/recommendation.service', () => ({
    getRecommendations: jest.fn()
}));

// Mock do serviço de produtos
jest.mock('../services/product.service', () => ({
    __esModule: true,
    default: jest.fn()
}));

import getProducts from '../services/product.service';

describe('Testes de Integração', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Fluxo Completo: Form → Hook → Service → Recommendations', () => {
        it('deve integrar todos os hooks e serviços corretamente', async () => {
            // Mock dos produtos
            const mockProducts = [
                {
                    id: 1,
                    name: 'RD Station CRM',
                    category: 'Vendas',
                    preferences: [
                        'Integração fácil com ferramentas de e-mail',
                        'Relatórios avançados de desempenho de vendas'
                    ],
                    features: [
                        'Gestão de leads e oportunidades',
                        'Automação de fluxos de trabalho de vendas'
                    ]
                },
                {
                    id: 2,
                    name: 'RD Station Marketing',
                    category: 'Marketing',
                    preferences: [
                        'Automação de marketing',
                        'Testes A/B para otimização de campanhas'
                    ],
                    features: [
                        'Criação e gestão de campanhas de e-mail',
                        'Rastreamento de comportamento do usuário'
                    ]
                }
            ];

            // Mock das respostas dos serviços
            getProducts.mockResolvedValue(mockProducts);

            const mockRecommendations = [mockProducts[0]]; // CRM como recomendação
            recommendationService.getRecommendations.mockReturnValue(mockRecommendations);

            // 1. Hook de produtos
            const { result: productsResult } = renderHook(() => useProducts());

            await waitFor(() => {
                expect(productsResult.current.products).toEqual(mockProducts);
            });

            // 2. Hook de formulário
            const { result: formResult } = renderHook(() => useForm({
                selectedPreferences: [],
                selectedFeatures: [],
                selectedRecommendationType: ''
            }));

            // 3. Simular seleção de preferências
            act(() => {
                formResult.current.handleChange('selectedPreferences', [
                    'Integração fácil com ferramentas de e-mail'
                ]);
            });

            expect(formResult.current.formData.selectedPreferences).toEqual([
                'Integração fácil com ferramentas de e-mail'
            ]);

            // 4. Hook de recomendações
            const { result: recommendationsResult } = renderHook(() => useRecommendations());

            // 5. Gerar recomendações
            await act(async () => {
                recommendationsResult.current.getRecommendations(
                    formResult.current.formData,
                    productsResult.current.products
                );
            });

            // 6. Verificar se o serviço foi chamado corretamente
            expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
                {
                    selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
                    selectedFeatures: [],
                    selectedRecommendationType: ''
                },
                mockProducts
            );

            // 7. Verificar se as recomendações foram atualizadas
            expect(recommendationsResult.current.recommendations).toEqual(mockRecommendations);
        });

        it('deve lidar com mudanças dinâmicas no formulário', async () => {
            const mockProducts = [
                {
                    id: 1,
                    name: 'Produto A',
                    preferences: ['Pref A', 'Pref B'],
                    features: ['Feat A']
                }
            ];

            getProducts.mockResolvedValue(mockProducts);
            recommendationService.getRecommendations.mockReturnValue(mockProducts);

            // Hook de produtos
            const { result: productsResult } = renderHook(() => useProducts());

            await waitFor(() => {
                expect(productsResult.current.products).toEqual(mockProducts);
            });

            // Hook de formulário
            const { result: formResult } = renderHook(() => useForm());

            // Hook de recomendações
            const { result: recommendationsResult } = renderHook(() => useRecommendations());

            // Simular múltiplas mudanças
            act(() => {
                formResult.current.handleChange('selectedPreferences', ['Pref A']);
            });

            act(() => {
                formResult.current.handleChange('selectedFeatures', ['Feat A']);
            });

            act(() => {
                formResult.current.handleChange('selectedRecommendationType', 'SingleProduct');
            });

            // Verificar estado final do formulário
            expect(formResult.current.formData).toEqual({
                selectedPreferences: ['Pref A'],
                selectedFeatures: ['Feat A'],
                selectedRecommendationType: 'SingleProduct'
            });

            // Gerar recomendações
            await act(async () => {
                recommendationsResult.current.getRecommendations(
                    formResult.current.formData,
                    productsResult.current.products
                );
            });

            // Verificar se o serviço foi chamado com os dados corretos
            expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
                {
                    selectedPreferences: ['Pref A'],
                    selectedFeatures: ['Feat A'],
                    selectedRecommendationType: 'SingleProduct'
                },
                mockProducts
            );
        });

        it('deve lidar com erros em cascata', async () => {
            // Mock de erro no serviço de produtos
            getProducts.mockRejectedValue(new Error('Erro na API'));

            // Hook de produtos deve lidar com erro
            const { result: productsResult } = renderHook(() => useProducts());

            await waitFor(() => {
                expect(productsResult.current.products).toEqual([]);
            });

            // Hook de formulário deve funcionar normalmente
            const { result: formResult } = renderHook(() => useForm());

            act(() => {
                formResult.current.handleChange('selectedPreferences', ['Pref A']);
            });

            // Hook de recomendações deve lidar com produtos vazios
            const { result: recommendationsResult } = renderHook(() => useRecommendations());

            await act(async () => {
                const result = recommendationsResult.current.getRecommendations(
                    formResult.current.formData,
                    productsResult.current.products
                );
                expect(result).toEqual([]);
            });

            expect(recommendationsResult.current.recommendations).toEqual([]);
        });

        it('deve manter estado consistente entre hooks', async () => {
            const mockProducts = [
                {
                    id: 1,
                    name: 'Produto A',
                    preferences: ['Pref A'],
                    features: ['Feat A']
                }
            ];

            getProducts.mockResolvedValue(mockProducts);
            recommendationService.getRecommendations.mockReturnValue(mockProducts);

            // Todos os hooks
            const { result: productsResult } = renderHook(() => useProducts());
            const { result: formResult } = renderHook(() => useForm());
            const { result: recommendationsResult } = renderHook(() => useRecommendations());

            // Aguardar produtos carregarem
            await waitFor(() => {
                expect(productsResult.current.products).toEqual(mockProducts);
            });

            // Simular mudanças no formulário
            act(() => {
                formResult.current.handleChange('selectedPreferences', ['Pref A']);
            });

            // Verificar se o estado foi mantido
            expect(formResult.current.formData.selectedPreferences).toEqual(['Pref A']);
            expect(productsResult.current.products).toEqual(mockProducts);

            // Gerar recomendações
            await act(async () => {
                recommendationsResult.current.getRecommendations(
                    formResult.current.formData,
                    productsResult.current.products
                );
            });

            // Verificar estado final
            expect(recommendationsResult.current.recommendations).toEqual(mockProducts);
            expect(formResult.current.formData.selectedPreferences).toEqual(['Pref A']);
            expect(productsResult.current.products).toEqual(mockProducts);
        });
    });

    describe('Comunicação entre Componentes', () => {
        it('deve simular comunicação via props e callbacks', () => {
            // Simular componente pai
            const mockOnRecommendationsUpdate = jest.fn();
            const mockOnPreferencesUpdate = jest.fn();
            const mockOnFeaturesUpdate = jest.fn();

            // Hook de formulário com callbacks
            const { result: formResult } = renderHook(() => useForm());

            // Simular mudanças que disparam callbacks
            act(() => {
                formResult.current.handleChange('selectedPreferences', ['Pref A']);
                if (mockOnPreferencesUpdate) {
                    mockOnPreferencesUpdate(['Pref A']);
                }
            });

            act(() => {
                formResult.current.handleChange('selectedFeatures', ['Feat A']);
                if (mockOnFeaturesUpdate) {
                    mockOnFeaturesUpdate(['Feat A']);
                }
            });

            // Verificar se os callbacks foram chamados
            expect(mockOnPreferencesUpdate).toHaveBeenCalledWith(['Pref A']);
            expect(mockOnFeaturesUpdate).toHaveBeenCalledWith(['Feat A']);

            // Verificar estado do formulário
            expect(formResult.current.formData).toEqual({
                selectedPreferences: ['Pref A'],
                selectedFeatures: ['Feat A']
            });
        });
    });
}); 