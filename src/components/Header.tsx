import Link from 'next/link';

export function Header() {
  return (
    <header className="w-full pt-8 pb-4">
      <Link href="/" className="block text-center">
        <span className="font-sans-kr font-light text-pf-fg text-sm tracking-widest3 uppercase">
          Pathfinder
        </span>
      </Link>
      <div className="mx-auto mt-4 h-px w-24 bg-pf-rose" />
    </header>
  );
}
