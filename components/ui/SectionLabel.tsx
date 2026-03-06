interface SectionLabelProps {
  number: string;
  text: string;
}

export function SectionLabel({ number, text }: SectionLabelProps): React.ReactElement {
  return (
    <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
      {number} — {text}
    </p>
  );
}
