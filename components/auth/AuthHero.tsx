import { Beer } from "lucide-react";
import { CardShell } from "@/components/common/CardShell";
import { AppText } from "@/components/common/AppText";
import { gradients } from "@/lib/gradients";

export function AuthHero() {
  return (
    <CardShell className={`bg-gradient-to-br ${gradients.alpha} overflow-hidden p-6 mb-6`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
          <Beer className="h-8 w-8 text-white" />
        </div>

        <div className="space-y-2">
          <AppText variant="cardTitle" className="text-white">
            Open tabs. Add drinks.
          </AppText>
          <AppText variant="body" className="text-white/90">
            Keep the receipts with your favorite people.
          </AppText>
        </div>

        <div className="flex gap-2 pt-2 justify-center">
          <div className="px-3 py-1 rounded-full bg-white/20">
            <AppText variant="meta" className="text-white">
              Drinks
            </AppText>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/20">
            <AppText variant="meta" className="text-white">
              Buddies
            </AppText>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/20">
            <AppText variant="meta" className="text-white">
              Receipts
            </AppText>
          </div>
        </div>
      </div>
    </CardShell>
  );
}
