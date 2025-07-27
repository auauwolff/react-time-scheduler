# React Time Scheduler Documentation

This directory contains the documentation website for the React Time Scheduler component.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## From the root directory

You can also run the documentation from the root directory:

```bash
# Start documentation dev server
npm run docs:dev

# Build documentation
npm run docs:build

# Preview documentation build
npm run docs:preview
```

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Structure

- `/src/App.tsx` - Main application with tab navigation
- `/src/components/` - Documentation components
  - `Installation.tsx` - Installation guide
  - `ApiReference.tsx` - API documentation
- `/src/examples/` - Live examples
  - `BasicExample.tsx` - Simple usage
  - `CustomStylingExample.tsx` - Custom styling with render props
  - `InteractiveExample.tsx` - Full CRUD operations
  - `AdvancedExample.tsx` - Advanced features

## Adding Examples

To add a new example:

1. Create a new component in `/src/examples/`
2. Import and add it to the tabs in `App.tsx`
3. Include both live demo and code snippets