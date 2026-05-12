interface FootnoteProps {
  children: React.ReactNode;
}

export function Footnote({ children }: FootnoteProps) {
  return (
    <p className="mt-6 text-center font-sans-kr text-xs text-pf-mute">
      *{children}
    </p>
  );
}
