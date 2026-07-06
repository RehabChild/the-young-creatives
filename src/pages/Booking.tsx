import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { publicApi, PublicApiError, type ApiService } from '../lib/publicApi';

interface FormState {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  projectDescription: string;
  budgetRange: string;
  preferredDate: string;
}

const initialState: FormState = {
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  serviceNeeded: '',
  projectDescription: '',
  budgetRange: '',
  preferredDate: '',
};

const budgetRanges = ['Under $500', '$500 – $1,500', '$1,500 – $4,000', '$4,000 – $10,000', 'Over $10,000'];

export default function Booking() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    publicApi
      .getServices()
      .then((res) => setServices(res.services))
      .catch(() => {
        // Non-fatal — the form still works, just without a live service list.
      });
  }, []);

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.companyName.trim()) next.companyName = 'Company name is required.';
    if (!form.contactPerson.trim()) next.contactPerson = 'Contact person is required.';
    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.phone.trim()) next.phone = 'Phone number is required.';
    if (!form.serviceNeeded) next.serviceNeeded = 'Please select a service.';
    if (!form.projectDescription.trim() || form.projectDescription.trim().length < 20)
      next.projectDescription = 'Please describe the project in at least 20 characters.';
    if (!form.budgetRange) next.budgetRange = 'Please select a budget range.';
    if (!form.preferredDate) next.preferredDate = 'Please choose a preferred meeting date.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await publicApi.submitBooking(form);
      setSubmitted(true);
      setForm(initialState);
    } catch (err) {
      setSubmitError(
        err instanceof PublicApiError
          ? err.message
          : 'Something went wrong submitting your request. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormState) =>
    `w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text placeholder:text-text-soft focus:outline-none ${
      errors[field] ? 'border-red-400' : 'border-border focus:border-blue-500'
    }`;

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Booking
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Tell us about your project.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-soft">
            Fill in the form below and we&rsquo;ll follow up within one business day to confirm your meeting.
          </p>
        </AnimatedSection>

        {submitted ? (
          <AnimatedSection className="mt-12 flex flex-col items-center rounded-2xl border border-border bg-surface p-12 text-center">
            <CheckCircle2 size={36} className="text-blue-500" />
            <h2 className="mt-4 font-display text-xl font-semibold text-text">Request received</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-soft">
              Thanks &mdash; your project request has been logged. We&rsquo;ll email you shortly to confirm your
              preferred meeting date.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Submit another request
            </button>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-text">Company name</label>
                  <input
                    className={`mt-2 ${inputClass('companyName')}`}
                    value={form.companyName}
                    onChange={(e) => update('companyName', e.target.value)}
                    placeholder="Kori Goods"
                  />
                  {errors.companyName && <p className="mt-1.5 text-xs text-red-500">{errors.companyName}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Contact person</label>
                  <input
                    className={`mt-2 ${inputClass('contactPerson')}`}
                    value={form.contactPerson}
                    onChange={(e) => update('contactPerson', e.target.value)}
                    placeholder="Jane Doe"
                  />
                  {errors.contactPerson && <p className="mt-1.5 text-xs text-red-500">{errors.contactPerson}</p>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-text">Email</label>
                  <input
                    type="email"
                    className={`mt-2 ${inputClass('email')}`}
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="jane@company.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Phone number</label>
                  <input
                    type="tel"
                    className={`mt-2 ${inputClass('phone')}`}
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+233 20 123 4567"
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-text">Service needed</label>
                <select
                  className={`mt-2 ${inputClass('serviceNeeded')}`}
                  value={form.serviceNeeded}
                  onChange={(e) => update('serviceNeeded', e.target.value)}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {errors.serviceNeeded && <p className="mt-1.5 text-xs text-red-500">{errors.serviceNeeded}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-text">Project description</label>
                <textarea
                  rows={4}
                  className={`mt-2 ${inputClass('projectDescription')}`}
                  value={form.projectDescription}
                  onChange={(e) => update('projectDescription', e.target.value)}
                  placeholder="Tell us what you're building, who it's for, and any pages or features you already know you need."
                />
                {errors.projectDescription && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.projectDescription}</p>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-text">Budget range</label>
                  <select
                    className={`mt-2 ${inputClass('budgetRange')}`}
                    value={form.budgetRange}
                    onChange={(e) => update('budgetRange', e.target.value)}
                  >
                    <option value="">Select a range</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.budgetRange && <p className="mt-1.5 text-xs text-red-500">{errors.budgetRange}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-text">Preferred meeting date</label>
                  <input
                    type="date"
                    className={`mt-2 ${inputClass('preferredDate')}`}
                    value={form.preferredDate}
                    onChange={(e) => update('preferredDate', e.target.value)}
                  />
                  {errors.preferredDate && <p className="mt-1.5 text-xs text-red-500">{errors.preferredDate}</p>}
                </div>
              </div>

              {submitError && <p className="text-sm text-red-500">{submitError}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-blue-500 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-600 disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto sm:px-8"
              >
                {submitting ? 'Submitting…' : 'Submit request'}
              </button>
            </form>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
