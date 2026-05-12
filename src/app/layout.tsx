import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="ko">
      <body className="bg-pf-bg text-pf-fg min-h-screen">{children}</body>
    </html>
  );
}
