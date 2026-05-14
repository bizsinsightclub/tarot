import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full pt-10 pb-4 relative z-10">
      <Link href="/" className="block text-center">
        <span
          className="font-serif-hero font-medium text-pf-fg-soft text-[12px] uppercase select-none"
          style={{ letterSpacing: '0.42em' }}
        >
          Find Your Path
        </span>
      </Link>
      <div className="mx-auto mt-4 h-px w-40 bg-gradient-to-r from-transparent via-pf-rose-soft/70 to-transparent" />
    </header>
  );
}
