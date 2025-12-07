/**
 * Tests para stringHelpers
 *
 * Estos tests sirven como ejemplo de cómo escribir tests con Jest y TypeScript.
 */

import { capitalize, reverse, countWords } from '../src/utils/stringHelpers';

describe('stringHelpers', () => {
  describe('capitalize', () => {
    test('capitaliza la primera letra de un string', () => {
      expect(capitalize('hola')).toBe('Hola');
      expect(capitalize('mundo')).toBe('Mundo');
    });

    test('mantiene el string si ya está capitalizado', () => {
      expect(capitalize('Hola')).toBe('Hola');
      expect(capitalize('MUNDO')).toBe('MUNDO');
    });

    test('maneja strings vacíos', () => {
      expect(capitalize('')).toBe('');
    });

    test('maneja strings de un solo carácter', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });
  });

  describe('reverse', () => {
    test('invierte un string correctamente', () => {
      expect(reverse('hola')).toBe('aloh');
      expect(reverse('TypeScript')).toBe('tpircSepyT');
    });

    test('maneja strings vacíos', () => {
      expect(reverse('')).toBe('');
    });

    test('maneja palíndromos', () => {
      expect(reverse('oso')).toBe('oso');
      expect(reverse('anilina')).toBe('anilina');
    });
  });

  describe('countWords', () => {
    test('cuenta palabras separadas por espacios', () => {
      expect(countWords('Hola mundo')).toBe(2);
      expect(countWords('uno dos tres')).toBe(3);
    });

    test('maneja espacios extra', () => {
      expect(countWords('  espacios   extra  ')).toBe(2);
      expect(countWords('   múltiples    espacios    entre    palabras   ')).toBe(4);
    });

    test('maneja strings vacíos', () => {
      expect(countWords('')).toBe(0);
      expect(countWords('   ')).toBe(0);
    });

    test('maneja una sola palabra', () => {
      expect(countWords('palabra')).toBe(1);
      expect(countWords('  palabra  ')).toBe(1);
    });
  });
});
