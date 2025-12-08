/**
 * Rutas API REST para entradas del diario
 *
 * Endpoints:
 * - GET    /api/entries       - Listar todas las entradas (con filtros opcionales)
 * - GET    /api/entries/:id   - Obtener una entrada por ID
 * - POST   /api/entries       - Crear nueva entrada
 * - PUT    /api/entries/:id   - Actualizar entrada
 * - DELETE /api/entries/:id   - Eliminar entrada
 * - GET    /api/entries/tags  - Obtener todos los tags únicos
 */

import { Router, Request, Response } from 'express';
import { EntryService } from '../services';
import { CreateEntryDTO, UpdateEntryDTO, EntryFilters } from '../models';

/**
 * Crea el router con todas las rutas de entries
 * @param entryService - Servicio de entradas
 */
export function createEntriesRouter(entryService: EntryService): Router {
  const router = Router();

  /**
   * GET /api/entries/tags
   * Obtiene todos los tags únicos
   */
  router.get('/tags', async (_req: Request, res: Response) => {
    try {
      const tags = await entryService.getAllTags();
      res.json({ tags });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener tags',
        message: (error as Error).message,
      });
    }
  });

  /**
   * GET /api/entries
   * Lista todas las entradas (con filtros opcionales)
   * Query params: search, tags[], dateFrom, dateTo
   */
  router.get('/', async (req: Request, res: Response) => {
    try {
      const filters: EntryFilters = {
        search: req.query.search as string | undefined,
        tags: req.query.tags
          ? Array.isArray(req.query.tags)
            ? (req.query.tags as string[])
            : [req.query.tags as string]
          : undefined,
        dateFrom: req.query.dateFrom as string | undefined,
        dateTo: req.query.dateTo as string | undefined,
      };

      // Si no hay filtros, obtener todas las entradas
      const hasFilters = Object.values(filters).some((val) => val !== undefined);
      const entries = hasFilters
        ? await entryService.searchEntries(filters)
        : await entryService.getAllEntries();

      res.json({ entries, count: entries.length });
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener entradas',
        message: (error as Error).message,
      });
    }
  });

  /**
   * GET /api/entries/:id
   * Obtiene una entrada por ID
   */
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const entry = await entryService.getEntryById(req.params.id);
      res.json(entry);
    } catch (error) {
      res.status(404).json({
        error: 'Entrada no encontrada',
        message: (error as Error).message,
      });
    }
  });

  /**
   * POST /api/entries
   * Crea una nueva entrada
   */
  router.post('/', async (req: Request, res: Response) => {
    try {
      const dto: CreateEntryDTO = req.body;
      const entry = await entryService.createEntry(dto);
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({
        error: 'Error al crear entrada',
        message: (error as Error).message,
      });
    }
  });

  /**
   * PUT /api/entries/:id
   * Actualiza una entrada existente
   */
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const dto: UpdateEntryDTO = {
        ...req.body,
        id: req.params.id,
      };
      const entry = await entryService.updateEntry(dto);
      res.json(entry);
    } catch (error) {
      const statusCode = (error as Error).message.includes('no encontrada') ? 404 : 400;
      res.status(statusCode).json({
        error: 'Error al actualizar entrada',
        message: (error as Error).message,
      });
    }
  });

  /**
   * DELETE /api/entries/:id
   * Elimina una entrada
   */
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      await entryService.deleteEntry(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({
        error: 'Error al eliminar entrada',
        message: (error as Error).message,
      });
    }
  });

  return router;
}
