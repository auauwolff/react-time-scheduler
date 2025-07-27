# Contributing to React Time Scheduler

Thank you for your interest in contributing to React Time Scheduler! We love your input! We want to make contributing to this project as easy and transparent as possible.

## Ways to Contribute

- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📝 Improving documentation
- 🔧 Submitting bug fixes
- ✨ Adding new features
- 🎨 Improving UI/UX

## Development Setup

### Prerequisites
- Node.js >= 18
- pnpm >= 8 (install with `npm install -g pnpm`)
- Git

### Getting Started

1. **Fork the repository**
   - Go to https://github.com/auauwolff/react-time-scheduler
   - Click the "Fork" button in the top right

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-time-scheduler.git
   cd react-time-scheduler
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/auauwolff/react-time-scheduler.git
   ```

4. **Install dependencies**
   ```bash
   pnpm install
   ```

5. **Start development server**
   ```bash
   pnpm run dev
   ```
   This will open the example app at http://localhost:5173

## Development Workflow

### 1. Create a Feature Branch

```bash
# Get latest changes from upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create your feature branch
git checkout -b feature/amazing-feature
```

### 2. Make Your Changes

- **Write code**: Follow the existing code style
- **Add tests**: If applicable
- **Update types**: Ensure TypeScript types are correct
- **Document**: Update JSDoc comments and README if needed

### 3. Test Your Changes

```bash
# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Build the library
pnpm run build

# Test in the example app
pnpm run dev
```

### 4. Commit Your Changes

We use conventional commits. Please follow this format:

```bash
# Format: <type>(<scope>): <subject>

git commit -m "feat: add time zone selector"
git commit -m "fix: correct event overlap calculation"
git commit -m "docs: update README with new prop"
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, semicolons, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding missing tests
- `chore`: Changes to build process or auxiliary tools

### 5. Push to Your Fork

```bash
git push origin feature/amazing-feature
```

### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill in the PR template:

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] I have tested this in the example app
- [ ] I have added tests (if applicable)
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project style
- [ ] I have updated the documentation
- [ ] I have added proper TypeScript types
- [ ] I have tested my changes
```

## Project Structure

```
react-time-scheduler/
├── src/
│   ├── TimeScheduler.tsx    # Main component
│   └── index.ts            # Package exports
├── examples/
│   └── basic/              # Basic example app
├── docs/                   # Documentation
├── scripts/                # Build and release scripts
└── package.json
```

## Component Guidelines

### Props
- All props should have TypeScript types
- Optional props should have sensible defaults
- Document props with JSDoc comments

### State Management
- Keep state minimal
- Prefer derived state when possible
- Use controlled/uncontrolled pattern appropriately

### Styling
- Use Material-UI components and theme
- Avoid inline styles when possible
- Keep styles customizable through props

## API Design Principles

1. **Flexibility**: Users should be able to customize appearance and behavior
2. **Simplicity**: Common use cases should be simple
3. **Type Safety**: Full TypeScript support
4. **Performance**: Minimize re-renders and optimize for large datasets
5. **Accessibility**: Follow WCAG guidelines

## Testing Guidelines

When adding new features:

1. Test with different data sizes
2. Test with edge cases (empty data, single item, etc.)
3. Test different prop combinations
4. Verify TypeScript types work correctly

## Documentation

- Update README.md for new features
- Add JSDoc comments for new props
- Update examples if needed
- Add to CHANGELOG.md

## Need Help?

- 💬 Open an issue for questions
- 📧 Contact the maintainers
- 🔍 Check existing issues and PRs

## Code of Conduct

Please note we have a code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect differing viewpoints and experiences

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in the README. Thank you for helping make React Time Scheduler better!

---

**Happy Contributing! 🎉**