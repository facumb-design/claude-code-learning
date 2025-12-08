/** @type {import('jest').Config} */
export default {
  // Usar ts-jest para transformar TypeScript
  preset: 'ts-jest',

  // Entorno de ejecución (Node.js)
  testEnvironment: 'node',

  // Extensiones de archivos de test
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],

  // Directorio raíz de los tests
  roots: ['<rootDir>/src', '<rootDir>/tests'],

  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts'
  ],

  // Módulos de TypeScript
  moduleFileExtensions: ['ts', 'js', 'json'],

  // Transform para TypeScript
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
    }]
  },

  // Verbose output (útil para aprender)
  verbose: true,

  // Resetear mocks entre tests
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};
