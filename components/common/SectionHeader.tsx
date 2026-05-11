interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SectionHeader({ title, icon, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <h2 className="text-[13px] font-black uppercase leading-none tracking-[0.08em] text-[#001524]">
          {title}
        </h2>
        {icon}
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-semibold text-[#15616d] hover:text-[#0d3f47] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
