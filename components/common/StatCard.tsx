import { CardShell } from "./CardShell";
import { AppText } from "./AppText";

interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  variant?: "default" | "compact";
}

export function StatCard({
  label,
  value,
  detail,
  variant = "default",
}: StatCardProps) {
  return (
    <CardShell variant="score" className="p-4">
      <AppText variant="tinyLabel">
        {label}
      </AppText>
      <AppText as="h2" variant="statValue">
        {value}
      </AppText>
      {detail && (
        <AppText variant="meta">
          {detail}
        </AppText>
      )}
    </CardShell>
  );
}
