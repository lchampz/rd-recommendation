import { renderHook, act } from '@testing-library/react';
import useRecommendations from './useRecommendations';

// Mock do serviço de recomendações
jest.mock('../services/recommendation.service', () => ({
    getRecommendations: jest.fn()
}));

import recommendationService from '../services/recommendation.service';

describe('useRecommendations', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve inicializar com estado vazio', () => {
        const { result } = renderHook(() => useRecommendations());

        expect(result.current.recommendations).toEqual([]);
        expect(typeof result.current.getRecommendations).toBe('function');
        expect(typeof result.current.setRecommendations).toBe('function');
    });

    it('deve chamar getRecommendations e atualizar o estado', async () => {
        const mockRecommendations = [
            { id: 1, name: 'Produto A' },
            { id: 2, name: 'Produto B' }
        ];

        recommendationService.getRecommendations.mockReturnValue(mockRecommendations);

        const { result } = renderHook(() => useRecommendations());

        await act(async () => {
            result.current.getRecommendations({ selectedPreferences: [] }, []);
        });

        expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
            { selectedPreferences: [] },
            []
        );
        expect(result.current.recommendations).toEqual(mockRecommendations);
    });

    it('deve retornar array vazio quando produtos é null', async () => {
        const { result } = renderHook(() => useRecommendations());

        await act(async () => {
            const recommendations = result.current.getRecommendations({}, null);
            expect(recommendations).toEqual([]);
        });

        expect(result.current.recommendations).toEqual([]);
    });

    it('deve retornar array vazio quando produtos é undefined', async () => {
        const { result } = renderHook(() => useRecommendations());

        await act(async () => {
            const recommendations = result.current.getRecommendations({}, undefined);
            expect(recommendations).toEqual([]);
        });

        expect(result.current.recommendations).toEqual([]);
    });

    it('deve retornar array vazio quando produtos é array vazio', async () => {
        const { result } = renderHook(() => useRecommendations());

        await act(async () => {
            const recommendations = result.current.getRecommendations({}, []);
            expect(recommendations).toEqual([]);
        });

        expect(result.current.recommendations).toEqual([]);
    });

    it('deve atualizar recomendações quando setRecommendations é chamado', () => {
        const { result } = renderHook(() => useRecommendations());

        const newRecommendations = [
            { id: 1, name: 'Novo Produto A' },
            { id: 2, name: 'Novo Produto B' }
        ];

        act(() => {
            result.current.setRecommendations(newRecommendations);
        });

        expect(result.current.recommendations).toEqual(newRecommendations);
    });

    it('deve lidar com erros do serviço graciosamente', async () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

        recommendationService.getRecommendations.mockImplementation(() => {
            throw new Error('Erro do serviço');
        });

        const { result } = renderHook(() => useRecommendations());

        await act(async () => {
            result.current.getRecommendations({}, []);
        });

        expect(consoleSpy).toHaveBeenCalledWith('Nenhum produto disponível para gerar recomendações');
        expect(result.current.recommendations).toEqual([]);

        consoleSpy.mockRestore();
    });

    it('deve manter estado anterior quando getRecommendations falha', async () => {
        const initialRecommendations = [{ id: 1, name: 'Produto Inicial' }];

        const { result } = renderHook(() => useRecommendations());

        // Define recomendações iniciais
        act(() => {
            result.current.setRecommendations(initialRecommendations);
        });

        expect(result.current.recommendations).toEqual(initialRecommendations);

        // Simula falha no serviço
        recommendationService.getRecommendations.mockImplementation(() => {
            throw new Error('Erro do serviço');
        });

        await act(async () => {
            result.current.getRecommendations({}, null);
        });

        // Deve manter as recomendações iniciais
        expect(result.current.recommendations).toEqual(initialRecommendations);
    });

    it('deve chamar getRecommendations com parâmetros corretos', async () => {
        const mockFormData = {
            selectedPreferences: ['Preferência A'],
            selectedFeatures: ['Funcionalidade B']
        };

        const mockProducts = [
            { id: 1, name: 'Produto Teste' }
        ];

        const mockRecommendations = [{ id: 1, name: 'Produto Teste' }];
        recommendationService.getRecommendations.mockReturnValue(mockRecommendations);

        const { result } = renderHook(() => useRecommendations());

        await act(async () => {
            result.current.getRecommendations(mockFormData, mockProducts);
        });

        expect(recommendationService.getRecommendations).toHaveBeenCalledWith(
            mockFormData,
            mockProducts
        );
        expect(result.current.recommendations).toEqual(mockRecommendations);
    });

    it('deve retornar o valor retornado pelo serviço', async () => {
        const mockRecommendations = [
            { id: 1, name: 'Produto A' },
            { id: 2, name: 'Produto B' }
        ];

        recommendationService.getRecommendations.mockReturnValue(mockRecommendations);

        const { result } = renderHook(() => useRecommendations());

        let returnedValue;
        await act(async () => {
            returnedValue = result.current.getRecommendations({}, []);
        });

        expect(returnedValue).toEqual(mockRecommendations);
    });

    it('deve lidar com múltiplas chamadas consecutivas', async () => {
        const { result } = renderHook(() => useRecommendations());

        const firstCall = [{ id: 1, name: 'Primeiro' }];
        const secondCall = [{ id: 2, name: 'Segundo' }];

        recommendationService.getRecommendations
            .mockReturnValueOnce(firstCall)
            .mockReturnValueOnce(secondCall);

        // Primeira chamada
        await act(async () => {
            result.current.getRecommendations({}, []);
        });

        expect(result.current.recommendations).toEqual(firstCall);

        // Segunda chamada
        await act(async () => {
            result.current.getRecommendations({}, []);
        });

        expect(result.current.recommendations).toEqual(secondCall);
    });
}); 