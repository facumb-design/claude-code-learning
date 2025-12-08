# Dev Learning Journal 📓

Una aplicación web para registrar y organizar tu aprendizaje diario en programación.

## 🎯 ¿Qué es esto?

**Dev Learning Journal** es un diario personal para desarrolladores que están aprendiendo. Te permite:

- 📝 Crear entradas diarias sobre lo que aprendes
- 🏷️ Organizar conocimientos por tags (TypeScript, Testing, MCP, etc.)
- 🔍 Buscar en tu historial de aprendizaje
- 📤 Exportar tus notas a Markdown

## 💡 Propósito dual

Este proyecto tiene dos objetivos:

1. **App funcional**: Construir una herramienta útil que puedas usar de verdad
2. **Laboratorio de aprendizaje**: Practicar Claude Code, agentes, MCP y buenas prácticas de desarrollo

Es decir: **aprendes programación mientras construyes una app para documentar tu aprendizaje** 🤯

## 🛠️ Stack Tecnológico

- **Lenguaje**: TypeScript (Node.js)
- **Backend**: Express (API REST sencilla)
- **Frontend**: HTML + CSS + Vanilla TypeScript
- **Datos**: JSON files (sin base de datos por ahora)
- **Testing**: Jest
- **Tooling**: Vite para el frontend

## 📁 Estructura del Proyecto

```
claude-code-learning/
├── src/              # Código fuente de la app
├── tests/            # Tests con Jest
├── agents/           # Agentes especializados de Claude
├── public/           # Assets estáticos (HTML, CSS)
├── data/             # Archivos JSON con las entradas
└── docs/             # Documentación
```

## 🤖 Agentes Disponibles

Este proyecto usa agentes especializados para facilitar el desarrollo:

- **Arquitecto del Lab**: Diseña estructura y mantiene buenas prácticas
- **Guía de Testing**: Ayuda a crear tests didácticos
- **Documentador Didáctico**: Crea documentación y ejemplos
- **Revisor Pedagógico**: Code reviews educativas
- **Explorador MCP**: Guía para integrar MCP (futuro)

Ver más en [`agents/`](./agents/)

## 🚀 Roadmap

### Fase 1 - MVP (Actual)
- [ ] Estructura base del proyecto
- [ ] API REST básica (crear, leer entradas)
- [ ] Interfaz web minimalista
- [ ] Persistencia en JSON

### Fase 2 - Features Core
- [ ] Sistema de tags
- [ ] Búsqueda de entradas
- [ ] Exportar a Markdown
- [ ] Mejorar UI/UX

### Fase 3 - Avanzado
- [ ] Estadísticas de aprendizaje
- [ ] MCP Server para que Claude acceda a tus entradas
- [ ] Temas (light/dark mode)
- [ ] Filtros avanzados

## 📚 Aprendizajes en este Lab

Mientras construyes esta app, practicas:

- **TypeScript**: Tipado estricto, interfaces, buenas prácticas
- **Testing**: TDD, mocking, cobertura razonable
- **Arquitectura**: Separación de responsabilidades, APIs REST
- **Claude Code**: Agentes, prompts efectivos, colaboración con IA
- **MCP**: Model Context Protocol (más adelante)

## 🤝 Filosofía de Desarrollo

Lee [`CLAUDE.md`](./CLAUDE.md) para entender cómo trabajamos en este repositorio:

- Cambios pequeños y explicados
- Código didáctico sobre optimizaciones extremas
- Tests y documentación importantes
- Aprendizaje continuo

---

**Estado**: 🏗️ En construcción
**Propósito**: Laboratorio de aprendizaje con un proyecto real
