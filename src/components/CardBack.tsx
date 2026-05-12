/**
 * Stylized card back used during the reveal animation.
 * Pure CSS — no images.
 */
export function CardBack() {
  return (
    <div
      className="absolute inset-0 rounded-md overflow-hidden border border-pf-rose/40 shadow-lg"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, #4a3470 0%, #2B2042 60%, #1a1230 100%)',
      }}
    >
      {/* concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 aspect-square rounded-full border border-pf-accent/30" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 aspect-square rounded-full border border-pf-accent/40" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/4 aspect-square rounded-full border border-pf-accent/60 bg-pf-accent/10" />
      </div>
      {/* center sigil */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif-hero text-pf-accent text-2xl tracking-widest">
          ✦
        </span>
      </div>
      {/* corner ornaments */}
      <span className="absolute top-2 left-2 text-pf-rose/60 text-xs">✦</span>
      <span className="absolute top-2 right-2 text-pf-rose/60 text-xs">✦</span>
      <span className="absolute bottom-2 left-2 text-pf-rose/60 text-xs">✦</span>
      <span className="absolute bottom-2 right-2 text-pf-rose/60 text-xs">✦</span>
    </div>
  );
}
