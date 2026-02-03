# D2Infinite Corporate Website

A modern, professional bilingual corporate website for D2Infinite Co.,Ltd. Built with Next.js 16, TypeScript, TailwindCSS, and next-intl for internationalization.

## Features

- **Bilingual Support**: Full English and Thai localization with locale-prefixed routes (`/en`, `/th`)
- **Modern Design**: Clean, high-contrast design with subtle gradients, glassy cards, and strong typography
- **Responsive**: Mobile-first design, optimized for all screen sizes
- **Accessible**: Semantic HTML, good contrast ratios, keyboard navigation support
- **SEO Optimized**: Per-locale metadata, Open Graph tags, hreflang alternate links, JSON-LD structured data
- **Performance**: Static generation, minimal dependencies, optimized fonts

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **i18n**: next-intl
- **Icons**: lucide-react

## Pages

| Route | Description |
|-------|-------------|
| `/{locale}` | Home page with hero, services, solutions, testimonials |
| `/{locale}/solutions` | Detailed solutions offerings |
| `/{locale}/case-studies` | Case studies with filtering by industry |
| `/{locale}/about` | Company story, values, and team |
| `/{locale}/contact` | Contact form and company information |

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd d2infinite

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The site will redirect to `/en` by default.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
d2infinite/
├── messages/
│   ├── en.json          # English translations
│   └── th.json          # Thai translations
├── public/              # Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/    # Locale-specific pages
│   │   │   ├── about/
│   │   │   ├── case-studies/
│   │   │   ├── contact/
│   │   │   ├── solutions/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── home/        # Home page sections
│   │   ├── ui/          # Reusable UI components
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── i18n/
│   │   ├── request.ts   # next-intl request config
│   │   └── routing.ts   # Routing configuration
│   ├── lib/             # Utility functions
│   └── middleware.ts    # Locale detection middleware
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Company Contact Information

- **Company**: D2Infinite Co.,Ltd.
- **Email**: contact@d2infinite.com
- **Phone**: +66 870 783 663
- **Address (EN)**: 422/147 Panya Indra Rd., Samwa-Tawantok, Khet Klong Samwa, Bangkok 10510, Thailand
- **Address (TH)**: 422/147 ถนนปัญญาอินทรา แขวงสามวาตะวันตก เขตคลองสามวา กรุงเทพมหานคร 10510 ประเทศไทย

## Brand Guidelines

- **Tagline (EN)**: "Infinity in Data. Clarity in Decisions."
- **Tagline (TH)**: "อินไซต์ไม่สิ้นสุด เพื่อการตัดสินใจที่ชัดเจน"
- **Colors**: Deep navy/charcoal (`#0f172a`) + Electric cyan accent (`#06b6d4`)
- **Fonts**: Inter (English), Noto Sans Thai (Thai)

## License

Proprietary - D2Infinite Co.,Ltd.
