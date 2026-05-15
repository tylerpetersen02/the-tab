import { CardShell } from "@/components/common/CardShell";

export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <CardShell className="p-6">
      {children}
    </CardShell>
  );
}
