module.exports = {
    // Diretório raiz dos testes
    testEnvironment: 'jsdom',

    // Configurações de cobertura
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/index.js',
        '!src/reportWebVitals.js',
        '!src/setupTests.js',
        '!src/**/*.test.{js,jsx}',
        '!src/**/*.spec.{js,jsx}',
        '!src/mocks/**/*',
        '!src/components/**/index.js',
        '!src/hooks/index.js',
        '!src/services/index.js'
    ],

    // Configurações de cobertura
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },

    // Configurações de transformação
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    },

    // Configurações de módulos
    moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tests/__mocks__/fileMock.js'
    },

    // Configurações de setup
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

    // Configurações de teste - atualizado para nova pasta
    testMatch: [
        '<rootDir>/tests/**/*.{test,spec}.{js,jsx}',
        '<rootDir>/tests/**/__tests__/**/*.{js,jsx}'
    ],

    // Configurações de transformação de módulos
    transformIgnorePatterns: [
        '/node_modules/(?!(axios|@testing-library)/)'
    ],

    // Configurações de verbose
    verbose: true,

    // Configurações de timeout
    testTimeout: 10000,

    // Configurações de clearMocks
    clearMocks: true,

    // Configurações de restoreMocks
    restoreMocks: true,

    // Configurações de resetMocks
    resetMocks: true,

    // Configurações de collectCoverage
    collectCoverage: false,

    // Configurações de coverageDirectory
    coverageDirectory: 'coverage',

    // Configurações de coverageReporters
    coverageReporters: [
        'text',
        'lcov',
        'html'
    ],

    // Configurações de moduleFileExtensions
    moduleFileExtensions: [
        'js',
        'jsx',
        'json'
    ],

    // Configurações de testPathIgnorePatterns
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/build/'
    ],

    // Configurações de watchPathIgnorePatterns
    watchPathIgnorePatterns: [
        '/node_modules/',
        '/dist/',
        '/build/',
        '/coverage/'
    ]
}; 