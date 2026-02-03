'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: tNav('home') },
    { href: '/solutions', label: tNav('solutions') },
    { href: '/case-studies', label: tNav('caseStudies') },
    { href: '/about', label: tNav('about') },
    { href: '/contact', label: tNav('contact') },
  ];

  const address = locale === 'th'
    ? '422/147 ถนนปัญญาอินทรา แขวงสามวาตะวันตก เขตคลองสามวา กรุงเทพมหานคร 10510 ประเทศไทย'
    : '422/147 Panya Indra Rd., Samwa-Tawantok, Khet Klong Samwa, Bangkok 10510, Thailand';

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D2</span>
              </div>
              <span className="font-bold text-xl text-white">D2Infinite</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4 max-w-md">
              {t('description')}
            </p>
            <p className="text-cyan-400 font-medium text-sm italic">
              {locale === 'th'
                ? 'อินไซต์ไม่สิ้นสุด เพื่อการตัดสินใจที่ชัดเจน'
                : 'Infinity in Data. Clarity in Decisions.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t('contact')}</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@d2infinite.com"
                  className="flex items-start space-x-3 text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-500" />
                  <span className="text-sm">contact@d2infinite.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+66870783663"
                  className="flex items-start space-x-3 text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-500" />
                  <span className="text-sm">+66 870 783 663</span>
                </a>
              </li>
              <li className="flex items-start space-x-3 text-slate-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-cyan-500" />
                <span className="text-sm leading-relaxed">{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">
              {t('copyright', { year: currentYear })}
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-slate-600 text-xs">
                D2Infinite Co.,Ltd.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
