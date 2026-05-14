import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconCircle } from "@/components/common/IconCircle";
import { AppText } from "@/components/common/AppText";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  titleClassName?: string;
}

export function AppHeader({ title = "The Tab", subtitle, titleClassName }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-3">
      <div>
        <AppText as="h1" variant="pageTitle" className={titleClassName}>
          {title}
        </AppText>
        {subtitle && (
          <AppText variant="pageSubtitle">
            {subtitle}
          </AppText>
        )}
      </div>

      <div className="flex items-center gap-3">
        <IconCircle>
          <Bell className="h-5 w-5 text-ink" />
        </IconCircle>

        <button className="relative h-10 w-10 rounded-full bg-white border border-medium-gray shadow-[0_4px_14px_rgba(0,21,36,0.04)] flex items-center justify-center text-sm font-black hover:shadow-[0_6px_16px_rgba(0,21,36,0.06)] transition-shadow">
          TP
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-orange border-2 border-white" />
        </button>
      </div>
    </header>
  );
}
