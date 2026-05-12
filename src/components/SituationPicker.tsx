import Link from 'next/link';
import { SITUATIONS } from '@/data/situations';

export function SituationPicker() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto relative z-10">
      {SITUATIONS.map((s) => (
        <Link
          key={s.key}
          href={`/reading?s=${s.key}`}
          className="group block w-full px-6 py-5 rounded-xl border border-pf-accent/30 bg-pf-bg-deep/55 backdrop-blur-sm hover:bg-pf-accent/10 hover:border-pf-accent/60 transition-all duration-300 text-center shadow-velvet"
        >
          <span className="block font-serif-kr font-semibold text-xl text-pf-fg group-hover:text-pf-accent-soft transition-colors">
            {s.ko}
          </span>
          <span
            className="block mt-1.5 font-serif-hero text-[11px] text-pf-accent uppercase"
            style={{ letterSpacing: '0.32em' }}
          >
            {s.subtitle}
          </span>
        </Link>
      ))}
    </div>
  );
}
