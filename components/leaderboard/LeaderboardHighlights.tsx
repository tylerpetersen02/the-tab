import { Martini, ShieldCheck, Trophy } from "lucide-react";
import { shadows } from "@/lib/shadows";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AppText } from "@/components/common/AppText";

export function LeaderboardHighlights() {
  const highlights = [
    {
      title: "Biggest Session",
      value: "8.5",
      detail: "Tyler · Friday Night Alpha",
      icon: Trophy,
    },
    {
      title: "Most Verified",
      value: "92%",
      detail: "Mike",
      icon: ShieldCheck,
    },
    {
      title: "Bonus King",
      value: "7",
      detail: "Dan · shots/cocktails",
      icon: Martini,
    },
  ];

  return (
    <>
      <div className="mb-4">
        <SectionHeader title="Quick Records" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`min-w-[150px] rounded-[24px] border border-medium-gray bg-white p-4 ${shadows.compact}`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-papaya">
                <Icon className="h-5 w-5 text-orange" />
              </div>

              <AppText variant="tinyLabel" className="mt-3">
                {item.title}
              </AppText>

              <AppText as="p" variant="statValue" className="mt-1">
                {item.value}
              </AppText>

              <AppText variant="meta" className="mt-1 line-clamp-2">
                {item.detail}
              </AppText>
            </div>
          );
        })}
      </div>
    </>
  );
}
