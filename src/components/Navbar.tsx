'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { ArrowRight, Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  const switchLocale = (newLocale: 'en' | 'th') => {
    setOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  const links = [
    { href: '/', label: t('home') },
    { href: '/solutions', label: t('solutions') },
    { href: '/case-studies', label: t('caseStudies') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <div className="nav-wrap">
        <nav className="nav" role="navigation" aria-label="Primary">
          <Link href="/" className="nav-brand">
            <span className="nav-brand-mark">D2</span>
            <span>D2Infinite</span>
          </Link>

          <div className="nav-links hide-md-down">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${isActive(l.href) ? 'active' : ''}`}
                aria-current={isActive(l.href) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="nav-cta-group">
            <button
              type="button"
              className="btn btn-ghost btn-sm hide-md-down"
              onClick={() => switchLocale(locale === 'en' ? 'th' : 'en')}
              aria-label="Toggle language"
            >
              <Globe size={14} /> {locale.toUpperCase()}
            </button>
            <Link href="/contact" className="btn btn-primary btn-sm hide-md-down">
              {t('requestDemo')} <ArrowRight size={14} />
            </Link>
            <button
              type="button"
              className="btn btn-glass btn-sm md:hidden"
              style={{ display: 'none' }}
              aria-hidden
            />
            <button
              type="button"
              className="btn btn-ghost btn-sm mobile-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div id="mobile-nav" ref={sheetRef} className="glass glass-strong nav-sheet" role="dialog" aria-modal="true">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`nav-link ${isActive(l.href) ? 'active' : ''}`}
              style={{ padding: '12px 14px', fontSize: 15 }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 0' }} />
          <div style={{ display: 'flex', gap: 8, padding: '4px 6px' }}>
            <button
              type="button"
              onClick={() => switchLocale('en')}
              className={`btn btn-sm ${locale === 'en' ? 'btn-primary' : 'btn-glass'}`}
              style={{ flex: 1 }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLocale('th')}
              className={`btn btn-sm ${locale === 'th' ? 'btn-primary' : 'btn-glass'}`}
              style={{ flex: 1 }}
            >
              TH
            </button>
          </div>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary"
            style={{ margin: '8px 6px 0' }}
          >
            {t('requestDemo')} <ArrowRight size={14} />
          </Link>
        </div>
      )}

      <style>{`
        .mobile-toggle { display: none; }
        @media (max-width: 860px) {
          .mobile-toggle { display: inline-flex; }
        }
      `}</style>
    </>
  );
}
