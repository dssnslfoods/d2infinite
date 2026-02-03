import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default async function ContactInfo({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'contact' });

  const address = locale === 'th'
    ? '422/147 ถนนปัญญาอินทรา แขวงสามวาตะวันตก เขตคลองสามวา กรุงเทพมหานคร 10510 ประเทศไทย'
    : '422/147 Panya Indra Rd., Samwa-Tawantok, Khet Klong Samwa, Bangkok 10510, Thailand';

  const mapsUrl = 'https://maps.google.com/?q=422/147+Panya+Indra+Rd+Klong+Samwa+Bangkok+10510+Thailand';

  return (
    <Card className="h-full" padding="lg" hover={false}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        {t('info.title')}
      </h2>

      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">
              {t('info.email')}
            </div>
            <a
              href="mailto:contact@d2infinite.com"
              className="text-lg font-semibold text-slate-900 hover:text-cyan-600 transition-colors"
            >
              contact@d2infinite.com
            </a>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">
              {t('info.phone')}
            </div>
            <a
              href="tel:+66870783663"
              className="text-lg font-semibold text-slate-900 hover:text-cyan-600 transition-colors"
            >
              +66 870 783 663
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-500 mb-1">
              {t('info.address')}
            </div>
            <p className="text-slate-900 leading-relaxed mb-3">
              {address}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium text-sm transition-colors"
            >
              {t('info.openMaps')}
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-cyan-600 font-medium text-sm italic">
          {locale === 'th'
            ? 'อินไซต์ไม่สิ้นสุด เพื่อการตัดสินใจที่ชัดเจน'
            : 'Infinity in Data. Clarity in Decisions.'}
        </p>
      </div>
    </Card>
  );
}
