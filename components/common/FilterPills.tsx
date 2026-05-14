interface FilterPillOption {
  label: string;
  value: string;
}

interface FilterPillsProps {
  options: FilterPillOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "primary" | "secondary";
}

export function FilterPills({
  options,
  value,
  onChange,
  variant = "secondary",
}: FilterPillsProps) {
  const activeColor = variant === "primary" ? "bg-orange" : "bg-teal";

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={[
            "h-9 shrink-0 rounded-full border px-4 text-sm font-black transition",
            value === option.value
              ? `${activeColor} border-transparent text-white shadow-[0_6px_14px_rgba(0,0,0,0.1)]`
              : "border-medium-gray bg-white text-ink",
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
