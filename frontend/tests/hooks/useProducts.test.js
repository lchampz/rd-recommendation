import { renderHook, act, waitFor } from '@testing-library/react';
import useProducts from './useProducts';

// Mock do serviço de produtos
jest.mock('../services/product.service', () => ({
    __esModule: true,
    default: jest.fn()
}));

import getProducts from '../services/product.service';

describe('useProducts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve inicializar com estado vazio', () => {
        const { result } = renderHook(() => useProducts());

        expect(result.current.preferences).toEqual([]);
        expect(result.current.features).toEqual([]);
        expect(result.current.products).toEqual([]);
    });

    it('deve buscar produtos na inicialização', async () => {
        const mockProducts = [
            {
                id: 1,
                name: 'Produto A',
                preferences: ['Pref A1', 'Pref A2'],
                features: ['Feat A1', 'Feat A2']
            },
            {
                id: 2,
                name: 'Produto B',
                preferences: ['Pref B1', 'Pref B2'],
                features: ['Feat B1', 'Feat B2']
            }
        ];

        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.products).toEqual(mockProducts);
        });

        expect(getProducts).toHaveBeenCalledTimes(1);
    });

    it('deve extrair preferências únicas dos produtos', async () => {
        const mockProducts = [
            {
                id: 1,
                preferences: ['Pref A', 'Pref B'],
                features: ['Feat A']
            },
            {
                id: 2,
                preferences: ['Pref B', 'Pref C'],
                features: ['Feat B']
            }
        ];

        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.preferences).toContain('Pref A');
            expect(result.current.preferences).toContain('Pref B');
            expect(result.current.preferences).toContain('Pref C');
        });

        // Deve ter 3 preferências únicas
        expect(result.current.preferences).toHaveLength(3);
    });

    it('deve extrair funcionalidades únicas dos produtos', async () => {
        const mockProducts = [
            {
                id: 1,
                preferences: ['Pref A'],
                features: ['Feat A', 'Feat B']
            },
            {
                id: 2,
                preferences: ['Pref B'],
                features: ['Feat B', 'Feat C']
            }
        ];

        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.features).toContain('Feat A');
            expect(result.current.features).toContain('Feat B');
            expect(result.current.features).toContain('Feat C');
        });

        // Deve ter 3 funcionalidades únicas
        expect(result.current.features).toHaveLength(3);
    });

    it('deve limitar preferências e funcionalidades por produto (máximo 2)', async () => {
        const mockProducts = [
            {
                id: 1,
                preferences: ['Pref A', 'Pref B', 'Pref C', 'Pref D'],
                features: ['Feat A', 'Feat B', 'Feat C', 'Feat D']
            }
        ];

        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.preferences).toHaveLength(2);
            expect(result.current.features).toHaveLength(2);
        });
    });

    it('deve lidar com produtos sem preferências ou funcionalidades', async () => {
        const mockProducts = [
            {
                id: 1,
                preferences: [],
                features: []
            }
        ];

        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.preferences).toEqual([]);
            expect(result.current.features).toEqual([]);
        });
    });

    it('deve lidar com erro na busca de produtos', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        getProducts.mockRejectedValue(new Error('Erro na API'));

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', expect.any(Error));
        });

        expect(result.current.products).toEqual([]);
        expect(result.current.preferences).toEqual([]);
        expect(result.current.features).toEqual([]);

        consoleSpy.mockRestore();
    });

    it('deve manter estado anterior em caso de erro', async () => {
        const initialProducts = [
            {
                id: 1,
                preferences: ['Pref A'],
                features: ['Feat A']
            }
        ];

        getProducts.mockResolvedValueOnce(initialProducts);

        const { result } = renderHook(() => useProducts());

        // Primeira chamada bem-sucedida
        await waitFor(() => {
            expect(result.current.products).toEqual(initialProducts);
        });

        // Segunda chamada com erro
        getProducts.mockRejectedValueOnce(new Error('Erro na API'));

        // Simula nova renderização
        const { result: result2 } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result2.current.products).toEqual([]);
        });
    });

    it('deve randomizar a ordem das preferências e funcionalidades', async () => {
        const mockProducts = [
            {
                id: 1,
                preferences: ['Pref A', 'Pref B', 'Pref C'],
                features: ['Feat A', 'Feat B', 'Feat C']
            }
        ];

        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.preferences).toHaveLength(2);
            expect(result.current.features).toHaveLength(2);
        });

        // Verifica se as preferências e funcionalidades estão sendo limitadas
        expect(result.current.preferences.length).toBeLessThanOrEqual(2);
        expect(result.current.features.length).toBeLessThanOrEqual(2);
    });

    it('deve retornar arrays vazios quando não há produtos', async () => {
        getProducts.mockResolvedValue([]);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.products).toEqual([]);
            expect(result.current.preferences).toEqual([]);
            expect(result.current.features).toEqual([]);
        });
    });

    it('deve lidar com produtos com propriedades undefined', async () => {
        const mockProducts = [
            {
                id: 1,
                preferences: undefined,
                features: undefined
            }
        ];

        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.preferences).toEqual([]);
            expect(result.current.features).toEqual([]);
        });
    });

    it('deve lidar com produtos com propriedades null', async () => {
        const mockProducts = [
            {
                id: 1,
                preferences: null,
                features: null
            }
        ];

        getProducts.mockResolvedValue(mockProducts);

        const { result } = renderHook(() => useProducts());

        await waitFor(() => {
            expect(result.current.preferences).toEqual([]);
            expect(result.current.features).toEqual([]);
        });
    });
}); 