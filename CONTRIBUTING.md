# Contributing to React Time Scheduler

Thank you for your interest in contributing to React Time Scheduler!

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```

## Making Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and ensure:
   - Code follows the existing style
   - TypeScript types are properly defined
   - No TypeScript errors: `pnpm run type-check`
   - No linting errors: `pnpm run lint`

3. Test your changes:
   - Run the example to ensure it works
   - Test with different configurations

4. Update documentation if needed

## Submitting Changes

1. Commit your changes with a clear message:
   ```bash
   git commit -m "feat: add new feature"
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Create a Pull Request with:
   - Clear description of changes
   - Any breaking changes noted
   - Screenshots if UI changes

## Code Style

- Use TypeScript for all code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Keep components focused and reusable

## Questions?

Feel free to open an issue for any questions!