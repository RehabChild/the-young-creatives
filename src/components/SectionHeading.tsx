interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div
        className={`font-mono-label flex items-center gap-2 text-xs uppercase text-blue-500 ${
          align === 'center' ? 'justify-center' : ''
        }`}
      >
        <span className="h-px w-6 bg-blue-500" />
        {eyebrow}
      </div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-text-soft">{description}</p>}
    </div>
  );
}
