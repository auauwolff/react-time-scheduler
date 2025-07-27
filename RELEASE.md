# Release Guide

## Quick Release Process

When you make changes to the package:

### 1. Update version in package.json
```bash
# For patches (bug fixes): 0.1.0 → 0.1.1
# For minor (new features): 0.1.0 → 0.2.0
# For major (breaking changes): 0.1.0 → 1.0.0
```

### 2. Update CHANGELOG.md
Add your changes under a new version section

### 3. Commit and tag
```bash
git add -A
git commit -m "Release v0.1.1: Description of changes"
git tag -a v0.1.1 -m "Version 0.1.1"
git push origin main --tags
```

### 4. Update in projects
```bash
cd ~/Dev/clocker-convex
pnpm update @auauwolff/react-time-scheduler
```

## When to create a new version

- **Always tag** for significant changes
- **Optional** for minor fixes during development
- **Required** when:
  - Adding new features
  - Fixing bugs that affect users
  - Making breaking changes
  - You want to pin a specific version in a project

## Without tags

If you don't tag, `pnpm update` will always get the latest commit from the main branch.