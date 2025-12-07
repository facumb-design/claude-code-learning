/**
 * Funciones de utilidad para manipular strings
 *
 * Este archivo contiene funciones simples que sirven como ejemplo
 * para aprender a trabajar con TypeScript y tests.
 */

/**
 * Capitaliza la primera letra de un string
 *
 * @param text - El texto a capitalizar
 * @returns El texto con la primera letra en mayúscula
 *
 * @example
 * ```ts
 * capitalize('hola') // 'Hola'
 * capitalize('MUNDO') // 'MUNDO'
 * capitalize('') // ''
 * ```
 */
export function capitalize(text: string): string {
  if (text.length === 0) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Invierte un string
 *
 * @param text - El texto a invertir
 * @returns El texto invertido
 *
 * @example
 * ```ts
 * reverse('hola') // 'aloh'
 * reverse('TypeScript') // 'tpircSepyT'
 * reverse('') // ''
 * ```
 */
export function reverse(text: string): string {
  return text.split('').reverse().join('');
}

/**
 * Cuenta las palabras en un string
 *
 * @param text - El texto a analizar
 * @returns El número de palabras (separadas por espacios)
 *
 * @example
 * ```ts
 * countWords('Hola mundo') // 2
 * countWords('  espacios   extra  ') // 2
 * countWords('') // 0
 * ```
 */
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return 0;
  }
  return trimmed.split(/\s+/).length;
}
