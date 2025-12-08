/**
 * EntryRepository
 *
 * Capa de persistencia que maneja la lectura/escritura de entradas
 * en el archivo JSON. Es el único componente que accede al filesystem.
 *
 * Patrón Repository: separa la lógica de acceso a datos del resto de la app.
 */

import fs from 'fs/promises';
import path from 'path';
import { Entry, EntryFilters } from '../models';

/**
 * Ruta al archivo JSON donde se guardan las entradas
 */
const ENTRIES_FILE = path.join(__dirname, '../../data/entries.json');

/**
 * Repositorio para operaciones CRUD sobre entradas del diario
 */
export class EntryRepository {
  /**
   * Lee todas las entradas del archivo JSON
   * Si el archivo no existe, retorna array vacío
   */
  async findAll(): Promise<Entry[]> {
    try {
      const data = await fs.readFile(ENTRIES_FILE, 'utf-8');
      return JSON.parse(data) as Entry[];
    } catch (error) {
      // Si el archivo no existe, retornar array vacío
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  /**
   * Busca una entrada por ID
   * @param id - ID de la entrada
   * @returns La entrada si existe, undefined si no
   */
  async findById(id: string): Promise<Entry | undefined> {
    const entries = await this.findAll();
    return entries.find((entry) => entry.id === id);
  }

  /**
   * Busca entradas aplicando filtros
   * @param filters - Criterios de búsqueda
   * @returns Array de entradas que cumplen los filtros
   */
  async findByFilters(filters: EntryFilters): Promise<Entry[]> {
    let entries = await this.findAll();

    // Filtrar por búsqueda de texto (en título o contenido)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      entries = entries.filter(
        (entry) =>
          entry.title.toLowerCase().includes(searchLower) ||
          entry.content.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por tags (debe tener TODOS los tags especificados)
    if (filters.tags && filters.tags.length > 0) {
      entries = entries.filter((entry) =>
        filters.tags!.every((tag) => entry.tags.includes(tag))
      );
    }

    // Filtrar por rango de fechas
    if (filters.dateFrom) {
      const dateFrom = new Date(filters.dateFrom);
      entries = entries.filter(
        (entry) => new Date(entry.createdAt) >= dateFrom
      );
    }

    if (filters.dateTo) {
      const dateTo = new Date(filters.dateTo);
      entries = entries.filter((entry) => new Date(entry.createdAt) <= dateTo);
    }

    return entries;
  }

  /**
   * Crea una nueva entrada
   * @param entry - Entrada a crear
   * @returns La entrada creada
   */
  async create(entry: Entry): Promise<Entry> {
    const entries = await this.findAll();
    entries.push(entry);
    await this.saveAll(entries);
    return entry;
  }

  /**
   * Actualiza una entrada existente
   * @param entry - Entrada con los datos actualizados
   * @returns La entrada actualizada, o undefined si no existe
   */
  async update(entry: Entry): Promise<Entry | undefined> {
    const entries = await this.findAll();
    const index = entries.findIndex((e) => e.id === entry.id);

    if (index === -1) {
      return undefined;
    }

    entries[index] = entry;
    await this.saveAll(entries);
    return entry;
  }

  /**
   * Elimina una entrada por ID
   * @param id - ID de la entrada a eliminar
   * @returns true si se eliminó, false si no existía
   */
  async delete(id: string): Promise<boolean> {
    const entries = await this.findAll();
    const initialLength = entries.length;
    const filtered = entries.filter((entry) => entry.id !== id);

    if (filtered.length === initialLength) {
      return false; // No se encontró la entrada
    }

    await this.saveAll(filtered);
    return true;
  }

  /**
   * Guarda todas las entradas en el archivo JSON
   * (Método privado, solo usado internamente)
   */
  private async saveAll(entries: Entry[]): Promise<void> {
    // Crear directorio data/ si no existe
    const dataDir = path.dirname(ENTRIES_FILE);
    await fs.mkdir(dataDir, { recursive: true });

    // Escribir archivo con formato legible (2 espacios de indentación)
    await fs.writeFile(ENTRIES_FILE, JSON.stringify(entries, null, 2), 'utf-8');
  }
}
