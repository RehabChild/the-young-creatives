import { useEffect, useState } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { publicApi, type ApiProject } from '../lib/publicApi';

export default function Portfolio() {
  const [query, setQuery] = useState('');
  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<ApiProject | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const timeout = setTimeout(() => {
      publicApi
        .getPortfolio(query.trim() || undefined)
        .then((res) => {
          if (!cancelled) setProjects(res.projects);
        })
        .catch(() => {
          if (!cancelled) setError('Could not load the portfolio right now. Please try again shortly.');
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 250); // debounce so we're not hitting the API on every keystroke

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-2xl">
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            Portfolio
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Recent work.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-soft">
            A sample of projects across e-commerce, business, education, and hospitality.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, category, or tech"
              aria-label="Search portfolio projects"
              className="w-full rounded-full border border-border bg-surface py-2.5 pl-11 pr-4 text-sm text-text placeholder:text-text-soft focus:border-blue-500"
            />
          </div>
        </AnimatedSection>

        {error && <p className="mt-8 text-sm text-red-500">{error}</p>}

        {loading ? (
          <p className="mt-10 text-sm text-text-soft">Loading…</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <AnimatedSection key={project.id} delay={i * 0.04}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-surface">
                  <div
                    className="flex h-44 items-center justify-center font-display text-2xl font-semibold text-white/90"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.name}
                  </div>
                  <div className="p-5">
                    <p className="font-mono-label text-xs uppercase text-blue-500">{project.category}</p>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-text">{project.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-soft">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="rounded-full bg-paper-soft px-2.5 py-1 text-xs text-text-soft dark:bg-ink-soft">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setActive(project)}
                      className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:underline"
                    >
                      View details <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <p className="mt-10 text-center text-sm text-text-soft">No projects match &ldquo;{query}&rdquo;.</p>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="flex h-40 items-center justify-center font-display text-2xl font-semibold text-white/90" style={{ backgroundColor: active.color }}>
                {active.name}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono-label text-xs uppercase text-blue-500">{active.category}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-text">{active.name}</h3>
                  </div>
                  <button
                    aria-label="Close"
                    onClick={() => setActive(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-soft hover:text-blue-500"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-soft">{active.description}</p>
                <div className="mt-5">
                  <p className="font-mono-label text-xs uppercase text-text-soft">Technologies used</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {active.tech.map((t) => (
                      <span key={t} className="rounded-full bg-paper-soft px-2.5 py-1 text-xs text-text-soft dark:bg-ink-soft">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
