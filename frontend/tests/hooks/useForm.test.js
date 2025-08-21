import { renderHook, act } from '@testing-library/react';
import useForm from './useForm';

describe('useForm', () => {
    it('deve inicializar com estado inicial fornecido', () => {
        const initialState = {
            selectedPreferences: ['Pref A'],
            selectedFeatures: ['Feat B'],
            selectedRecommendationType: 'SingleProduct'
        };

        const { result } = renderHook(() => useForm(initialState));

        expect(result.current.formData).toEqual(initialState);
        expect(typeof result.current.handleChange).toBe('function');
    });

    it('deve inicializar com estado vazio quando não fornecido', () => {
        const { result } = renderHook(() => useForm());

        expect(result.current.formData).toEqual({});
        expect(typeof result.current.handleChange).toBe('function');
    });

    it('deve atualizar preferências selecionadas', () => {
        const initialState = {
            selectedPreferences: [],
            selectedFeatures: []
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedPreferences', ['Pref A', 'Pref B']);
        });

        expect(result.current.formData.selectedPreferences).toEqual(['Pref A', 'Pref B']);
        expect(result.current.formData.selectedFeatures).toEqual([]);
    });

    it('deve atualizar funcionalidades selecionadas', () => {
        const initialState = {
            selectedPreferences: [],
            selectedFeatures: []
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedFeatures', ['Feat A', 'Feat B']);
        });

        expect(result.current.formData.selectedFeatures).toEqual(['Feat A', 'Feat B']);
        expect(result.current.formData.selectedPreferences).toEqual([]);
    });

    it('deve atualizar tipo de recomendação', () => {
        const initialState = {
            selectedPreferences: [],
            selectedFeatures: [],
            selectedRecommendationType: ''
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedRecommendationType', 'SingleProduct');
        });

        expect(result.current.formData.selectedRecommendationType).toBe('SingleProduct');
    });

    it('deve substituir valores existentes ao invés de adicionar', () => {
        const initialState = {
            selectedPreferences: ['Pref A'],
            selectedFeatures: ['Feat A']
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedPreferences', ['Pref B']);
        });

        expect(result.current.formData.selectedPreferences).toEqual(['Pref B']);
        expect(result.current.formData.selectedFeatures).toEqual(['Feat A']);
    });

    it('deve lidar com valores undefined', () => {
        const initialState = {
            selectedPreferences: ['Pref A'],
            selectedFeatures: ['Feat A']
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedPreferences', undefined);
        });

        expect(result.current.formData.selectedPreferences).toBeUndefined();
    });

    it('deve lidar com valores null', () => {
        const initialState = {
            selectedPreferences: ['Pref A'],
            selectedFeatures: ['Feat A']
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedFeatures', null);
        });

        expect(result.current.formData.selectedFeatures).toBeNull();
    });

    it('deve lidar com arrays vazios', () => {
        const initialState = {
            selectedPreferences: ['Pref A'],
            selectedFeatures: ['Feat A']
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedPreferences', []);
        });

        expect(result.current.formData.selectedPreferences).toEqual([]);
    });

    it('deve lidar com strings vazias', () => {
        const initialState = {
            selectedRecommendationType: 'SingleProduct'
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedRecommendationType', '');
        });

        expect(result.current.formData.selectedRecommendationType).toBe('');
    });

    it('deve manter outros campos inalterados ao atualizar um campo', () => {
        const initialState = {
            selectedPreferences: ['Pref A'],
            selectedFeatures: ['Feat A'],
            selectedRecommendationType: 'SingleProduct',
            outroCampo: 'valor'
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedPreferences', ['Pref B']);
        });

        expect(result.current.formData.selectedPreferences).toEqual(['Pref B']);
        expect(result.current.formData.selectedFeatures).toEqual(['Feat A']);
        expect(result.current.formData.selectedRecommendationType).toBe('SingleProduct');
        expect(result.current.formData.outroCampo).toBe('valor');
    });

    it('deve lidar com campos que não existem no estado inicial', () => {
        const initialState = {};

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('novoCampo', 'novo valor');
        });

        expect(result.current.formData.novoCampo).toBe('novo valor');
    });

    it('deve lidar com múltiplas atualizações consecutivas', () => {
        const initialState = {
            selectedPreferences: [],
            selectedFeatures: []
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('selectedPreferences', ['Pref A']);
        });

        act(() => {
            result.current.handleChange('selectedFeatures', ['Feat A']);
        });

        act(() => {
            result.current.handleChange('selectedPreferences', ['Pref A', 'Pref B']);
        });

        expect(result.current.formData.selectedPreferences).toEqual(['Pref A', 'Pref B']);
        expect(result.current.formData.selectedFeatures).toEqual(['Feat A']);
    });

    it('deve lidar com objetos aninhados', () => {
        const initialState = {
            config: {
                preferences: [],
                features: []
            }
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('config.preferences', ['Pref A']);
        });

        expect(result.current.formData.config.preferences).toEqual(['Pref A']);
        expect(result.current.formData.config.features).toEqual([]);
    });

    it('deve lidar com números', () => {
        const initialState = {
            quantidade: 0
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('quantidade', 5);
        });

        expect(result.current.formData.quantidade).toBe(5);
    });

    it('deve lidar com booleanos', () => {
        const initialState = {
            ativo: false
        };

        const { result } = renderHook(() => useForm(initialState));

        act(() => {
            result.current.handleChange('ativo', true);
        });

        expect(result.current.formData.ativo).toBe(true);
    });

    it('deve manter referência do objeto formData entre renderizações', () => {
        const initialState = {
            selectedPreferences: ['Pref A']
        };

        const { result, rerender } = renderHook(() => useForm(initialState));

        const firstFormData = result.current.formData;

        rerender();

        expect(result.current.formData).toBe(firstFormData);
    });

    it('deve criar nova referência do objeto formData quando há mudanças', () => {
        const initialState = {
            selectedPreferences: ['Pref A']
        };

        const { result } = renderHook(() => useForm(initialState));

        const firstFormData = result.current.formData;

        act(() => {
            result.current.handleChange('selectedPreferences', ['Pref B']);
        });

        expect(result.current.formData).not.toBe(firstFormData);
    });
}); 