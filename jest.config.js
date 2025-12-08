/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Usar ts-jest para procesar archivos TypeScript
  preset: 'ts-jest',

  // Entorno de ejecución de Node.js
  testEnvironment: 'node',

  // Patrón para encontrar archivos de test
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.spec.ts'
  ],

  // Directorios donde buscar módulos
  roots: ['<rootDir>/src', '<rootDir>/tests'],

  // Mapeo de rutas para imports (opcional, útil para imports absolutos)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // Cobertura de código
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],

  // Umbral mínimo de cobertura (opcional, puedes ajustar)
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
