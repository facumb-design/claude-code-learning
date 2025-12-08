# CLAUDE.md

## Propósito del repositorio

Este repositorio es un **laboratorio de aprendizaje** donde construimos **Dev Learning Journal**, una aplicación web para registrar y organizar el aprendizaje diario en programación.

Objetivos duales:

1. **Proyecto real**: Crear una app funcional y útil
2. **Aprendizaje**: Practicar Claude Code, agentes, MCP, testing y buenas prácticas

### ¿Qué es Dev Learning Journal?

Una app web que permite:
- Crear entradas diarias sobre lo que aprendes
- Organizar conocimiento por tags
- Buscar en tu historial de aprendizaje
- Exportar notas a Markdown

**Meta**: Aprendes programación mientras construyes una herramienta para documentar tu aprendizaje.

## Tecnologías preferidas

* **Lenguaje**: TypeScript (Node.js)
* **Backend**: Express (API REST sencilla)
* **Frontend**: HTML + CSS + Vanilla TypeScript (sin frameworks pesados)
* **Datos**: JSON files (sin base de datos por ahora)
* **Testing**: Jest
* **Estilo de código**: Claro, explícito, fácil de leer

## Estructura del proyecto

```
src/
├── api/           # Rutas y controladores de Express
├── models/        # Tipos e interfaces TypeScript
├── services/      # Lógica de negocio
└── utils/         # Utilidades compartidas

public/
├── index.html     # Frontend
├── styles/        # CSS
└── js/            # TypeScript compilado para el navegador

tests/             # Tests con Jest
data/              # Archivos JSON con las entradas
agents/            # Agentes especializados de Claude
```

## Estilo de colaboración

Cuando trabajes en este repositorio:

### 1. Explica primero, cambia después

Antes de aplicar cambios, explica qué piensas hacer y por qué.

**Ejemplo**:
- ❌ "Voy a crear el servicio de entradas"
- ✅ "Voy a crear `EntryService` para manejar CRUD de entradas. Lo pongo en `src/services/` porque separa la lógica de negocio de las rutas Express. Usará el repositorio `EntryRepository` para acceder a los datos JSON."

### 2. Pequeños pasos, cambios seguros

Prefiere cambios pequeños, bien explicados, antes que refactors gigantes de golpe.

**Ejemplo de buen flujo**:
1. Crear interfaz `Entry` con tipos básicos
2. Crear `EntryRepository` para leer/escribir JSON
3. Crear `EntryService` con lógica de negocio
4. Crear ruta `/api/entries` en Express
5. Añadir tests para cada capa

### 3. Respeta la intención del proyecto

Este es un **laboratorio de aprendizaje**, no producción.

Prioridades:
- ✅ Código didáctico y bien comentado
- ✅ Explicar decisiones de diseño
- ✅ Patrones simples y claros
- ❌ Optimizaciones prematuras
- ❌ Abstracciones complejas innecesarias
- ❌ Frameworks pesados sin justificación

### 4. Tests y ejemplos

Cuando crees funciones importantes, propone también:

* **Ejemplos de uso** (en comentarios JSDoc o archivos de ejemplo)
* **Tests sugeridos** (unit tests con Jest)
* **Casos edge**: qué pasa con entradas vacías, datos inválidos, etc.

## Qué puedes hacer

* Crear o actualizar archivos en `src/`, `public/`, `tests/`
* Proponer estructura de módulos y carpetas
* Crear APIs REST siguiendo convenciones RESTful
* Añadir tipos TypeScript estrictos
* Escribir tests didácticos
* Mejorar la UI (HTML/CSS) de forma incremental
* Actualizar documentación (README, JSDoc)
* Más adelante: crear un MCP server para integrar con Claude

## Qué evitar

* ❌ No añadir dependencias innecesarias (pregunta primero)
* ❌ No hacer cambios masivos sin explicarlos paso a paso
* ❌ No usar `any` en TypeScript sin justificación
* ❌ No crear abstracciones prematuras ("lo podríamos necesitar")
* ❌ No asumir que esto es producción: prioriza aprendizaje sobre perfección

## Convenciones específicas del proyecto

### Nomenclatura

* **Archivos**: kebab-case (`entry-service.ts`, `api-routes.ts`)
* **Clases**: PascalCase (`EntryService`, `EntryRepository`)
* **Funciones/Variables**: camelCase (`createEntry`, `findById`)
* **Interfaces**: PascalCase con prefijo I opcional (`Entry` o `IEntry`)
* **Constantes**: UPPER_SNAKE_CASE (`MAX_ENTRIES`, `DEFAULT_TAG`)

### Estructura de archivos

* Un concepto principal por archivo
* Agrupar por feature/dominio, no por tipo técnico
* Tests junto al código o en carpeta `tests/` espejo

### Commits

* Mensajes descriptivos en español
* Formato: `Verbo en infinitivo + qué se hizo`
* Ejemplos:
  - ✅ `Crear modelo Entry con tipos básicos`
  - ✅ `Añadir endpoint POST /api/entries`
  - ❌ `cambios`
  - ❌ `fix`

## Flujo de desarrollo recomendado

Para añadir una nueva funcionalidad:

1. **Diseña** con el Agente Arquitecto (planea estructura)
2. **Implementa** en pasos pequeños (una capa a la vez)
3. **Testea** con el Agente Guía de Testing
4. **Documenta** con el Agente Documentador
5. **Revisa** con el Agente Revisor Pedagógico
6. **Itera** según feedback

## Fases del proyecto

### Fase 1 - MVP (Actual)
Crear la base funcional:
- Modelo de datos (Entry)
- CRUD básico (crear, leer entradas)
- API REST mínima
- UI simple (formulario + lista)
- Persistencia en JSON

### Fase 2 - Features Core
Añadir funcionalidad útil:
- Sistema de tags
- Búsqueda y filtros
- Exportar a Markdown
- Mejorar UI/UX

### Fase 3 - Avanzado
Funciones más sofisticadas:
- Estadísticas de aprendizaje
- Gráficos simples
- MCP Server
- Themes (dark mode)

## Recuerda

Este proyecto existe para que **aprendas haciendo**. No tiene que ser perfecto, tiene que ser educativo. Pregunta cuando tengas dudas, explora diferentes soluciones, y sobre todo: **documenta tu aprendizaje en la propia app que estás construyendo** 🚀
