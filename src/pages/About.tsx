import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { team } from '../data/team';
import { Target, Eye, CheckCircle2 } from 'lucide-react';

const reasons = [
  'Direct communication with the person actually building your site.',
  'Designs made in Figma and signed off before a line of code is written.',
  'Fast turnaround without cutting corners on quality.',
  'Ongoing maintenance so your site keeps working after launch.',
];

export default function About() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection className="max-w-2xl">
          <div className="font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500">
            <span className="h-px w-6 bg-blue-500" />
            About us
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            A small studio, built for growing businesses.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-soft">
            The Young Creatives is a three-person web design and development studio. We work with businesses,
            schools, restaurants, and independent creatives who need a site that looks considered, loads fast, and
            is easy to keep up to date &mdash; without hiring a full in-house team to build it.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          <AnimatedSection>
            <div className="h-full rounded-2xl border border-border bg-surface p-8">
              <Target size={20} className="text-blue-500" />
              <h3 className="mt-4 font-display text-xl font-semibold text-text">Our mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-soft">
                To make a genuinely well-designed, well-built website achievable for businesses that don&rsquo;t
                have an in-house design or engineering team &mdash; without compromising on craft.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="h-full rounded-2xl border border-border bg-surface p-8">
              <Eye size={20} className="text-blue-500" />
              <h3 className="mt-4 font-display text-xl font-semibold text-text">Our vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-soft">
                To become the studio local businesses and creatives think of first &mdash; known for sites that are
                both distinctive and dependable, long after launch day.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <div className="mt-20">
          <AnimatedSection>
            <SectionHeading eyebrow="The people" title="Meet the team" />
          </AnimatedSection>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.05}>
                <div className="crop-marks h-full rounded-2xl border border-border bg-surface p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 font-display text-lg font-semibold text-white">
                    {member.initials}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-text">{member.name}</h3>
                  <p className="font-mono-label mt-0.5 text-xs uppercase text-blue-500">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-soft">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <AnimatedSection>
            <SectionHeading eyebrow="Why us" title="Why clients choose The Young Creatives" />
          </AnimatedSection>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <AnimatedSection key={reason} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-500" />
                  <p className="text-sm leading-relaxed text-text">{reason}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
