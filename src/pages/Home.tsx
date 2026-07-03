import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Mail, Phone, MessageCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { services } from '../data/services';
import { projects } from '../data/portfolio';
import { testimonials } from '../data/testimonials';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono-label mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs uppercase text-text-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Now booking projects for Q3 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-8 max-w-3xl text-center font-display text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-6xl"
          >
            Websites, built the way you actually pictured them.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-text-soft"
          >
            The Young Creatives is a small studio designing and building fast, modern websites for businesses,
            schools, restaurants, and creatives — from first sketch to launch day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/booking"
              className="group flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Start a project
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/portfolio"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-blue-500 hover:text-blue-500"
            >
              See our work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="crop-marks mx-auto mt-20 max-w-4xl rounded-2xl border border-border bg-surface p-2 shadow-2xl shadow-blue-900/5"
          >
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="h-2.5 w-2.5 rounded-full bg-border" />
              <span className="font-mono-label ml-3 text-xs text-text-soft">theyoungcreatives.studio</span>
            </div>
            <div className="grid grid-cols-3 gap-3 p-6">
              {['Discover', 'Design', 'Build'].map((step, i) => (
                <div key={step} className="rounded-lg border border-dashed border-border p-4">
                  <span className="font-mono-label text-xs text-blue-500">0{i + 1}</span>
                  <p className="mt-2 text-sm font-medium text-text">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 py-16">
        <AnimatedSection className="mx-auto max-w-4xl text-center">
          <p className="text-xl font-medium leading-relaxed text-text sm:text-2xl">
            We design and build the sites behind growing businesses &mdash; combining considered UI &amp; UX design
            with clean, dependable engineering, so what launches looks as good as it works.
          </p>
        </AnimatedSection>
      </section>

      {/* Featured services */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <SectionHeading eyebrow="What we build" title="Featured services" />
          </AnimatedSection>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-blue-500">
                  <span className="font-mono-label text-xs text-blue-500">{service.index}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-text">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-soft">{service.summary}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:underline"
            >
              View all services <ArrowRight size={15} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <SectionHeading eyebrow="Selected work" title="A few recent launches" />
          </AnimatedSection>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.05}>
                <Link to="/portfolio" className="group block overflow-hidden rounded-2xl border border-border bg-bg">
                  <div
                    className="flex h-40 items-center justify-center font-mono-label text-xs uppercase text-white/70"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.category}
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-text">{project.name}</h3>
                    <p className="mt-1.5 text-sm text-text-soft">{project.description}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <SectionHeading eyebrow="Client feedback" title="What clients say" />
          </AnimatedSection>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {testimonials.slice(0, 2).map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <div className="flex gap-1 text-blue-500">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-semibold text-text">
                    {t.name} <span className="font-normal text-text-soft">&middot; {t.company}</span>
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <AnimatedSection className="crop-marks mx-auto max-w-4xl rounded-3xl bg-ink px-8 py-16 text-center dark:bg-blue-900/40">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
            Tell us what you&rsquo;re building and we&rsquo;ll get back to you within one business day with next
            steps.
          </p>
          <Link
            to="/booking"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-blue-600"
          >
            Book a project <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </section>

      {/* Contact snippet */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection>
            <SectionHeading eyebrow="Reach us" title="Talk to the team directly" />
          </AnimatedSection>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              { icon: Mail, label: 'Email', value: 'hello@theyoungcreatives.studio' },
              { icon: Phone, label: 'Phone', value: '+233 20 123 4567' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Message us directly' },
            ].map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <item.icon size={18} className="text-blue-500" />
                  <p className="font-mono-label mt-3 text-xs uppercase text-text-soft">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-text">{item.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
