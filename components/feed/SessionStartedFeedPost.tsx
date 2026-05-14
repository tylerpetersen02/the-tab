import { CardShell } from "@/components/common/CardShell";
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";

interface SessionStartedFeedPostProps {
  id: string;
  user: string;
  session: string;
  onJoin?: () => void;
}

export function SessionStartedFeedPost({
  id,
  user,
  session,
  onJoin,
}: SessionStartedFeedPostProps) {
  return (
    <CardShell variant="compact" className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <AppText variant="cardTitle">
            {user} started a tab
          </AppText>
          <AppText variant="meta" className="mt-1">
            {session} · Live now
          </AppText>
        </div>

        <AppButton
          variant="primary"
          size="sm"
          onClick={onJoin}
          className="shrink-0"
        >
          Join
        </AppButton>
      </div>
    </CardShell>
  );
}
