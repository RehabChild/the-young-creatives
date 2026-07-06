import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { publicApi, type ApiTestimonial } from '../lib/publicApi';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    publicApi
      .getTestimonials()
      .then((res) => {
        if (!cancelled) setTestimonials(res.testimonials);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load testimonials right now. Please try again shortly.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-2xl">
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Testimonials
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            What clients say.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-soft">
            A few words from the businesses and creatives we&rsquo;ve worked with.
          </p>
        </AnimatedSection>

        {error && <p className="mt-8 text-sm text-red-500">{error}</p>}

        {loading ? (
          <p className="mt-10 text-sm text-text-soft">Loading…</p>
        ) : (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.id} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-surface p-7">
                  <div className="flex gap-1 text-blue-500">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} size={15} fill="currentColor" />
                    ))}
                    {Array.from({ length: 5 - t.rating }).map((_, idx) => (
                      <Star key={`empty-${idx}`} size={15} className="text-border" />
                    ))}
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-text">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-5 text-sm font-semibold text-text">
                    {t.name} <span className="font-normal text-text-soft">&middot; {t.company}</span>
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
