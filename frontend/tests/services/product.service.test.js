import axios from 'axios';
import getProducts from './product.service';

// Mock do axios
jest.mock('axios');

describe('ProductService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getProducts', () => {
        it('deve buscar produtos da API com sucesso', async () => {
            const mockProducts = [
                {
                    id: 1,
                    name: 'RD Station CRM',
                    category: 'Vendas',
                    preferences: ['Pref A', 'Pref B'],
                    features: ['Feat A', 'Feat B']
                }
            ];

            axios.get.mockResolvedValue({ data: mockProducts });

            const result = await getProducts();

            expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
            expect(result).toEqual(mockProducts);
        });

        it('deve fazer requisição para a URL correta', async () => {
            axios.get.mockResolvedValue({ data: [] });

            await getProducts();

            expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
        });

        it('deve retornar dados da resposta da API', async () => {
            const mockResponse = {
                data: [
                    { id: 1, name: 'Produto A' },
                    { id: 2, name: 'Produto B' }
                ]
            };

            axios.get.mockResolvedValue(mockResponse);

            const result = await getProducts();

            expect(result).toEqual(mockResponse.data);
        });

        it('deve lidar com resposta vazia da API', async () => {
            axios.get.mockResolvedValue({ data: [] });

            const result = await getProducts();

            expect(result).toEqual([]);
        });

        it('deve lidar com resposta null da API', async () => {
            axios.get.mockResolvedValue({ data: null });

            const result = await getProducts();

            expect(result).toBeNull();
        });

        it('deve lidar com resposta undefined da API', async () => {
            axios.get.mockResolvedValue({ data: undefined });

            const result = await getProducts();

            expect(result).toBeUndefined();
        });

        it('deve lidar com erro de rede', async () => {
            const networkError = new Error('Network Error');
            axios.get.mockRejectedValue(networkError);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            await expect(getProducts()).rejects.toThrow('Network Error');
            expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', networkError);

            consoleSpy.mockRestore();
        });

        it('deve lidar com erro de timeout', async () => {
            const timeoutError = new Error('Request timeout');
            axios.get.mockRejectedValue(timeoutError);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            await expect(getProducts()).rejects.toThrow('Request timeout');
            expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', timeoutError);

            consoleSpy.mockRestore();
        });

        it('deve lidar com erro de status HTTP', async () => {
            const httpError = {
                response: {
                    status: 404,
                    data: { message: 'Not Found' }
                }
            };
            axios.get.mockRejectedValue(httpError);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            await expect(getProducts()).rejects.toEqual(httpError);
            expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', httpError);

            consoleSpy.mockRestore();
        });

        it('deve lidar com erro de autenticação', async () => {
            const authError = {
                response: {
                    status: 401,
                    data: { message: 'Unauthorized' }
                }
            };
            axios.get.mockRejectedValue(authError);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            await expect(getProducts()).rejects.toEqual(authError);
            expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', authError);

            consoleSpy.mockRestore();
        });

        it('deve lidar com erro de servidor', async () => {
            const serverError = {
                response: {
                    status: 500,
                    data: { message: 'Internal Server Error' }
                }
            };
            axios.get.mockRejectedValue(serverError);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            await expect(getProducts()).rejects.toEqual(serverError);
            expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', serverError);

            consoleSpy.mockRestore();
        });

        it('deve lidar com erro sem resposta', async () => {
            const errorWithoutResponse = new Error('Something went wrong');
            axios.get.mockRejectedValue(errorWithoutResponse);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

            await expect(getProducts()).rejects.toThrow('Something went wrong');
            expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', errorWithoutResponse);

            consoleSpy.mockRestore();
        });

        it('deve fazer apenas uma requisição por chamada', async () => {
            axios.get.mockResolvedValue({ data: [] });

            await getProducts();

            expect(axios.get).toHaveBeenCalledTimes(1);
        });

        it('deve lidar com múltiplas chamadas consecutivas', async () => {
            const firstResponse = { data: [{ id: 1, name: 'Primeiro' }] };
            const secondResponse = { data: [{ id: 2, name: 'Segundo' }] };

            axios.get
                .mockResolvedValueOnce(firstResponse)
                .mockResolvedValueOnce(secondResponse);

            const firstResult = await getProducts();
            const secondResult = await getProducts();

            expect(firstResult).toEqual(firstResponse.data);
            expect(secondResult).toEqual(secondResponse.data);
            expect(axios.get).toHaveBeenCalledTimes(2);
        });

        it('deve lidar com resposta com estrutura inesperada', async () => {
            const unexpectedResponse = {
                data: {
                    products: [
                        { id: 1, name: 'Produto A' }
                    ]
                }
            };

            axios.get.mockResolvedValue(unexpectedResponse);

            const result = await getProducts();

            expect(result).toEqual(unexpectedResponse.data);
        });

        it('deve lidar com resposta sem propriedade data', async () => {
            const responseWithoutData = { status: 200 };

            axios.get.mockResolvedValue(responseWithoutData);

            const result = await getProducts();

            expect(result).toBeUndefined();
        });
    });

    describe('Configuração da API', () => {
        it('deve usar a URL base correta', () => {
            // Verifica se a URL base está definida corretamente
            expect(axios.get).not.toHaveBeenCalled();

            // A URL base é definida no arquivo do serviço
            // Este teste verifica se o mock está funcionando
            axios.get.mockResolvedValue({ data: [] });

            getProducts();

            expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
        });
    });
}); 