interface FootnoteProps {
  children: React.ReactNode;
}

export function Footnote({ children }: FootnoteProps) {
  return (
    <p className="mt-8 text-center font-serif-kr text-[13px] text-pf-mute italic">
      *{children}
    </p>
  );
}
