'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useTranslations, useLocale } from 'next-intl';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  BookOpen,
  Check,
  Copy,
  Download,
  ExternalLink,
  FileDown,
  Filter,
  Globe,
  Heart,
  Layers,
  Leaf,
  Loader2,
  Lock,
  Settings,
  Share2,
  Shield,
  ShoppingBag,
  Sparkles,
  Truck,
  Workflow,
  X,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Eyebrow, Glass, Reveal } from '@/components/ui';
import { Link } from '@/i18n/routing';

type SystemId = 'esg' | 'smartinventory' | 'catalog';

interface SystemDef {
  id: SystemId;
  Icon: ComponentType<{ size?: number }>;
  shots: ShotDef[];
  features: FeatureDef[];
}

interface ShotDef {
  id: string;
  src: string;
  ratio: number;
}

interface FeatureDef {
  id: 'f1' | 'f2' | 'f3' | 'f4';
  Icon: ComponentType<{ size?: number }>;
  tint: '' | 'violet' | 'emerald' | 'amber';
}

const SYSTEMS: Record<SystemId, SystemDef> = {
  esg: {
    id: 'esg',
    Icon: Leaf,
    shots: [
      { id: 'login', src: '/showcase/esg-login.png', ratio: 16 / 10 },
      { id: 'dashboard', src: '/showcase/esg-dashboard.png', ratio: 16 / 13 },
      { id: 'bigPicture', src: '/showcase/esg-bigpicture.png', ratio: 16 / 10 },
      { id: 'keyIssues', src: '/showcase/esg-key-issues.png', ratio: 16 / 33 },
      { id: 'env', src: '/showcase/esg-environmental.png', ratio: 16 / 32 },
    ],
    features: [
      { id: 'f1', Icon: Layers, tint: '' },
      { id: 'f2', Icon: Lock, tint: 'violet' },
      { id: 'f3', Icon: BarChart3, tint: 'emerald' },
      { id: 'f4', Icon: Download, tint: 'amber' },
    ],
  },
  smartinventory: {
    id: 'smartinventory',
    Icon: Boxes,
    shots: [
      { id: 'login', src: '/showcase/smartinventory-login.png', ratio: 16 / 9 },
      { id: 'dashboard', src: '/showcase/smartinventory-dashboard.png', ratio: 16 / 21 },
      { id: 'vvMatrix', src: '/showcase/smartinventory-vv-matrix.png', ratio: 16 / 23 },
      { id: 'fefo', src: '/showcase/smartinventory-fefo.png', ratio: 16 / 13 },
    ],
    features: [
      { id: 'f1', Icon: Filter, tint: 'amber' },
      { id: 'f2', Icon: Workflow, tint: '' },
      { id: 'f3', Icon: Truck, tint: 'emerald' },
      { id: 'f4', Icon: Shield, tint: 'violet' },
    ],
  },
  catalog: {
    id: 'catalog',
    Icon: ShoppingBag,
    shots: [
      { id: 'home', src: '/showcase/catalog-home.png', ratio: 16 / 14 },
      { id: 'listings', src: '/showcase/catalog-listings.png', ratio: 16 / 23 },
      { id: 'ecatalog', src: '/showcase/catalog-ecatalog.png', ratio: 16 / 13 },
      { id: 'admin', src: '/showcase/catalog-admin.png', ratio: 16 / 14 },
    ],
    features: [
      { id: 'f1', Icon: Globe, tint: '' },
      { id: 'f2', Icon: BookOpen, tint: 'violet' },
      { id: 'f3', Icon: Heart, tint: 'emerald' },
      { id: 'f4', Icon: Settings, tint: 'amber' },
    ],
  },
};

const SYSTEM_IDS = Object.keys(SYSTEMS) as SystemId[];
const isSystemId = (v: string | null): v is SystemId =>
  v !== null && (SYSTEM_IDS as string[]).includes(v);

