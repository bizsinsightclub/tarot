interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`text-center ${className}`}>
      <span className="inline-block font-sans-kr font-bold text-pf-accent text-sm tracking-widest2 uppercase">
        {children}
      </span>
    </div>
  );
}
