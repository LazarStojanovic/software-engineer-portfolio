# Base Project React

A production-ready React starter template designed to be forked and used as a foundation for new projects. Comes pre-configured with modern tooling, testing, linting, formatting, and Netlify deployment.

## 🎯 Purpose

This template provides a clean starting point with all the boilerplate setup already done:

- ✅ Modern React 19 with TypeScript
- ✅ Tailwind CSS 4 with design system
- ✅ Reusable UI components (shadcn/ui style)
- ✅ Dark/Light theme support
- ✅ Internationalization (i18n) ready
- ✅ Comprehensive test coverage
- ✅ Linting & formatting enforced
- ✅ Git hooks for code quality
- ✅ CI/CD pipeline for Netlify

**Just fork, customize, and build your features!**

---

## 🛠 Tech Stack

### Core

| Technology    | Version | Purpose      |
| ------------- | ------- | ------------ |
| React         | 19      | UI Framework |
| TypeScript    | 5.9     | Type Safety  |
| Vite          | 7       | Build Tool   |
| Tailwind CSS  | 4       | Styling      |
| React Router  | 7       | Routing      |
| Framer Motion | 12      | Animations   |

### UI Components

| Technology               | Purpose               |
| ------------------------ | --------------------- |
| Radix UI                 | Accessible primitives |
| Lucide React             | Icons                 |
| class-variance-authority | Component variants    |
| tailwind-merge           | Class merging         |

### Forms & Validation

| Technology      | Purpose           |
| --------------- | ----------------- |
| React Hook Form | Form handling     |
| Zod             | Schema validation |

### Internationalization

| Technology                       | Purpose                 |
| -------------------------------- | ----------------------- |
| i18next                          | Translation framework   |
| react-i18next                    | React bindings          |
| i18next-browser-languagedetector | Auto language detection |

### Development Tools

| Tool        | Purpose           |
| ----------- | ----------------- |
| ESLint      | Linting           |
| Prettier    | Code formatting   |
| Husky       | Git hooks         |
| lint-staged | Pre-commit checks |

### Testing

| Tool                  | Purpose               |
| --------------------- | --------------------- |
| Jest                  | Test runner           |
| React Testing Library | Component testing     |
| jest-axe              | Accessibility testing |
| MSW                   | API mocking           |

---

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── ui/              # Base UI primitives (button, card, input, etc.)
│   ├── ErrorBoundary.tsx
│   └── Loading.tsx
├── context/             # React Context providers
│   ├── ThemeContext.tsx # Dark/light mode
│   └── LanguageContext.tsx
├── lib/                 # Utilities
│   ├── i18n.ts         # i18n configuration
│   ├── utils.ts        # Helper functions (cn)
│   └── serviceWorker.ts
├── locales/            # Translation files
│   ├── en/
│   └── sr/
├── pages/              # Route components
│   └── home.tsx
├── test/               # Test setup and utilities
├── types/              # TypeScript definitions
├── __tests__/          # Test files
├── app.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone/fork the repository
git clone https://github.com/YOUR_USERNAME/base-project-react.git
cd base-project-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Build for production     |
| `npm run preview`       | Preview production build |
| `npm run lint`          | Run ESLint               |
| `npm run lint:fix`      | Fix ESLint errors        |
| `npm run format`        | Format with Prettier     |
| `npm run test`          | Run tests                |
| `npm run test:watch`    | Tests in watch mode      |
| `npm run test:coverage` | Generate coverage report |
| `npm run type-check`    | TypeScript checking      |

---

## 🌐 Netlify Deployment

This project is pre-configured for Netlify deployment with CI/CD via GitHub Actions.

### Setup Steps

#### 1. Create Netlify Site

1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repository
4. Netlify will auto-detect settings from `netlify.toml`
5. Click **"Deploy site"**

#### 2. Get Netlify Credentials

You need two values for GitHub Actions:

**NETLIFY_AUTH_TOKEN:**

1. Go to [Netlify User Settings](https://app.netlify.com/user/applications)
2. Under **"Personal access tokens"**, click **"New access token"**
3. Give it a name and create
4. Copy the token

**NETLIFY_SITE_ID:**

1. Go to your Netlify site dashboard
2. Click **"Site configuration"** → **"General"**
3. Copy the **"Site ID"** (looks like `a1b2c3d4-e5f6-...`)

#### 3. Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add two repository secrets:
   - `NETLIFY_AUTH_TOKEN` - Your personal access token
   - `NETLIFY_SITE_ID` - Your site ID

#### 4. CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) will:

1. **On every push/PR:**
   - Run ESLint
   - Check Prettier formatting
   - Run TypeScript check
   - Run tests with coverage
   - Build the project

2. **On push to `main`:**
   - All of the above
   - Deploy to Netlify production

### Netlify Configuration

The `netlify.toml` includes:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js 18
- Security headers (X-Frame-Options, CSP, etc.)
- Cache headers for static assets
- SPA redirect rules (via `public/_redirects`)

---

## 🎨 Included UI Components

Located in `src/components/ui/`:

| Component   | Description                                                |
| ----------- | ---------------------------------------------------------- |
| `button`    | Button with variants (default, destructive, outline, etc.) |
| `card`      | Card container with header, content, footer                |
| `input`     | Text input                                                 |
| `textarea`  | Multi-line input                                           |
| `select`    | Dropdown select                                            |
| `label`     | Form label                                                 |
| `badge`     | Status badges                                              |
| `separator` | Visual divider                                             |
| `form`      | Form components with React Hook Form                       |

---

## 🌙 Features

### Theme Support

Dark/light mode with system preference detection:

```tsx
import { useTheme } from '@/context/ThemeContext';

const { theme, setTheme, isDark } = useTheme();
```

### Internationalization

Ready for multiple languages (English & Serbian included):

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
// Use: t('app.title')
```

Add translations in `src/locales/{lang}/translation.json`

### Utility Function

Tailwind class merging:

```tsx
import { cn } from '@/lib/utils';

<div className={cn('base-class', conditional && 'extra-class')} />;
```

---

## ✅ Quality Checks

### Pre-commit Hooks

Automatically run on every commit:

- ✅ ESLint on `.ts/.tsx` files
- ✅ Prettier formatting
- ✅ TypeScript type checking
- ✅ Build verification

### Pre-push Hooks

Automatically run before pushing:

- ✅ All tests must pass
- ✅ Coverage threshold check (40% minimum)

To skip hooks (not recommended):

```bash
git commit --no-verify
```

---

## 📄 License

MIT

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

The project includes comprehensive test coverage for:

- ✅ All UI components (button, card, input, badge, label, textarea, separator, select, form)
- ✅ Context providers (theme, language)
- ✅ Pages (home)
- ✅ Utilities (utils, service-worker, i18n)
- ✅ Error boundaries
- ✅ Loading components

---

## 🔧 Customization Checklist

When starting a new project from this template:

1. [ ] Update `package.json` name and description
2. [ ] Update `index.html` title and meta tags
3. [ ] Update translations in `src/locales/`
4. [ ] Replace `public/favicon.svg` and `public/logo.svg`
5. [ ] Update `public/sitemap.xml` with your domain
6. [ ] Set up Netlify deployment (see above)
7. [ ] Start building your features!
