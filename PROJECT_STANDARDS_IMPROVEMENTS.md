# Project Standards Improvements

This document outlines the improvements made to align with [bulletproof-react project standards](https://raw.githubusercontent.com/alan2207/bulletproof-react/master/docs/project-standards.md).

## ✅ Implemented Improvements

### 1. File Naming Convention Enforcement

- **Added**: `eslint-plugin-check-file` package
- **Configured**: ESLint rules to enforce kebab-case naming for all files
- **Status**: Currently set to `warn` (not `error`) because existing React components use PascalCase
- **Location**: `eslint.config.js`

### 2. Folder Naming Convention Enforcement

- **Configured**: ESLint rules to enforce kebab-case naming for all folders (except `__tests__`)
- **Status**: Currently set to `warn` to allow gradual migration
- **Location**: `eslint.config.js`

### 3. ESLint Configuration Cleanup

- **Removed**: Duplicate `.eslintrc.cjs` file (using flat config format in `eslint.config.js`)
- **Updated**: Lint scripts in `package.json` to use flat config format (removed `--ext` flag)
- **Result**: Single source of truth for ESLint configuration

### 4. TypeScript Path Mapping Simplification

- **Simplified**: `tsconfig.json` paths from multiple specific paths to just `@/*`
- **Rationale**: As recommended by bulletproof-react, using `@/*` is sufficient and cleaner
- **Note**: All imports using `@/components/*`, `@/pages/*`, etc. will still work via `@/*`

## 📋 Current Project Status

### Already Compliant ✅

- ✅ ESLint configured with TypeScript rules
- ✅ Prettier configured with consistent formatting
- ✅ TypeScript with strict mode enabled
- ✅ Husky git hooks set up (pre-commit, pre-push, commit-msg)
- ✅ Absolute imports configured (`@/*`)
- ✅ Import ordering rules enforced

### Needs Attention ⚠️

#### File Naming Convention

The project currently uses **PascalCase** for React components (e.g., `App.tsx`, `ErrorBoundary.tsx`), which conflicts with the kebab-case standard.

**Options:**

1. **Keep current convention** (PascalCase for components) - More common in React community
2. **Migrate to kebab-case** - Aligns with bulletproof-react standard
   - Rename files: `App.tsx` → `app.tsx`, `ErrorBoundary.tsx` → `error-boundary.tsx`
   - Update all imports accordingly

**Recommendation**: If you want to enforce kebab-case strictly, change the rule from `warn` to `error` in `eslint.config.js` and rename existing files.

#### Folder Naming

All folders are already in kebab-case (e.g., `components`, `context`, `lib`), so no changes needed.

## 🔧 Configuration Details

### ESLint File Naming Rules

```javascript
'check-file/filename-naming-convention': [
  'warn', // Change to 'error' to enforce strictly
  {
    '**/*.{ts,tsx}': 'KEBAB_CASE',
  },
  {
    ignoreMiddleExtensions: true, // Supports babel.config.js, smoke.spec.ts
  },
],
```

### ESLint Folder Naming Rules

```javascript
'check-file/folder-naming-convention': [
  'warn', // Change to 'error' to enforce strictly
  {
    'src/**/!(__tests__)': 'KEBAB_CASE',
  },
],
```

## 📚 References

- [bulletproof-react Project Standards](https://raw.githubusercontent.com/alan2207/bulletproof-react/master/docs/project-standards.md)
- [ESLint Plugin Check File](https://github.com/DukeLuo/eslint-plugin-check-file)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)

## 🚀 Next Steps (Optional)

1. **Decide on file naming convention**: Choose between PascalCase (React standard) or kebab-case (bulletproof-react standard)
2. **If choosing kebab-case**:
   - Change ESLint rules from `warn` to `error`
   - Rename all component files to kebab-case
   - Update all imports
3. **If keeping PascalCase**:
   - Consider adding an exception rule for component files in `eslint.config.js`
   - Or remove the file naming convention rule entirely

## 📝 Notes

- The naming convention rules are currently set to `warn` to avoid breaking the build
- All other bulletproof-react standards are already implemented
- The project follows modern React best practices with TypeScript, ESLint, Prettier, and Husky
