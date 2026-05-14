interface InfoPillProps {
  label: string;
  tone?: "default" | "teal" | "orange";
}

export function InfoPill({ label, tone = "default" }: InfoPillProps) {
  const styles = {
    default: "bg-off-white border border-medium-gray text-ink",
    teal: "bg-teal/10 border border-teal/20 text-teal",
    orange: "bg-orange/10 border border-orange/20 text-orange",
  };

  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${styles[tone]}`}>
      {label}
    </span>
  );
}
