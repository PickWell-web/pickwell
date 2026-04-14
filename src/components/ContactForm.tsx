import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ─── Configuration ───────────────────────────────────────────────
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const CONTACT_EMAIL = 'geral@pickwell.pt';
const MAX_SUBMISSIONS = 3;
const MIN_TIME_MS = 3000; // minimum time before submission allowed

export default function ContactForm() {
  const { t } = useLanguage();
  const formLoadedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [humanInteraction, setHumanInteraction] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Track human interaction (mousemove, keydown, touch)
  useEffect(() => {
    const markHuman = () => setHumanInteraction(true);
    const events = ['mousemove', 'keydown', 'touchstart', 'scroll'] as const;
    events.forEach(e => window.addEventListener(e, markHuman, { once: true, passive: true }));
    return () => { events.forEach(e => window.removeEventListener(e, markHuman)); };
  }, []);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = t.contact.required;
    if (!formData.email.trim()) errs.email = t.contact.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = t.contact.invalidEmail;
    if (!formData.message.trim()) errs.message = t.contact.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // ─── Anti-bot checks ─────────────────────────────────────
    // 1. Honeypot
    if (honeypotRef.current?.value) { console.warn('Bot detected (honeypot)'); return; }
    // 2. Time check
    if (Date.now() - formLoadedAt.current < MIN_TIME_MS) { setErrors({ form: t.contact.error }); return; }
    // 3. Human interaction
    if (!humanInteraction) { console.warn('No human interaction detected'); return; }
    // 4. Rate limit
    if (submissionCount >= MAX_SUBMISSIONS) { setErrors({ form: t.contact.rateLimited }); return; }
    // 5. WebDriver / automation detection
    if ((navigator as any).webdriver) { console.warn('Automation detected'); return; }

    if (!WEB3FORMS_KEY) {
      setErrors({ form: t.contact.error });
      return;
    }

    setStatus('sending');
    setSubmissionCount(prev => prev + 1);

    try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ 
            access_key: WEB3FORMS_KEY,
            name: formData.name, 
            email: formData.email, 
            message: formData.message,
            subject: 'New contact from PickWell Website',
            from_name: 'PickWell Website',
          }),
        });
        if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-6">
        <div className="bg-pickwell-cream rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl flex flex-col md:flex-row">
          {/* Contact Info */}
          <div className="md:w-1/3 bg-pickwell-teal p-8 md:p-12 text-pickwell-cream">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.contact.title}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 opacity-70 flex-shrink-0" size={20} />
                <div>
                  <p className="font-bold">{t.contact.emailLabel}</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="opacity-70 hover:opacity-100 transition-opacity">{CONTACT_EMAIL}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 opacity-70 flex-shrink-0" size={20} />
                <div>
                  <p className="font-bold">{t.contact.phoneLabel}</p>
                  <a href="tel:+351915497740" className="opacity-70 hover:opacity-100 transition-opacity">+351 915 497 740</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 opacity-70 flex-shrink-0" size={20} />
                <div>
                  <p className="font-bold">{t.contact.locationLabel}</p>
                  <p className="opacity-70">{t.contact.locationValue}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-2 text-pickwell-cream/50 text-xs">
              <Shield size={14} />
              <span>{t.contact.securityNote}</span>
            </div>
          </div>

          {/* Form */}
          <div className="md:w-2/3 p-6 md:p-12">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="w-20 h-20 bg-pickwell-teal/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-pickwell-teal" />
                  </div>
                  <p className="text-xl font-bold text-pickwell-dark mb-2">{t.contact.success}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="grid gap-5 md:gap-6"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* Honeypot — invisible to humans */}
                  <div className="hp-field" aria-hidden="true">
                    <label htmlFor="hp-website">Website</label>
                    <input ref={honeypotRef} type="text" id="hp-website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-bold uppercase text-gray-400">{t.contact.name}</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={e => handleChange('name', e.target.value)}
                        placeholder={t.contact.placeholderName}
                        className={`w-full p-4 rounded-2xl bg-white border ${errors.name ? 'border-red-400' : 'border-gray-100'} focus:border-pickwell-teal outline-none transition-colors`}
                        required
                      />
                      {errors.name && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-bold uppercase text-gray-400">{t.contact.email}</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={e => handleChange('email', e.target.value)}
                        placeholder={t.contact.placeholderEmail}
                        className={`w-full p-4 rounded-2xl bg-white border ${errors.email ? 'border-red-400' : 'border-gray-100'} focus:border-pickwell-teal outline-none transition-colors`}
                        required
                      />
                      {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-bold uppercase text-gray-400">{t.contact.message}</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={e => handleChange('message', e.target.value)}
                      placeholder={t.contact.placeholderMessage}
                      className={`w-full p-4 rounded-2xl bg-white border ${errors.message ? 'border-red-400' : 'border-gray-100'} focus:border-pickwell-teal outline-none transition-colors resize-none`}
                      required
                    />
                    {errors.message && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>}
                  </div>

                  {errors.form && (
                    <p className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-xl">
                      <AlertCircle size={16} />{errors.form}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="bg-pickwell-teal text-pickwell-cream py-4 px-8 rounded-2xl font-bold hover:bg-pickwell-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-pickwell-cream/30 border-t-pickwell-cream rounded-full animate-spin" />
                        {t.contact.sending}
                      </>
                    ) : t.contact.send}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-4 flex items-center gap-2"
              >
                <AlertCircle size={16} />{t.contact.error}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
