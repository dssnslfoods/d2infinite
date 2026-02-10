'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const switchLocale = (newLocale: 'en' | 'th') => {
    localStorage.setItem('preferred-locale', newLocale);
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/solutions', label: t('solutions') },
    { href: '/case-studies', label: t('caseStudies') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 group-hover:scale-105 transition-transform">
              <Image
                src="/logo-mark.svg"
                alt="D2Infinite"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-xl text-slate-900 ml-1">
              D2Infinite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-cyan-600 bg-cyan-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Language switcher + CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                aria-label="Switch language"
                aria-expanded={langMenuOpen}
                aria-controls="language-menu"
                aria-haspopup="menu"
              >
                <Globe className="w-4 h-4" />
                <span>{locale.toUpperCase()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {langMenuOpen && (
                <div id="language-menu" role="menu" className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-soft-lg border border-slate-100 py-1 z-50">
                  <button
                    type="button"
                    onClick={() => switchLocale('en')}
                    role="menuitemradio"
                    aria-checked={locale === 'en'}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors ${
                      locale === 'en' ? 'text-cyan-600 font-medium' : 'text-slate-600'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => switchLocale('th')}
                    role="menuitemradio"
                    aria-checked={locale === 'th'}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors ${
                      locale === 'th' ? 'text-cyan-600 font-medium' : 'text-slate-600'
                    }`}
                  >
                    ไทย
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-semibold rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
            >
              {t('requestDemo')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-navigation" className="lg:hidden py-4 border-t border-slate-100">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-cyan-600 bg-cyan-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-slate-100" />
              <div className="flex items-center space-x-2 px-4 py-2">
                <span className="text-sm text-slate-500">{locale === 'en' ? 'Language:' : 'ภาษา:'}</span>
                <button
                  type="button"
                  onClick={() => switchLocale('en')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    locale === 'en'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => switchLocale('th')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    locale === 'th'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  TH
                </button>
              </div>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mx-4 mt-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-center font-semibold rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all"
              >
                {t('requestDemo')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
