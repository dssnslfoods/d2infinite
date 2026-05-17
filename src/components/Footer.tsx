import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-x">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span className="nav-brand-mark">D2</span>
              <span style={{ fontWeight: 600, fontSize: 18 }}>D2Infinite</span>
            </div>
            <p className="body-text" style={{ maxWidth: 340, fontSize: 14 }}>
              {t('footer.description')}
            </p>
            <p
              style={{
                marginTop: 18,
                color: 'var(--cyan-400)',
                fontSize: 13.5,
                fontStyle: 'italic',
                letterSpacing: '-0.005em',
              }}
            >
              {t('tagline')}
            </p>
          </div>

          <div className="footer-col">
            <h4>{t('footer.navigate')}</h4>
            <ul>
              <li><Link href="/">{nav('home')}</Link></li>
              <li><Link href="/solutions">{nav('solutions')}</Link></li>
              <li><Link href="/case-studies">{nav('caseStudies')}</Link></li>
              <li><Link href="/sample-report">{nav('sampleReport')}</Link></li>
              <li><Link href="/about">{nav('about')}</Link></li>
              <li><Link href="/contact">{nav('contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.solutionsHeading')}</h4>
            <ul>
              <li><Link href="/solutions#infographic">{t('footer.solutions.infographic')}</Link></li>
              <li><Link href="/solutions#realtime">{t('footer.solutions.realtime')}</Link></li>
              <li><Link href="/solutions#platform">{t('footer.solutions.platform')}</Link></li>
              <li><Link href="/solutions#support">{t('footer.solutions.support')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer.contactHeading')}</h4>
            <ul>
              <li>
                <a href="mailto:contact@d2infinite.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={14} /> contact@d2infinite.com
                </a>
              </li>
              <li>
                <a href="tel:+66870783663" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={14} /> +66 870 783 663
                </a>
              </li>
              <li style={{ color: 'var(--text-3)', fontSize: 13.5, lineHeight: 1.5, display: 'flex', gap: 8 }}>
                <MapPin size={14} style={{ flexShrink: 0, marginTop: 3 }} />
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} D2Infinite Co.,Ltd. {t('footer.rights')}</span>
          <span>{t('footer.crafted')}</span>
        </div>
      </div>
    </footer>
  );
}
