interface InfoPillProps {
  label: string;
  tone?: "default" | "teal" | "orange";
}

export function InfoPill({ label, tone = "default" }: InfoPillProps) {
  const styles = {
    default: "bg-[#FAFAF8] border border-[#D4D0CC] text-[#001524]",
    teal: "bg-[#dff4f2] border border-[#a8d5e0] text-[#15616d]",
    orange: "bg-[#fff0e6] border border-[#ffc9a3] text-[#ff7d00]",
  };

  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${styles[tone]}`}>
      {label}
    </span>
  );
}
