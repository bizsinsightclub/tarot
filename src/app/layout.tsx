import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Noto_Serif_KR } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const notoSerifKr = Noto_Serif_KR({
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Pathfinder — 운명을 묻고, 선택을 내린다',
  description: '상황 기반 타로 결정 도구. 살까 말까, 할까 말까, 만날까 말까.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${cinzel.variable} ${cormorant.variable} ${notoSerifKr.variable}`}
    >
      <body className="bg-pf-bg text-pf-fg min-h-screen">{children}</body>
    </html>
  );
}
