export function BrandSlogan() {
  return (
    <div className="text-center my-10 relative z-10">
      <h1
        className="font-serif-kr font-semibold text-4xl md:text-5xl text-pf-fg leading-tight"
        style={{ letterSpacing: '0.04em' }}
      >
        타로에게
        <br className="sm:hidden" />
        <span className="sm:ml-3"> 물어봐</span>
      </h1>
      <p
        className="mt-6 font-display italic text-base text-pf-accent-soft"
        style={{ letterSpacing: '0.32em' }}
      >
        ASK THE TAROT
      </p>
    </div>
  );
}
