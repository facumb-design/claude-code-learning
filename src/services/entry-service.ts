/**
 * EntryService
 *
 * Capa de lógica de negocio para gestión de entradas.
 * Usa EntryRepository para persistencia y añade:
 * - Generación de IDs
 * - Manejo de timestamps
 * - Validaciones
 * - Lógica de negocio
 */

import { randomUUID } from 'crypto';
import { Entry, CreateEntryDTO, UpdateEntryDTO, EntryFilters } from '../models';
import { EntryRepository } from './entry-repository';

/**
 * Servicio para operaciones de negocio sobre entradas
 */
export class EntryService {
  private repository: EntryRepository;

  constructor(repository: EntryRepository) {
    this.repository = repository;
  }

  /**
   * Obtiene todas las entradas, ordenadas por fecha de creación (más reciente primero)
   */
  async getAllEntries(): Promise<Entry[]> {
    const entries = await this.repository.findAll();
    // Ordenar por fecha de creación descendente (más reciente primero)
    return entries.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Obtiene una entrada por ID
   * @throws Error si la entrada no existe
   */
  async getEntryById(id: string): Promise<Entry> {
    const entry = await this.repository.findById(id);
    if (!entry) {
      throw new Error(`Entrada con id ${id} no encontrada`);
    }
    return entry;
  }

  /**
   * Busca entradas aplicando filtros
   */
  async searchEntries(filters: EntryFilters): Promise<Entry[]> {
    const entries = await this.repository.findByFilters(filters);
    // Ordenar por fecha de creación descendente
    return entries.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Crea una nueva entrada
   * Genera automáticamente: id, createdAt, updatedAt
   */
  async createEntry(dto: CreateEntryDTO): Promise<Entry> {
    // Validar datos de entrada
    this.validateCreateDTO(dto);

    // Crear entrada con campos autogenerados
    const now = new Date().toISOString();
    const entry: Entry = {
      id: randomUUID(),
      title: dto.title.trim(),
      content: dto.content.trim(),
      codeSnippet: dto.codeSnippet?.trim(),
      tags: dto.tags.map((tag) => tag.trim()),
      createdAt: now,
      updatedAt: now,
    };

    return await this.repository.create(entry);
  }

  /**
   * Actualiza una entrada existente
   * Actualiza automáticamente: updatedAt
   * @throws Error si la entrada no existe
   */
  async updateEntry(dto: UpdateEntryDTO): Promise<Entry> {
    // Validar que la entrada existe
    const existing = await this.repository.findById(dto.id);
    if (!existing) {
      throw new Error(`Entrada con id ${dto.id} no encontrada`);
    }

    // Validar datos de actualización
    this.validateUpdateDTO(dto);

    // Crear entrada actualizada (merge de existing + dto)
    const updated: Entry = {
      ...existing,
      title: dto.title?.trim() ?? existing.title,
      content: dto.content?.trim() ?? existing.content,
      codeSnippet: dto.codeSnippet?.trim() ?? existing.codeSnippet,
      tags: dto.tags?.map((tag) => tag.trim()) ?? existing.tags,
      updatedAt: new Date().toISOString(),
    };

    const result = await this.repository.update(updated);
    if (!result) {
      throw new Error('Error al actualizar la entrada');
    }

    return result;
  }

  /**
   * Elimina una entrada
   * @throws Error si la entrada no existe
   */
  async deleteEntry(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new Error(`Entrada con id ${id} no encontrada`);
    }
  }

  /**
   * Obtiene todos los tags únicos usados en las entradas
   * Útil para autocompletado y filtros
   */
  async getAllTags(): Promise<string[]> {
    const entries = await this.repository.findAll();
    const tagsSet = new Set<string>();

    entries.forEach((entry) => {
      entry.tags.forEach((tag) => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
  }

  /**
   * Valida los datos para crear una entrada
   * @throws Error si los datos son inválidos
   */
  private validateCreateDTO(dto: CreateEntryDTO): void {
    if (!dto.title || dto.title.trim().length === 0) {
      throw new Error('El título es obligatorio');
    }

    if (dto.title.trim().length > 200) {
      throw new Error('El título no puede tener más de 200 caracteres');
    }

    if (!dto.content || dto.content.trim().length === 0) {
      throw new Error('El contenido es obligatorio');
    }

    if (!dto.tags || dto.tags.length === 0) {
      throw new Error('Debe incluir al menos un tag');
    }

    // Validar que los tags no estén vacíos
    const hasEmptyTag = dto.tags.some((tag) => tag.trim().length === 0);
    if (hasEmptyTag) {
      throw new Error('Los tags no pueden estar vacíos');
    }
  }

  /**
   * Valida los datos para actualizar una entrada
   * @throws Error si los datos son inválidos
   */
  private validateUpdateDTO(dto: UpdateEntryDTO): void {
    if (dto.title !== undefined) {
      if (dto.title.trim().length === 0) {
        throw new Error('El título no puede estar vacío');
      }
      if (dto.title.trim().length > 200) {
        throw new Error('El título no puede tener más de 200 caracteres');
      }
    }

    if (dto.content !== undefined && dto.content.trim().length === 0) {
      throw new Error('El contenido no puede estar vacío');
    }

    if (dto.tags !== undefined) {
      if (dto.tags.length === 0) {
        throw new Error('Debe incluir al menos un tag');
      }
      const hasEmptyTag = dto.tags.some((tag) => tag.trim().length === 0);
      if (hasEmptyTag) {
        throw new Error('Los tags no pueden estar vacíos');
      }
    }
  }
}
