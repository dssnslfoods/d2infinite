import { NextRequest } from 'next/server';
import path from 'node:path';
import { renderToBuffer, Font } from '@react-pdf/renderer';
import { createElement } from 'react';
import SalesKitPdf, { type SalesKitContent } from '@/app/[locale]/sample-report/SalesKitPdf';
import enMessages from '../../../../messages/en.json';
import thMessages from '../../../../messages/th.json';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type SystemId = 'esg' | 'smartinventory' | 'catalog';
const SYSTEM_IDS: SystemId[] = ['esg', 'smartinventory', 'catalog'];

// Screenshot manifest per system: pre-downscaled JPEGs in /public/showcase-kit.
const SHOTS: Record<SystemId, { id: string; file: string; ratio: number }[]> = {
  esg: [
    { id: 'login', file: 'esg-login.jpg', ratio: 16 / 10 },
    { id: 'dashboard', file: 'esg-dashboard.jpg', ratio: 16 / 13 },
    { id: 'bigPicture', file: 'esg-bigpicture.jpg', ratio: 16 / 10 },
    { id: 'keyIssues', file: 'esg-key-issues.jpg', ratio: 16 / 33 },
    { id: 'env', file: 'esg-environmental.jpg', ratio: 16 / 32 },
  ],
  smartinventory: [
    { id: 'login', file: 'smartinventory-login.jpg', ratio: 16 / 9 },
    { id: 'dashboard', file: 'smartinventory-dashboard.jpg', ratio: 16 / 21 },
    { id: 'vvMatrix', file: 'smartinventory-vv-matrix.jpg', ratio: 16 / 23 },
    { id: 'fefo', file: 'smartinventory-fefo.jpg', ratio: 16 / 13 },
  ],
  catalog: [
    { id: 'home', file: 'catalog-home.jpg', ratio: 16 / 14 },
    { id: 'listings', file: 'catalog-listings.jpg', ratio: 16 / 23 },
    { id: 'ecatalog', file: 'catalog-ecatalog.jpg', ratio: 16 / 13 },
    { id: 'admin', file: 'catalog-admin.jpg', ratio: 16 / 14 },
  ],
};

let fontsReady = false;
function registerFonts() {
  if (fontsReady) return;
  fontsReady = true;
  const fp = (f: string) => path.join(process.cwd(), 'public', 'fonts', f);
  Font.register({
    family: 'Sans',
    fonts: [
      { src: fp('sans-400.ttf'), fontWeight: 400 },
      { src: fp('sans-600.ttf'), fontWeight: 600 },
      { src: fp('sans-700.ttf'), fontWeight: 700 },
    ],
  });
  Font.register({
    family: 'Thai',
    fonts: [
      { src: fp('noto-thai-400.ttf'), fontWeight: 400 },
      { src: fp('noto-thai-600.ttf'), fontWeight: 600 },
      { src: fp('noto-thai-700.ttf'), fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
}

// Swap glyphs the embedded font can't render (→ becomes ›).
const san = (s: string) => s.replace(/→/g, '›');

function buildContent(locale: 'en' | 'th', view: SystemId): SalesKitContent {
  const m = (locale === 'th' ? thMessages : enMessages) as unknown as Record<
    string,
    Record<string, unknown>
  >;
  const sr = m.sampleReport as Record<string, unknown>;
  const common = m.common as unknown as Record<string, string>;
  const sys = (sr.systems as Record<string, Record<string, unknown>>)[view];
  const labels = sr.labels as Record<string, string>;
  const tabs = sr.tabs as Record<string, string>;
  const pdf = sr.pdf as Record<string, string>;
  const brief = sys.brief as Record<string, string>;
  const outcomes = sys.outcomes as Record<string, string>;
  const features = sys.features as Record<string, string>;
  const shotsT = sys.shots as Record<string, string>;
  const origin = path.join(process.cwd(), 'public', 'showcase-kit');

  return {
    locale,
    systemLabel: tabs[view],
    eyebrow: pdf.eyebrow,
    tagline: san(sys.tagline as string),
    meta: (['client', 'industry', 'scope', 'stack'] as const).map((k) => ({
      label: labels[k],
      value: san(sys[k] as string),
    })),
    brief: { title: brief.title, paragraphs: [san(brief.p1), san(brief.p2)] },
    outcomes: {
      title: outcomes.title,
      items: (['o1', 'o2', 'o3', 'o4'] as const).map((k) => ({
        value: outcomes[`${k}Val`],
        label: outcomes[`${k}Label`],
      })),
    },
    features: {
      title: features.title,
      items: (['f1', 'f2', 'f3', 'f4'] as const).map((k) => ({
        title: san(features[`${k}Title`]),
        desc: san(features[`${k}Desc`]),
      })),
    },
    shots: SHOTS[view].map((shot) => ({
      title: san(shotsT[`${shot.id}Title`]),
      desc: san(shotsT[`${shot.id}Desc`]),
      src: path.join(origin, shot.file),
      ratio: shot.ratio,
    })),
    shotsHeading: pdf.screens,
    note: sr.note as string,
    cta: common.requestDemo,
    contact: {
      email: 'contact@d2infinite.com',
      phone: '+66 870 783 663',
      location: 'Bangkok, Thailand',
      site: 'd2infinite.com',
    },
    generatedLabel: pdf.prepared,
    generatedDate: new Date().toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  };
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const viewParam = params.get('view');
  const localeParam = params.get('locale');
  const view = (SYSTEM_IDS as string[]).includes(viewParam ?? '')
    ? (viewParam as SystemId)
    : 'esg';
  const locale: 'en' | 'th' = localeParam === 'th' ? 'th' : 'en';

  registerFonts();
  const content = buildContent(locale, view);
  const element = createElement(SalesKitPdf, { c: content }) as unknown as Parameters<
    typeof renderToBuffer
  >[0];
  const buffer = await renderToBuffer(element);

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="D2Infinite-${view}-SalesKit.pdf"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
