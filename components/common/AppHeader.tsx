import { Bell } from "lucide-react";
import { IconCircle } from "@/components/common/IconCircle";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AppHeader({ title = "The Tab", subtitle }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-3">
      <div>
        <h1 className="text-[32px] font-black italic leading-none tracking-tight text-[#001524]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-[13px] font-semibold text-[#8B8680]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <IconCircle>
          <Bell className="h-5 w-5 text-[#001524]" />
        </IconCircle>

        <button className="relative h-10 w-10 rounded-full bg-white border border-[#D4D0CC] shadow-[0_4px_14px_rgba(0,21,36,0.04)] flex items-center justify-center text-sm font-black hover:shadow-[0_6px_16px_rgba(0,21,36,0.06)] transition-shadow">
          TP
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#ff7d00] border-2 border-white" />
        </button>
      </div>
    </header>
  );
}
