import { Trophy } from "lucide-react";
import { shadows } from "@/lib/shadows";
import { CardShell } from "@/components/common/CardShell";
import { AppText } from "@/components/common/AppText";

interface BadgeFeedPostProps {
  id: string;
  title: string;
  description: string;
  user: string;
  session: string;
  icon?: React.ReactNode;
}

export function BadgeFeedPost({
  id,
  title,
  description,
  user,
  session,
  icon = <Trophy className="h-6 w-6 text-orange" />,
}: BadgeFeedPostProps) {
  return (
    <div className={`rounded-[28px] border border-orange/20 bg-orange/5 p-4 ${shadows.card}`}>
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
          {icon}
        </div>

        <div>
          <AppText variant="tinyLabel">
            {title}
          </AppText>
          <AppText as="h3" variant="cardTitle" className="mt-1">
            {description}
          </AppText>
          <AppText variant="meta" className="mt-1">
            {user} unlocked this in {session}.
          </AppText>
        </div>
      </div>
    </div>
  );
}
