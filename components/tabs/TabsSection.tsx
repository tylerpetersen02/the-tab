import { SectionHeader } from "@/components/common/SectionHeader";

interface TabsSectionProps {
  title: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function TabsSection({
  title,
  children,
  actionLabel,
  onAction,
}: TabsSectionProps) {
  return (
    <section>
      <SectionHeader
        title={title}
        action={
          actionLabel && onAction
            ? { label: actionLabel, onClick: onAction }
            : undefined
        }
      />
      <div className="mt-3">{children}</div>
    </section>
  );
}
