interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`text-center ${className}`}>
      <span
        className="inline-block font-serif-hero font-medium text-pf-accent text-[13px] uppercase"
        style={{ letterSpacing: '0.32em' }}
      >
        {children}
      </span>
    </div>
  );
}
