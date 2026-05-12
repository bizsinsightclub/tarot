export function BrandSlogan() {
  return (
    <div className="text-center my-10 relative z-10">
      <h1
        className="font-serif-hero font-normal text-4xl md:text-5xl text-pf-fg"
        style={{ letterSpacing: '0.18em' }}
      >
        FATE
        <em className="font-display italic font-light text-pf-accent-soft px-3 text-3xl md:text-4xl align-baseline">
          or
        </em>
        CHOICE
      </h1>
      <p className="mt-7 font-serif-kr text-lg text-pf-fg-soft tracking-wider">
        운명을 묻고, 선택을 내린다.
      </p>
    </div>
  );
}
