import { Trophy } from "lucide-react";

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
  icon = <Trophy className="h-6 w-6 text-[#ff7d00]" />,
}: BadgeFeedPostProps) {
  return (
    <article className="rounded-[28px] border border-[#F2C14E]/60 bg-[#FFF4D6] p-4 shadow-[0_8px_24px_rgba(0,21,36,0.06)]">
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
          {icon}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#78290f]">
            {title}
          </p>
          <h3 className="mt-1 text-lg font-black text-[#001524]">
            {description}
          </h3>
          <p className="mt-1 text-sm font-semibold text-[#8B8680]">
            {user} unlocked this in {session}.
          </p>
        </div>
      </div>
    </article>
  );
}
