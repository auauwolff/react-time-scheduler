#!/bin/bash

# Release Script for react-time-scheduler

echo "🚀 React Time Scheduler Release Script"
echo "======================================"

# Check if working directory is clean
if [[ -n $(git status -s) ]]; then
    echo "❌ Error: Working directory is not clean. Please commit or stash changes."
    exit 1
fi

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# Ask for new version
echo ""
echo "What type of release is this?"
echo "1) Patch (bug fixes) - X.X.+1"
echo "2) Minor (new features) - X.+1.0"
echo "3) Major (breaking changes) - +1.0.0"
echo "4) Custom version"
read -p "Select option (1-4): " RELEASE_TYPE

case $RELEASE_TYPE in
    1)
        NEW_VERSION=$(npm version patch --no-git-tag-version)
        ;;
    2)
        NEW_VERSION=$(npm version minor --no-git-tag-version)
        ;;
    3)
        NEW_VERSION=$(npm version major --no-git-tag-version)
        ;;
    4)
        read -p "Enter new version: " NEW_VERSION
        npm version $NEW_VERSION --no-git-tag-version
        NEW_VERSION="v$NEW_VERSION"
        ;;
    *)
        echo "Invalid option"
        exit 1
        ;;
esac

echo ""
echo "New version: $NEW_VERSION"

# Ask for changelog entry
echo ""
echo "Enter a brief description of changes for CHANGELOG.md:"
read -p "> " CHANGELOG_ENTRY

# Update CHANGELOG.md
DATE=$(date +%Y-%m-%d)
CHANGELOG_CONTENT="## [$NEW_VERSION] - $DATE

### Changed
- $CHANGELOG_ENTRY

$(cat CHANGELOG.md | sed '1,/^## /d')"

echo -e "# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n$CHANGELOG_CONTENT" > CHANGELOG.md

# Commit changes
echo ""
echo "📝 Committing changes..."
git add package.json CHANGELOG.md
git commit -m "Release $NEW_VERSION: $CHANGELOG_ENTRY"

# Create tag
echo "🏷️  Creating tag..."
git tag -a $NEW_VERSION -m "Version $NEW_VERSION: $CHANGELOG_ENTRY"

# Push
echo ""
echo "Ready to push to GitHub!"
echo "Run the following commands:"
echo ""
echo "  git push origin main"
echo "  git push origin $NEW_VERSION"
echo ""
echo "Then update in your projects:"
echo "  cd ~/Dev/clocker-convex"
echo "  pnpm update @auauwolff/react-time-scheduler"
echo ""
echo "✅ Release prepared successfully!"