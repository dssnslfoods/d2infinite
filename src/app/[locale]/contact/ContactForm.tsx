'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { AlertCircle, Check, Send } from 'lucide-react';
import { Glass } from '@/components/ui';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  message: string;
}

const empty: FormData = { name: '', email: '', phone: '', company: '', role: '', message: '' };

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tErr = useTranslations('contact.form.errors');

  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update =
    (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    };

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = tErr('nameRequired');
    if (!form.email.trim()) next.email = tErr('emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = tErr('emailInvalid');
    if (!form.message.trim()) next.message = tErr('messageRequired');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || tErr('submitFailed'));
      setSent(true);
      setForm(empty);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : tErr('submitFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <Glass strong style={{ padding: 42, borderRadius: 24 }}>
        <div style={{ padding: '64px 0', textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
              margin: '0 auto',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 10px 40px -8px rgba(34, 211, 238, 0.6)',
            }}
          >
            <Check size={28} style={{ color: '#062028' }} />
          </div>
          <h2 className="h3" style={{ marginTop: 24 }}>{t('success')}</h2>
          <p className="lead" style={{ marginTop: 14, fontSize: 16 }}>
            {t('successBody')}
          </p>
          <button type="button" className="btn btn-glass" style={{ marginTop: 24 }} onClick={() => setSent(false)}>
            {t('sendAnother')}
          </button>
        </div>
      </Glass>
    );
  }

  return (
    <Glass strong className="glass-lg" style={{ padding: 42, borderRadius: 24 }}>
      <h2 className="h3" style={{ fontSize: 22, fontWeight: 500 }}>{t('title')}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 24 }}>
        <div className="row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className={`field ${errors.name ? 'error' : ''}`}>
            <label htmlFor="name">{t('name')} *</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={update('name')}
              placeholder={t('namePlaceholder')}
            />
            {errors.name && <FieldError text={errors.name} />}
          </div>
          <div className={`field ${errors.email ? 'error' : ''}`}>
            <label htmlFor="email">{t('email')} *</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder={t('emailPlaceholder')}
            />
            {errors.email && <FieldError text={errors.email} />}
          </div>
        </div>
        <div className="row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="field">
            <label htmlFor="company">{t('company')}</label>
            <input
              id="company"
              value={form.company}
              onChange={update('company')}
              placeholder={t('companyPlaceholder')}
            />
          </div>
          <div className="field">
            <label htmlFor="role">{t('role')}</label>
            <input id="role" value={form.role} onChange={update('role')} placeholder={t('rolePlaceholder')} />
          </div>
        </div>
        <div className="field">
          <label htmlFor="phone">{t('phone')}</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder={t('phonePlaceholder')}
          />
        </div>
        <div className={`field ${errors.message ? 'error' : ''}`}>
          <label htmlFor="message">{t('message')} *</label>
          <textarea
            id="message"
            required
            value={form.message}
            onChange={update('message')}
            placeholder={t('messagePlaceholder')}
          />
          {errors.message && <FieldError text={errors.message} />}
        </div>

        {submitError && (
          <div
            style={{
              padding: 14,
              borderRadius: 12,
              background: 'rgba(251, 113, 133, 0.08)',
              border: '1px solid rgba(251, 113, 133, 0.25)',
              color: 'var(--rose-400)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13.5,
            }}
          >
            <AlertCircle size={16} /> {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
          style={{ marginTop: 6, padding: '16px 22px', fontSize: 15.5, opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? t('sending') : t('submit')} <Send size={16} />
        </button>
        <p className="caption" style={{ textAlign: 'center' }}>{t('disclaimer')}</p>
      </form>

      <style>{`
        @media (max-width: 680px) {
          .row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Glass>
  );
}

function FieldError({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 12, color: 'var(--rose-400)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
      <AlertCircle size={12} /> {text}
    </p>
  );
}
