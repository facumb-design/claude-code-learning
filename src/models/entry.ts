/**
 * Modelo de datos para una entrada del Dev Learning Journal
 *
 * Representa un registro de aprendizaje diario donde el usuario
 * documenta qué aprendió, con ejemplos de código y tags.
 */

/**
 * Interfaz principal para una entrada del diario de aprendizaje
 */
export interface Entry {
  /**
   * Identificador único de la entrada (UUID v4)
   */
  id: string;

  /**
   * Título del tema o concepto aprendido
   * @example "Cómo usar async/await en TypeScript"
   */
  title: string;

  /**
   * Descripción detallada de lo que se aprendió
   * Puede incluir explicaciones, observaciones, dudas resueltas, etc.
   */
  content: string;

  /**
   * Snippet de código de ejemplo (opcional)
   * Almacenado como string, puede ser formateado con Markdown
   * @example "```ts\nasync function fetchData() { ... }\n```"
   */
  codeSnippet?: string;

  /**
   * Tags para categorizar y organizar el aprendizaje
   * @example ["TypeScript", "Async", "Promises"]
   */
  tags: string[];

  /**
   * Fecha y hora de creación de la entrada (ISO 8601)
   * @example "2024-01-15T10:30:00.000Z"
   */
  createdAt: string;

  /**
   * Fecha y hora de última actualización (ISO 8601)
   * @example "2024-01-15T14:20:00.000Z"
   */
  updatedAt: string;
}

/**
 * Tipo para crear una nueva entrada (sin campos autogenerados)
 * Omitimos id, createdAt y updatedAt porque se generan automáticamente
 */
export type CreateEntryDTO = Omit<Entry, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Tipo para actualizar una entrada existente
 * Todos los campos son opcionales excepto el id
 */
export type UpdateEntryDTO = Partial<Omit<Entry, 'id' | 'createdAt'>> & {
  id: string;
};

/**
 * Filtros para buscar entradas
 */
export interface EntryFilters {
  /**
   * Buscar por término en título o contenido
   */
  search?: string;

  /**
   * Filtrar por tags (AND: debe tener todos los tags)
   */
  tags?: string[];

  /**
   * Filtrar por rango de fechas
   */
  dateFrom?: string;
  dateTo?: string;
}
