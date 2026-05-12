import { Header } from '@/components/Header';
import { BrandSlogan } from '@/components/BrandSlogan';
import { SectionLabel } from '@/components/SectionLabel';
import { SituationPicker } from '@/components/SituationPicker';
import { Footnote } from '@/components/Footnote';
import { BackgroundCards } from '@/components/BackgroundCards';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      <BackgroundCards />
      <Header />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <BrandSlogan />
        <div className="mt-8 w-full">
          <SectionLabel className="mb-6">결정이 필요한 순간</SectionLabel>
          <SituationPicker />
        </div>
        <Footnote>
          카드는 답을 정해주지 않습니다. 다만 당신의 직감을 비춥니다.
        </Footnote>
      </div>
    </main>
  );
}
