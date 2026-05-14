import { shadows } from "@/lib/shadows";
import { CardShell } from "@/components/common/CardShell";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { gradients } from "@/lib/gradients";

interface RecapFeedPostProps {
  id: string;
  sessionTitle: string;
  beersLogged: number;
  pintScore: number;
  mediaCount: number;
  onViewReceipts?: () => void;
}

export function RecapFeedPost({
  id,
  sessionTitle,
  beersLogged,
  pintScore,
  mediaCount,
  onViewReceipts,
}: RecapFeedPostProps) {
  return (
    <div className={`overflow-hidden rounded-[28px] border border-medium-gray bg-white ${shadows.card}`}>
      <div className={`h-32 bg-gradient-to-br ${gradients.warm}`} />

      <div className="p-4">
        <AppText variant="tinyLabel" className="text-orange">
          Recap Ready
        </AppText>

        <AppText as="h3" variant="cardTitle" className="mt-1">
          {sessionTitle}
        </AppText>

        <AppText variant="meta" className="mt-1">
          {beersLogged} beers · {pintScore} Pint Score · {mediaCount} media
        </AppText>

        <AppButton
          variant="primary"
          size="sm"
          onClick={onViewReceipts}
          className="mt-4"
        >
          View Receipts
        </AppButton>
      </div>
    </div>
  );
}
