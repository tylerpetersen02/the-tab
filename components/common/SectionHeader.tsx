import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";

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
        <AppText as="h2" variant="sectionLabel">
          {title}
        </AppText>
        {icon}
      </div>

      {action && (
        <AppButton
          variant="ghost"
          size="sm"
          onClick={action.onClick}
        >
          {action.label}
        </AppButton>
      )}
    </div>
  );
}
