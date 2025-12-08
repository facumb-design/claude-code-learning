/**
 * Dev Learning Journal - Entry Point
 *
 * Punto de entrada principal de la aplicación.
 * Inicializa el servidor Express con todas las rutas y middleware.
 */

import express, { Express } from 'express';
import path from 'path';
import { EntryRepository, EntryService } from './services';
import { createEntriesRouter } from './api';

/**
 * Puerto del servidor (configurable vía variable de entorno)
 */
const PORT = process.env.PORT || 3000;

/**
 * Crea y configura la aplicación Express
 */
function createApp(): Express {
  const app = express();

  // Middleware para parsear JSON
  app.use(express.json());

  // Middleware para parsear URL-encoded data
  app.use(express.urlencoded({ extended: true }));

  // Servir archivos estáticos desde public/
  const publicPath = path.join(__dirname, '../public');
  app.use(express.static(publicPath));

  // Crear instancias de servicios
  const entryRepository = new EntryRepository();
  const entryService = new EntryService(entryRepository);

  // Registrar rutas API
  app.use('/api/entries', createEntriesRouter(entryService));

  // Ruta de healthcheck
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Dev Learning Journal API',
    });
  });

  // Middleware de manejo de errores 404
  app.use((req, res) => {
    res.status(404).json({
      error: 'Ruta no encontrada',
      path: req.path,
    });
  });

  return app;
}

/**
 * Inicializa y arranca el servidor
 */
function main(): void {
  console.log('🚀 Dev Learning Journal');
  console.log('📓 Tu diario personal de aprendizaje en programación');
  console.log('');

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api/entries`);
    console.log(`🌐 Frontend disponible en http://localhost:${PORT}`);
    console.log('');
    console.log('Presiona Ctrl+C para detener el servidor');
  });
}

// Ejecutar la función principal
main();
