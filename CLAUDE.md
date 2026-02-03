# CLAUDE.md - AI Assistant Guide for D2Infinite

This document provides essential context for AI assistants working on the D2Infinite corporate website codebase.

## Project Overview

D2Infinite is a **bilingual corporate website** for D2Infinite Co.,Ltd., a data analytics and decision-support platform company based in Bangkok, Thailand. The site supports English (`en`) and Thai (`th`) locales with full internationalization.

**Tagline**: "Infinity in Data. Clarity in Decisions."

## Quick Reference

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Build & Production
npm run build        # Create production build
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework (App Router) |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety (strict mode) |
| TailwindCSS | ^4 | Utility-first CSS |
| next-intl | ^4.8.2 | Internationalization |
| lucide-react | ^0.563.0 | Icon library |

**Minimum Node.js**: 18.17 or later

## Project Structure

```
d2infinite/
├── messages/                 # i18n translation files
│   ├── en.json              # English translations
│   └── th.json              # Thai translations (must mirror en.json structure)
├── public/                   # Static assets (SVGs, favicon)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── [locale]/        # Locale-specific pages
│   │   │   ├── about/
│   │   │   ├── case-studies/
│   │   │   ├── contact/
│   │   │   ├── solutions/
│   │   │   ├── layout.tsx   # Locale layout with metadata
│   │   │   └── page.tsx     # Home page
│   │   ├── globals.css      # Global styles & theme variables
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Root redirect to /en
│   ├── components/
│   │   ├── home/            # Home page section components
│   │   ├── ui/              # Reusable UI components
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── i18n/
│   │   ├── request.ts       # Server-side i18n config
│   │   └── routing.ts       # Locale routing config
│   └── middleware.ts        # Locale detection middleware
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Key Conventions

### Component Patterns

1. **Server Components** (default): Used for pages and sections that don't need interactivity
   ```tsx
   // src/app/[locale]/page.tsx
   export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
     const { locale } = await params;
     // ...
   }
   ```

2. **Client Components**: Use `'use client'` directive for interactivity
   ```tsx
   'use client';
   // For components with useState, useEffect, event handlers
   ```

3. **Barrel Exports**: Use `index.ts` files for clean imports
   ```tsx
   // src/components/ui/index.ts
   export { Button } from './Button';
   export { Card } from './Card';
   ```

### Internationalization (i18n)

**Supported Locales**: `['en', 'th']` (English default)

**URL Pattern**: Always prefixed - `/en/about`, `/th/about`

**In Server Components**:
```tsx
import { getTranslations } from 'next-intl/server';

const t = await getTranslations('sectionKey');
return <h1>{t('title')}</h1>;
```

**In Client Components**:
```tsx
import { useTranslations, useLocale } from 'next-intl';

const t = useTranslations('sectionKey');
const locale = useLocale();
```

**Adding Translations**: Add keys to both `messages/en.json` AND `messages/th.json` with identical structure.

**Navigation with Locale**:
```tsx
import { Link } from '@/i18n/routing';
<Link href="/solutions">Solutions</Link> // Auto-prefixes locale
```

### Styling Conventions

- **Utility-first**: Use TailwindCSS classes exclusively
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:`, `xl:` breakpoints
- **Custom utilities** (defined in `globals.css`):
  - `.animated-gradient` - Animated gradient background
  - `.grid-pattern` - Background grid pattern
  - `.glass-card` - Glassmorphism effect
  - `.shadow-soft` / `.shadow-soft-lg` - Soft shadow effects
  - `.font-thai` - Thai font family

**Theme Colors** (TailwindCSS):
- Primary dark: `slate-900` (#0f172a)
- Accent: `cyan-500` (#06b6d4)
- Text: `slate-50`, `slate-100`, `slate-300`, `slate-400`

### TypeScript Conventions

- **Strict mode** enabled
- **Path alias**: Use `@/*` for imports from `src/`
  ```tsx
  import { Button } from '@/components/ui';
  ```
- **Props interfaces**: Define explicitly
  ```tsx
  interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
  }
  ```

### File Naming

- **Pages**: `page.tsx` (Next.js App Router convention)
- **Layouts**: `layout.tsx`
- **Components**: PascalCase (`HeroSection.tsx`, `Button.tsx`)
- **Client Components**: Can use suffix pattern (`ContactForm.tsx`, `CaseStudiesClient.tsx`)

## Pages Overview

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Redirects to `/en` |
| `/[locale]` | `src/app/[locale]/page.tsx` | Home page |
| `/[locale]/solutions` | `src/app/[locale]/solutions/page.tsx` | Solutions showcase |
| `/[locale]/case-studies` | `src/app/[locale]/case-studies/page.tsx` | Filterable case studies |
| `/[locale]/about` | `src/app/[locale]/about/page.tsx` | Company info |
| `/[locale]/contact` | `src/app/[locale]/contact/page.tsx` | Contact form |

## Development Workflow

### Adding a New Page

1. Create directory in `src/app/[locale]/your-page/`
2. Add `page.tsx` with async params handling
3. Add translation keys to both `messages/en.json` and `messages/th.json`
4. Update `Navbar.tsx` if navigation link needed

### Adding a New Component

1. **Reusable UI**: Add to `src/components/ui/`
2. **Page-specific**: Add to appropriate directory (e.g., `src/components/home/`)
3. Export via barrel file (`index.ts`)

### Adding Translations

1. Add to `messages/en.json`:
   ```json
   "newSection": {
     "title": "English Title",
     "description": "English description"
   }
   ```
2. Mirror structure in `messages/th.json`:
   ```json
   "newSection": {
     "title": "Thai Title",
     "description": "Thai description"
   }
   ```

## Deployment

**Platform**: Vercel (optimized for Next.js)

**Key Configuration**:
- Root path (`/`) redirects to `/en`
- Middleware handles locale detection
- Static generation with `generateStaticParams()` for locales

## Common Patterns

### Form Validation (Contact Page)
```tsx
const [errors, setErrors] = useState<Record<string, string>>({});

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Generating Static Params for Locales
```tsx
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'th' }];
}
```

### Metadata Generation per Locale
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}
```

## Important Notes

1. **No testing framework** is currently configured - manual testing is used
2. **ESLint** is the primary code quality tool
3. **Both translation files must stay in sync** - same structure, different content
4. **Icons**: Import from `lucide-react` (e.g., `import { ArrowRight } from 'lucide-react'`)
5. **Fonts**: Inter (English), Noto Sans Thai (Thai) - loaded via Google Fonts

## Company Information

- **Company**: D2Infinite Co.,Ltd.
- **Email**: contact@d2infinite.com
- **Phone**: +66 870 783 663
- **Location**: Bangkok, Thailand

---

*Last updated: February 2026*
