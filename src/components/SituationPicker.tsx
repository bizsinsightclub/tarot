import Link from 'next/link';
import { SITUATIONS } from '@/data/situations';

export function SituationPicker() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      {SITUATIONS.map((s) => (
        <Link
          key={s.key}
          href={`/reading?s=${s.key}`}
          className="block w-full px-6 py-5 rounded-xl border border-pf-accent/40 bg-pf-bg/40 hover:bg-pf-accent/10 transition-colors text-center"
        >
          <span className="block font-sans-kr font-bold text-xl text-pf-fg">
            {s.ko}
          </span>
          <span className="block mt-1 font-sans-kr text-xs tracking-widest2 text-pf-accent uppercase">
            {s.subtitle}
          </span>
        </Link>
      ))}
    </div>
  );
}
