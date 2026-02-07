'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tErrors = useTranslations('contact.form.errors');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = tErrors('nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = tErrors('emailRequired');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = tErrors('emailInvalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = tErrors('messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        message: '',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : tErrors('submitFailed');
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <Card className="h-full flex items-center justify-center" padding="lg" hover={false}>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {t('success')}
          </h3>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-cyan-600 hover:text-cyan-700 font-medium mt-4"
          >
            Send another message
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full" padding="lg" hover={false}>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        {t('title')}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Email row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('name')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('namePlaceholder')}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors`}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('email')} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.email
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Company & Role row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('company')}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder={t('companyPlaceholder')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">
              {t('role')}
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder={t('rolePlaceholder')}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-cyan-500 focus:ring-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
            {t('message')} *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder={t('messagePlaceholder')}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.message
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-slate-200 focus:border-cyan-500 focus:ring-cyan-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors resize-none`}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          fullWidth
          size="lg"
          icon={Send}
        >
          {isSubmitting ? t('sending') : t('submit')}
        </Button>
      </form>
    </Card>
  );
}
