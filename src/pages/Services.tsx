import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { services } from '../data/services';

export default function Services() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-2xl">
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Services
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Nine ways we can help.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-soft">
            Whatever kind of site you need, we scope it around your goals and budget before we start &mdash; no
            unnecessary features, no surprises.
          </p>
        </AnimatedSection>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} delay={i * 0.03}>
              <div className="group grid gap-4 py-8 sm:grid-cols-[80px_1fr_auto] sm:items-center">
                <span className="font-mono-label text-sm text-blue-500">{service.index}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text">{service.name}</h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-text-soft">{service.detail}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.deliverables.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-border px-3 py-1 text-xs text-text-soft"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to="/booking"
                  className="flex items-center gap-1.5 text-sm font-semibold text-blue-500 opacity-0 transition-opacity group-hover:opacity-100 sm:justify-self-end"
                >
                  Get started <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
