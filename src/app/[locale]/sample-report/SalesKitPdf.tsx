'use client';

import {
  Document,
  Page,
  View,
  Text,
  Image,
  Svg,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

/* ------------------------------------------------------------------ *
 * Fonts (served from /public/fonts — same origin, fetched at runtime)
 * Latin → Noto Sans · Thai → Noto Sans Thai
 * ------------------------------------------------------------------ */
let fontsRegistered = false;
export function registerPdfFonts() {
  if (fontsRegistered) return;
  fontsRegistered = true;
  Font.register({
    family: 'Sans',
    fonts: [
      { src: '/fonts/sans-400.ttf', fontWeight: 400 },
      { src: '/fonts/sans-600.ttf', fontWeight: 600 },
      { src: '/fonts/sans-700.ttf', fontWeight: 700 },
    ],
  });
  Font.register({
    family: 'Thai',
    fonts: [
      { src: '/fonts/noto-thai-400.ttf', fontWeight: 400 },
      { src: '/fonts/noto-thai-600.ttf', fontWeight: 600 },
      { src: '/fonts/noto-thai-700.ttf', fontWeight: 700 },
    ],
  });
  // Keep words whole — no hyphenation. Thai body copy wraps on its existing
  // spaces; the cover tagline is sized to fit on its own line.
  Font.registerHyphenationCallback((word) => [word]);
}

/* ------------------------------------------------------------------ *
 * Content contract — fully-resolved strings passed from the client
 * ------------------------------------------------------------------ */
export interface SalesKitShot {
  title: string;
  desc: string;
  src: string; // absolute URL
  ratio: number;
}
export interface SalesKitContent {
  locale: string;
  systemLabel: string; // tab label, e.g. "ESG Smart Performance"
  eyebrow: string; // "Sales Kit" / "Sample Report"
  tagline: string;
  meta: { label: string; value: string }[];
  brief: { title: string; paragraphs: string[] };
  outcomes: { title: string; items: { value: string; label: string }[] };
  features: { title: string; items: { title: string; desc: string }[] };
  shots: SalesKitShot[];
  shotsHeading: string;
  note: string;
  cta: string;
  contact: { email: string; phone: string; location: string; site: string };
  generatedLabel: string; // "Prepared" / "จัดทำเมื่อ"
  generatedDate: string;
}

/* ------------------------------------------------------------------ *
 * Palette
 * ------------------------------------------------------------------ */
const C = {
  ink: '#0f172a',
  inkSoft: '#334155',
  muted: '#64748b',
  faint: '#94a3b8',
  line: '#e2e8f0',
  card: '#f8fafc',
  white: '#ffffff',
  cyan: '#06b6d4',
  cyanDeep: '#0891b2',
  cyanBright: '#22d3ee',
  coverTop: '#0b1120',
  coverBottom: '#0f1e34',
};

export default function SalesKitPdf({ c }: { c: SalesKitContent }) {
  const isThai = c.locale === 'th';
  const ff = isThai ? 'Thai' : 'Sans';
  const s = makeStyles(ff, isThai);

  return (
    <Document
      title={`${c.systemLabel} — D2Infinite Sales Kit`}
      author="D2Infinite Co.,Ltd."
      subject={c.tagline}
    >
      {/* ============================ COVER (dark, liquid glass) ============================ */}
      <Page size="A4" style={s.coverPage}>
        {/* gradient + glow background */}
        <View style={s.bgFill} fixed>
          <Svg width="595" height="842" viewBox="0 0 595 842">
            <Defs>
              <LinearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={C.coverTop} />
                <Stop offset="1" stopColor={C.coverBottom} />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="595" height="842" fill="url(#bg)" />
            <Circle cx="500" cy="120" r="190" fill={C.cyan} opacity={0.16} />
            <Circle cx="80" cy="720" r="220" fill={C.cyanDeep} opacity={0.13} />
            <Circle cx="540" cy="640" r="120" fill={C.cyanBright} opacity={0.1} />
          </Svg>
        </View>

        <View style={s.coverInner}>
          {/* brand row */}
          <View style={s.brandRow}>
            <View style={s.logoMark}>
              <Text style={s.logoText}>D2</Text>
            </View>
            <Text style={s.brandName}>D2Infinite</Text>
          </View>

          {/* eyebrow + title */}
          <View style={{ marginTop: 'auto' }}>
            <View style={s.coverPill}>
              <Text style={s.coverPillText}>{c.eyebrow}</Text>
            </View>
            <Text style={s.coverSystem}>{c.systemLabel}</Text>
            <Text style={s.coverTagline}>{c.tagline}</Text>
            <View style={s.accentBar} />
          </View>

          {/* meta grid */}
          <View style={s.coverMetaGrid}>
            {c.meta.map((m, i) => (
              <View key={i} style={s.coverMetaCell}>
                <Text style={s.coverMetaLabel}>{m.label.toUpperCase()}</Text>
                <Text style={s.coverMetaValue}>{m.value}</Text>
              </View>
            ))}
          </View>

          {/* footer */}
          <View style={s.coverFooter}>
            <Text style={s.coverFooterMuted}>
              {c.generatedLabel} {c.generatedDate}
            </Text>
            <Text style={s.coverFooterMuted}>{c.contact.site}</Text>
          </View>
        </View>
      </Page>

      {/* ============================ CONTENT (light) ============================ */}
      <Page size="A4" style={s.page}>
        <PageHeader s={s} c={c} />

        {/* Brief */}
        <Section s={s} kicker="01" title={c.brief.title}>
          {c.brief.paragraphs.map((p, i) => (
            <Text key={i} style={s.body}>
              {p}
            </Text>
          ))}
        </Section>

        {/* Outcomes */}
        <Section s={s} kicker="02" title={c.outcomes.title}>
          <View style={s.statRow}>
            {c.outcomes.items.map((o, i) => (
              <View key={i} style={s.statCard}>
                <Text style={s.statVal}>{o.value}</Text>
                <Text style={s.statLabel}>{o.label.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Features */}
        <Section s={s} kicker="03" title={c.features.title}>
          <View style={s.featGrid}>
            {c.features.items.map((f, i) => (
              <View key={i} style={s.featCard} wrap={false}>
                <View style={s.featNum}>
                  <Text style={s.featNumText}>{i + 1}</Text>
                </View>
                <Text style={s.featTitle}>{f.title}</Text>
                <Text style={s.featDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        </Section>

        <PageFooter s={s} c={c} />
      </Page>

      {/* ============================ SCREENSHOTS (light) ============================ */}
      <Page size="A4" style={s.page}>
        <PageHeader s={s} c={c} />
        <Section s={s} kicker="04" title={c.shotsHeading}>
          {c.shots.map((shot, i) => {
            // content width on A4 light page ≈ 595 − 46*2 − 2(border) ≈ 501pt
            const frameW = 501;
            const frameH = Math.min(Math.round(frameW / shot.ratio), 300);
            return (
              <View key={i} style={s.shotBlock} wrap={false}>
                <View style={s.shotHead}>
                  <Text style={s.shotIdx}>{String(i + 1).padStart(2, '0')}</Text>
                  <Text style={s.shotTitle}>{shot.title}</Text>
                </View>
                <Text style={s.shotDesc}>{shot.desc}</Text>
                <View style={[s.shotFrame, { height: frameH }]}>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image src={shot.src} style={s.shotImg} />
                </View>
              </View>
            );
          })}
          <Text style={s.note}>{c.note}</Text>
        </Section>
        <PageFooter s={s} c={c} />
      </Page>
    </Document>
  );
}

/* ------------------------------------------------------------------ */
/* sub-components                                                      */
/* ------------------------------------------------------------------ */
type S = ReturnType<typeof makeStyles>;

function PageHeader({ s, c }: { s: S; c: SalesKitContent }) {
  return (
    <View style={s.pageHeader} fixed>
      <View style={s.headerBrand}>
        <View style={s.headerMark}>
          <Text style={s.headerMarkText}>D2</Text>
        </View>
        <Text style={s.headerBrandName}>D2Infinite</Text>
      </View>
      <Text style={s.headerSystem}>{c.systemLabel}</Text>
    </View>
  );
}

function PageFooter({ s, c }: { s: S; c: SalesKitContent }) {
  return (
    <View style={s.pageFooter} fixed>
      <Text style={s.footerText}>
        {c.contact.email}  ·  {c.contact.phone}  ·  {c.contact.location}
      </Text>
      <Text
        style={s.footerPage}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

function Section({
  s,
  kicker,
  title,
  children,
}: {
  s: S;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={s.section}>
      <View style={s.sectionHead}>
        <Text style={s.kicker}>{kicker}</Text>
        <View style={s.kickerLine} />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* styles                                                              */
/* ------------------------------------------------------------------ */
function makeStyles(ff: string, isThai = false) {
  return StyleSheet.create({
    /* ---- cover ---- */
    coverPage: { fontFamily: ff, color: C.white, position: 'relative' },
    bgFill: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
    coverInner: { flex: 1, paddingVertical: 54, paddingHorizontal: 48 },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    logoMark: {
      width: 34,
      height: 34,
      borderRadius: 9,
      backgroundColor: C.cyan,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: { fontSize: 14, fontWeight: 700, color: C.coverTop },
    brandName: { fontSize: 15, fontWeight: 600, color: C.white, letterSpacing: 0.3 },
    coverPill: {
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: 'rgba(34,211,238,0.5)',
      borderRadius: 999,
      paddingVertical: 5,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    coverPillText: {
      fontSize: 8.5,
      letterSpacing: 1.6,
      color: C.cyanBright,
      fontWeight: 600,
    },
    coverSystem: { fontSize: 40, fontWeight: 700, lineHeight: 1.05, color: C.white },
    coverTagline: {
      fontSize: isThai ? 12 : 13,
      lineHeight: 1.55,
      color: 'rgba(231,240,252,0.78)',
      marginTop: 14,
      // Latin wraps nicely at a narrower measure; Thai (no spaces) needs the
      // full width to stay on one line without clipping.
      maxWidth: isThai ? 499 : 420,
    },
    accentBar: {
      width: 60,
      height: 3,
      borderRadius: 2,
      backgroundColor: C.cyan,
      marginTop: 22,
    },
    coverMetaGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 34,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.12)',
      paddingTop: 22,
    },
    coverMetaCell: { width: '50%', marginBottom: 16, paddingRight: 12 },
    coverMetaLabel: { fontSize: 8, letterSpacing: 1.2, color: C.cyanBright, fontWeight: 600 },
    coverMetaValue: {
      fontSize: 11.5,
      color: 'rgba(255,255,255,0.92)',
      marginTop: 4,
      lineHeight: 1.4,
    },
    coverFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 'auto',
      paddingTop: 18,
    },
    coverFooterMuted: { fontSize: 8.5, color: 'rgba(231,240,252,0.5)', letterSpacing: 0.4 },

    /* ---- light pages ---- */
    page: {
      fontFamily: ff,
      backgroundColor: C.white,
      color: C.ink,
      paddingTop: 70,
      paddingBottom: 56,
      paddingHorizontal: 46,
    },
    pageHeader: {
      position: 'absolute',
      top: 28,
      left: 46,
      right: 46,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: C.line,
      paddingBottom: 12,
    },
    headerBrand: { flexDirection: 'row', alignItems: 'center', gap: 7 },
    headerMark: {
      width: 22,
      height: 22,
      borderRadius: 6,
      backgroundColor: C.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerMarkText: { fontSize: 9, fontWeight: 700, color: C.white },
    headerBrandName: { fontSize: 10.5, fontWeight: 600, color: C.ink },
    headerSystem: { fontSize: 9, color: C.muted, letterSpacing: 0.5 },

    pageFooter: {
      position: 'absolute',
      bottom: 26,
      left: 46,
      right: 46,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: C.line,
      paddingTop: 10,
    },
    footerText: { fontSize: 8, color: C.faint, letterSpacing: 0.3 },
    footerPage: { fontSize: 8, color: C.faint },

    /* ---- section ---- */
    section: { marginBottom: 26 },
    sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
    kicker: { fontSize: 10, fontWeight: 700, color: C.cyanDeep, letterSpacing: 0.5 },
    kickerLine: { width: 22, height: 1.5, backgroundColor: C.cyan },
    sectionTitle: { fontSize: 16, fontWeight: 700, color: C.ink },
    body: { fontSize: 10.5, lineHeight: 1.65, color: C.inkSoft, marginBottom: 9 },

    /* ---- stats ---- */
    statRow: { flexDirection: 'row', gap: 10 },
    statCard: {
      flex: 1,
      backgroundColor: C.card,
      borderWidth: 1,
      borderColor: C.line,
      borderRadius: 10,
      paddingVertical: 16,
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    statVal: { fontSize: 19, fontWeight: 700, color: C.cyanDeep },
    statLabel: {
      fontSize: 7,
      letterSpacing: 0.7,
      color: C.muted,
      marginTop: 6,
      textAlign: 'center',
      lineHeight: 1.3,
    },

    /* ---- features ---- */
    featGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    featCard: {
      width: '48.5%',
      backgroundColor: C.white,
      borderWidth: 1,
      borderColor: C.line,
      borderRadius: 10,
      padding: 14,
    },
    featNum: {
      width: 22,
      height: 22,
      borderRadius: 6,
      backgroundColor: 'rgba(6,182,212,0.12)',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 9,
    },
    featNumText: { fontSize: 10, fontWeight: 700, color: C.cyanDeep },
    featTitle: { fontSize: 11.5, fontWeight: 600, color: C.ink, marginBottom: 5 },
    featDesc: { fontSize: 9.5, lineHeight: 1.55, color: C.inkSoft },

    /* ---- shots ---- */
    shotBlock: { marginBottom: 20 },
    shotHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
    shotIdx: { fontSize: 9, fontWeight: 700, color: C.cyanDeep },
    shotTitle: { fontSize: 12.5, fontWeight: 600, color: C.ink },
    shotDesc: { fontSize: 9.5, lineHeight: 1.55, color: C.inkSoft, marginBottom: 9 },
    shotFrame: {
      borderWidth: 1,
      borderColor: C.line,
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: C.card,
    },
    shotImg: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' },
    note: {
      fontSize: 8.5,
      lineHeight: 1.5,
      color: C.faint,
      marginTop: 6,
    },
  });
}
