interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "primary" | "secondary";
}

export function SegmentedControl({
  options,
  value,
  onChange,
  variant = "primary",
}: SegmentedControlProps) {
  const activeColor = variant === "primary" ? "bg-orange" : "bg-teal";

  return (
    <div className="grid rounded-[22px] border border-medium-gray bg-white p-1 shadow-[0_4px_14px_rgba(0,21,36,0.04)]" style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={[
            "h-10 rounded-[18px] text-[12px] font-black transition",
            value === option.value
              ? `${activeColor} text-white shadow-[0_6px_14px_rgba(0,0,0,0.1)]`
              : "text-ink",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
