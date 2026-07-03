import { useState, type FormEvent } from 'react';
import { Mail, Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.message.trim() || form.message.trim().length < 10) next.message = 'Message should be at least 10 characters.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-soft focus:outline-none ${
      errors[field] ? 'border-red-400' : 'border-border focus:border-blue-500'
    }`;

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-2xl">
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Contact
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Let&rsquo;s talk.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-soft">
            Questions before you book a project? Reach out directly, or send a message below.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-10 lg:grid-cols-[320px_1fr]">
          <AnimatedSection className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'hello@theyoungcreatives.studio' },
              { icon: Phone, label: 'Phone', value: '+233 20 123 4567' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us directly' },
              { icon: MapPin, label: 'Office', value: 'Airport Residential Area, Accra, Ghana' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
                <item.icon size={18} className="mt-0.5 shrink-0 text-blue-500" />
                <div>
                  <p className="font-mono-label text-xs uppercase text-text-soft">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-text">{item.value}</p>
                </div>
              </div>
            ))}
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-border bg-surface p-12 text-center">
                <CheckCircle2 size={36} className="text-blue-500" />
                <h2 className="mt-4 font-display text-xl font-semibold text-text">Message sent</h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-soft">
                  Thanks for reaching out &mdash; we&rsquo;ll reply to your email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div>
                  <label className="text-sm font-medium text-text">Name</label>
                  <input
                    className={`mt-2 ${inputClass('name')}`}
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Email</label>
                  <input
                    type="email"
                    className={`mt-2 ${inputClass('email')}`}
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Message</label>
                  <textarea
                    rows={5}
                    className={`mt-2 ${inputClass('message')}`}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="How can we help?"
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-500 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-600 sm:w-auto sm:px-8"
                >
                  Send message
                </button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