export default function SampleReportClient() {
  const t = useTranslations('sampleReport');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [active, setActive] = useState<SystemId>('esg');
  const [pdfBusy, setPdfBusy] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');

  const sys = SYSTEMS[active];
  const sysT = (key: string) => t(`systems.${active}.${key}`);

  const meta: { key: 'client' | 'industry' | 'scope' | 'stack' }[] = [
    { key: 'client' },
    { key: 'industry' },
    { key: 'scope' },
    { key: 'stack' },
  ];

  // Read the initial tab from the ?view= query param (deep-link support)
  useEffect(() => {
    const view = new URLSearchParams(window.location.search).get('view');
    if (isSystemId(view)) setActive(view);
  }, []);

  // Select a tab and reflect it in the URL without navigating
  const selectTab = (id: SystemId) => {
    setActive(id);
    setCopied(false);
    const url = new URL(window.location.href);
    url.searchParams.set('view', id);
    window.history.replaceState(null, '', url.toString());
  };

  // Open the share dialog: build a deep-link to this tab (using the real
  // current origin so it resolves wherever deployed) + a matching QR code.
  const openShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', active);
    const full = url.toString();
    setShareUrl(full);
    setCopied(false);
    setShareOpen(true);
    QRCode.toDataURL(full, {
      width: 240,
      margin: 1,
      color: { dark: '#0a0f1e', light: '#ffffff' },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(''));
  };

  // Close dialog on Escape
  useEffect(() => {
    if (!shareOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShareOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [shareOpen]);

  const copyLink = async () => {
    let ok = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (!ok) {
      try {
        const ta = document.createElement('textarea');
        ta.value = shareUrl;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Downscale a screenshot to a capped width and re-encode as JPEG so the
  // generated PDF stays light (full-res PNGs would balloon the file to ~8MB).
  const downscaleImage = (url: string, maxW = 1400): Promise<string> =>
    new Promise((resolve) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const scale = Math.min(1, maxW / img.naturalWidth);
        const w = Math.round(img.naturalWidth * scale);
        const h = Math.round(img.naturalHeight * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(url);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        try {
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        } catch {
          resolve(url);
        }
      };
      img.onerror = () => resolve(url);
      img.src = url;
    });

  // Generate + download a designed Sales Kit PDF for the active tab.
  // Heavy deps are dynamically imported so they never hit the initial bundle.
  const downloadSalesKit = async () => {
    if (pdfBusy) return;
    setPdfBusy(true);
    try {
      const [{ pdf }, pdfMod] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./SalesKitPdf'),
      ]);
      const { default: SalesKitPdf, registerPdfFonts } = pdfMod;
      registerPdfFonts();

      // Swap glyphs the embedded PDF font can't render (e.g. the → arrow) for
      // visually-equivalent ones it can (› renders correctly).
      const san = (str: string) => str.replace(/→/g, '›');

      const origin = window.location.origin;
      const sysShots = SYSTEMS[active].shots;

      // Pre-render compressed JPEGs for every screenshot in parallel
      const shotImages = await Promise.all(
        sysShots.map((shot) => downscaleImage(`${origin}${shot.src}`)),
      );

      const content = {
        locale,
        systemLabel: t(`tabs.${active}`),
        eyebrow: t('pdf.eyebrow'),
        tagline: san(sysT('tagline')),
        meta: meta.map((m) => ({ label: t(`labels.${m.key}`), value: san(sysT(m.key)) })),
        brief: {
          title: sysT('brief.title'),
          paragraphs: [san(sysT('brief.p1')), san(sysT('brief.p2'))],
        },
        outcomes: {
          title: sysT('outcomes.title'),
          items: (['o1', 'o2', 'o3', 'o4'] as const).map((k) => ({
            value: sysT(`outcomes.${k}Val`),
            label: sysT(`outcomes.${k}Label`),
          })),
        },
        features: {
          title: sysT('features.title'),
          items: SYSTEMS[active].features.map((f) => ({
            title: san(sysT(`features.${f.id}Title`)),
            desc: san(sysT(`features.${f.id}Desc`)),
          })),
        },
        shots: sysShots.map((shot, i) => ({
          title: san(sysT(`shots.${shot.id}Title`)),
          desc: san(sysT(`shots.${shot.id}Desc`)),
          src: shotImages[i],
          ratio: shot.ratio,
        })),
        shotsHeading: t('pdf.screens'),
        note: t('note'),
        cta: tCommon('requestDemo'),
        contact: {
          email: 'contact@d2infinite.com',
          phone: '+66 870 783 663',
          location: 'Bangkok, Thailand',
          site: 'd2infinite.com',
        },
        generatedLabel: t('pdf.prepared'),
        generatedDate: new Date().toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-GB', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      };

      const blob = await pdf(<SalesKitPdf c={content} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `D2Infinite-${active}-SalesKit.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (err) {
      console.error('Sales kit PDF generation failed', err);
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <>
    <div className="page-enter">
      {/* Hero */}
      <section className="section page-hero" style={{ paddingTop: 160, paddingBottom: 40 }}>
        <div className="container-x">
          <Reveal>
            <div style={{ maxWidth: 920, textAlign: 'center', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex' }}>
                <Eyebrow>{t('eyebrow')}</Eyebrow>
              </div>
              <h1 className="h1" style={{ marginTop: 22 }}>
                {t('headlinePre')} <span className="gradient-text">{t('headlineEm')}</span>
              </h1>
              <p className="lead" style={{ marginTop: 22, maxWidth: 760, margin: '22px auto 0' }}>
                {t('lead')}
              </p>
            </div>
          </Reveal>

          {/* Tab Switcher */}
          <Reveal delay={100}>
            <div
              className="tab-bar"
              role="tablist"
              aria-label="System showcase"
              style={{
                display: 'flex',
                gap: 8,
                padding: 6,
                marginTop: 48,
                maxWidth: 560,
                marginLeft: 'auto',
                marginRight: 'auto',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 999,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {(Object.keys(SYSTEMS) as SystemId[]).map((id) => {
                const isActive = active === id;
                const TabIcon = SYSTEMS[id].Icon;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectTab(id)}
                    className={isActive ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{
                      flex: 1,
                      gap: 8,
                      padding: '10px 18px',
                      fontSize: 13.5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <TabIcon size={14} /> {t(`tabs.${id}`)}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Tagline + Share under tab */}
          <Reveal delay={140}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                marginTop: 22,
              }}
            >
              <p
                className="caption"
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: 'var(--text-3)',
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                {sysT('tagline')}
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={downloadSalesKit}
                  disabled={pdfBusy}
                  aria-busy={pdfBusy}
                  style={pdfBusy ? { opacity: 0.7, cursor: 'wait' } : undefined}
                >
                  {pdfBusy ? (
                    <>
                      <Loader2 size={14} className="spin" /> {t('pdf.preparing')}
                    </>
                  ) : (
                    <>
                      <FileDown size={14} /> {t('pdf.button')}
                    </>
                  )}
                </button>
                <button type="button" className="btn btn-glass btn-sm" onClick={openShare}>
                  <Share2 size={14} /> {t('share.button')}
                </button>
              </div>
            </div>
          </Reveal>

          {/* Meta strip */}
          <Reveal delay={180}>
            <div
              className="meta-grid"
              key={`meta-${active}`}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
                marginTop: 32,
                maxWidth: 1080,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {meta.map((m) => (
                <Glass key={m.key} style={{ padding: 18 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--text-3)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    {t(`labels.${m.key}`)}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      marginTop: 6,
                      color: 'var(--text-1)',
                      lineHeight: 1.4,
                      fontWeight: 500,
                    }}
                  >
                    {sysT(m.key)}
                  </div>
                </Glass>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brief */}
      <section style={{ padding: '40px 0 60px' }} key={`brief-${active}`}>
        <div className="container-x">
          <Reveal>
            <Glass
              strong
              className="glass-xl"
              style={{ padding: 42, borderRadius: 28, maxWidth: 920, margin: '0 auto' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <Sparkles size={18} style={{ color: 'var(--cyan-400)' }} />
                <h2 className="h3" style={{ fontSize: 22, fontWeight: 500 }}>
                  {sysT('brief.title')}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p className="body-text" style={{ fontSize: 15.5, lineHeight: 1.7 }}>
                  {sysT('brief.p1')}
                </p>
                <p className="body-text" style={{ fontSize: 15.5, lineHeight: 1.7 }}>
                  {sysT('brief.p2')}
                </p>
              </div>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* Screenshots */}
      <section style={{ padding: '20px 0 60px' }} key={`shots-${active}`}>
        <div className="container-x">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {sys.shots.map((shot, i) => (
              <Reveal key={`${active}-${shot.id}`}>
                <Glass
                  strong
                  className="glass-xl"
                  style={{ padding: 28, borderRadius: 24, overflow: 'hidden' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 18,
                      flexWrap: 'wrap',
                      gap: 12,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: 12,
                          color: 'var(--cyan-400)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.18)' }}
                      />
                      <h3 style={{ fontSize: 18, fontWeight: 500 }}>
                        {sysT(`shots.${shot.id}Title`)}
                      </h3>
                    </div>
                    <span className="tag">
                      <ExternalLink size={10} /> Live System
                    </span>
                  </div>
                  <p
                    className="body-text"
                    style={{ fontSize: 14.5, marginBottom: 20, maxWidth: 820 }}
                  >
                    {sysT(`shots.${shot.id}Desc`)}
                  </p>
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      borderRadius: 14,
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.08)',
                      background: 'rgba(0, 0, 0, 0.4)',
                      aspectRatio: shot.ratio,
                    }}
                  >
                    <Image
                      src={shot.src}
                      alt={sysT(`shots.${shot.id}Title`)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1240px) 90vw, 1180px"
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                      priority={i === 0}
                    />
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section" key={`outcomes-${active}`}>
        <div className="container-x">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
              <Eyebrow>{sysT('outcomes.title')}</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div
              className="stat-grid-4"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
                maxWidth: 920,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {(['o1', 'o2', 'o3', 'o4'] as const).map((k) => (
                <Glass key={k} style={{ padding: 24, textAlign: 'center' }}>
                  <div
                    className="mono gradient-text"
                    style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}
                  >
                    {sysT(`outcomes.${k}Val`)}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--text-3)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginTop: 8,
                      fontWeight: 500,
                    }}
                  >
                    {sysT(`outcomes.${k}Label`)}
                  </div>
                </Glass>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="section" key={`features-${active}`}>
        <div className="container-x">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 56px' }}>
              <h2 className="h2">{sysT('features.title')}</h2>
            </div>
          </Reveal>
          <div
            className="cap-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}
          >
            {sys.features.map((f) => (
              <Reveal key={`${active}-${f.id}`}>
                <Glass className="card-pad">
                  <div className={`card-icon ${f.tint}`}>
                    <f.Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 500, marginTop: 6 }}>
                    {sysT(`features.${f.id}Title`)}
                  </h3>
                  <p className="body-text" style={{ fontSize: 14 }}>
                    {sysT(`features.${f.id}Desc`)}
                  </p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section style={{ padding: '0 0 60px' }}>
        <div className="container-x">
          <Reveal>
            <Glass
              style={{
                padding: '20px 28px',
                borderRadius: 16,
                maxWidth: 880,
                margin: '0 auto',
                textAlign: 'center',
              }}
            >
              <p
                className="caption"
                style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-3)' }}
              >
                {t('note')}
              </p>
              <Link
                href="/contact"
                className="btn btn-glass btn-sm"
                style={{ marginTop: 14 }}
              >
                {tCommon('requestDemo')} <ArrowRight size={12} />
              </Link>
            </Glass>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes sk-spin { to { transform: rotate(360deg); } }
        .spin { animation: sk-spin 0.9s linear infinite; }
        @media (max-width: 900px) {
          .meta-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cap-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .meta-grid { grid-template-columns: 1fr !important; }
          .cap-grid { grid-template-columns: 1fr !important; }
          .tab-bar { flex-direction: column; border-radius: 18px !important; }
          .tab-bar > button { width: 100%; }
        }
      `}</style>
    </div>

    {/* Share dialog — deep-link + QR for the active tab (rendered OUTSIDE
        page-enter so position:fixed covers the full viewport) */}
    {shareOpen && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('share.title')}
        onClick={() => setShareOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 80,
          display: 'grid',
          placeItems: 'center',
          padding: 20,
          background: 'rgba(2, 6, 18, 0.62)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'page-in 240ms ease both',
        }}
      >
        <div
          className="glass glass-strong"
          onClick={(e) => e.stopPropagation()}
          style={{ padding: 32, borderRadius: 24, maxWidth: 400, width: '100%', position: 'relative' }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setShareOpen(false)}
            className="btn btn-ghost btn-sm"
            style={{ position: 'absolute', top: 14, right: 14, padding: 8 }}
          >
            <X size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <sys.Icon size={18} />
            <h3 style={{ fontSize: 18, fontWeight: 500 }}>{t('share.title')}</h3>
          </div>
          <p className="caption" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 22 }}>
            {t('share.desc')}
          </p>

          {/* QR code */}
          <div style={{ display: 'grid', placeItems: 'center', marginBottom: 20 }}>
            {qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt={t('share.qrAlt')}
                width={200}
                height={200}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 14,
                  background: '#fff',
                  padding: 10,
                  boxShadow: '0 8px 30px -10px rgba(0,0,0,0.5)',
                }}
              />
            ) : (
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--text-3)',
                  fontSize: 12,
                }}
              >
                …
              </div>
            )}
          </div>

          {/* Link + copy */}
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              readOnly
              value={shareUrl}
              onFocus={(e) => e.currentTarget.select()}
              aria-label="Share link"
              style={{
                flex: 1,
                minWidth: 0,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '12px 14px',
                fontSize: 13,
                color: 'var(--text-2)',
                fontFamily: 'var(--font-mono)',
              }}
            />
            <button
              type="button"
              onClick={copyLink}
              className={copied ? 'btn btn-emerald btn-sm' : 'btn btn-primary btn-sm'}
              style={{ flexShrink: 0, padding: '0 16px' }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? t('share.copied') : t('share.copy')}
            </button>
          </div>

          {/* Download from within the dialog too */}
          <button
            type="button"
            className="btn btn-glass btn-sm"
            onClick={downloadSalesKit}
            disabled={pdfBusy}
            aria-busy={pdfBusy}
            style={{ width: '100%', marginTop: 12, ...(pdfBusy ? { opacity: 0.7, cursor: 'wait' } : {}) }}
          >
            {pdfBusy ? (
              <>
                <Loader2 size={14} className="spin" /> {t('pdf.preparing')}
              </>
            ) : (
              <>
                <FileDown size={14} /> {t('pdf.button')}
              </>
            )}
          </button>
        </div>
      </div>
    )}
    </>
  );
}
