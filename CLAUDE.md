# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Time Scheduler is a TypeScript-based React library for resource-based time management and scheduling. It's built as a reusable NPM package using Vite, Material-UI, and date-fns.

## Essential Commands

### Development
- `npm run dev` - Start development server with hot reload
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm run lint` - Run ESLint on all TypeScript files

### Building
- `npm run build` - Build the library for distribution (runs TypeScript + Vite build)
- `npm run preview` - Preview the built library

### Publishing & Release
- `npm run release` - Interactive release script that handles versioning, changelog, and git tagging
- `npm run prepublishOnly` - Automatically runs build before publishing
- Publishing happens to GitHub Package Registry (@auauwolff scope)

### Documentation
- `npm run docs:dev` - Start documentation site in development mode
- `npm run docs:build` - Build documentation site for production
- `npm run docs:preview` - Preview built documentation

### Testing
No test framework is currently configured. When adding tests, update CLAUDE.md with the testing commands.

## Architecture

### Core Library Structure
The library exports a single main component `TimeScheduler` with two required data interfaces:
- `BaseResource` - Represents schedulable resources (employees, rooms, equipment)
- `BaseEvent` - Represents scheduled events/shifts with start/end times

The component is generic and allows extension of these base types for custom implementations.

### Build Configuration
- **Vite Library Mode**: Configured to build ES modules (.mjs) and CommonJS (.js) formats
- **TypeScript**: Strict mode enabled with declaration files generated in dist/
- **External Dependencies**: React, Material-UI, date-fns are peer dependencies not bundled
- **Entry Point**: src/index.ts exports all public APIs

### Key Dependencies
- **UI Framework**: Material-UI v5-7 (peer dependency)
- **Date Handling**: date-fns v2-4 and date-fns-tz for timezone support
- **Styling**: Emotion for CSS-in-JS (required by Material-UI)

### Component Props Architecture
The TimeScheduler component uses a flexible props system with:
- Required props: resources, events, timeSchedulerDate, onEventClick
- Optional customization: Custom renderers for headers, resources, sidebar, footer
- Configuration: Timezone, week start day, dimensions (rowHeight, colWidth)

## Code Conventions

### TypeScript
- Use strict TypeScript with no implicit any
- Generic types extend base interfaces (BaseResource, BaseEvent)
- All exports should have explicit type annotations

### React Patterns
- Functional components with TypeScript generics
- Props interfaces clearly defined with JSDoc comments where helpful
- Material-UI components for all UI elements

### File Organization
- src/TimeScheduler.tsx - Main component implementation
- src/index.ts - Public API exports
- docs/ - Separate Vite app for documentation site
- examples/ - Example implementations

## Development Workflow

When modifying the TimeScheduler component:
1. Make changes in src/TimeScheduler.tsx
2. Run `npm run type-check` to verify TypeScript
3. Run `npm run lint` to check code style
4. Test changes with `npm run dev` 
5. Build with `npm run build` to ensure distribution files generate correctly

When updating documentation:
1. Documentation site is in docs/ directory
2. Examples are in docs/src/examples/
3. Run `npm run docs:dev` to preview changes locally