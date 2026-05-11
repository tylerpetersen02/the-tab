import {
  Bell,
  Beer,
  Camera,
  Flame,
  MessageCircle,
  Plus,
} from "lucide-react";

type TabSession = {
  id: string;
  title: string;
  subtitle: string;
  status: "live" | "ended";
  members: string[];
  extraMembers?: number;
  beers: number;
  pintScore: number;
  shots: number;
  media: number;
  lastActivity: string;
  imageGradient: string;
};

const activeTab: TabSession = {
  id: "1",
  title: "Friday Night Alpha",
  subtitle: "Tyler, Mike, Dan, Ryan +2",
  status: "live",
  members: ["TP", "MK", "DN", "RY"],
  extraMembers: 2,
  beers: 18,
  pintScore: 16.5,
  shots: 4,
  media: 7,
  lastActivity: "Last drink 8m ago",
  imageGradient: "from-[#0b2f35] via-[#15616d] to-[#8f6f4e]",
};

const recentTabs: TabSession[] = [
  {
    id: "2",
    title: "Paso Trip Day 1",
    subtitle: "May 3, 2026 · Paso Robles, CA",
    status: "ended",
    members: ["TP", "MK", "DN", "RY"],
    extraMembers: 1,
    beers: 22,
    pintScore: 19.0,
    shots: 5,
    media: 11,
    lastActivity: "Ended yesterday",
    imageGradient: "from-[#15616d] via-[#9bc8e8] to-[#f4a261]",
  },
  {
    id: "3",
    title: "Brewery Crawl",
    subtitle: "May 1, 2026 · San Diego, CA",
    status: "ended",
    members: ["TP", "MK", "DN"],
    extraMembers: 2,
    beers: 15,
    pintScore: 12.5,
    shots: 3,
    media: 8,
    lastActivity: "Ended last week",
    imageGradient: "from-[#001524] via-[#15616d] to-[#6FAFA5]",
  },
];

export default function FeedPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#001524]">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-36 pt-3">
        <FeedHeader />

        <section className="mt-5">
          <SectionHeader
            title="Active Now"
            icon={<Flame className="h-4 w-4 fill-[#ff7d00] text-[#ff7d00]" />}
          />

          <FeaturedTabCard tab={activeTab} />
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <SectionHeader title="Recent Tabs" noMargin />
            <button className="text-sm font-semibold text-[#15616d]">
              View all
            </button>
          </div>

          <div className="space-y-4">
            {recentTabs.map((tab) => (
              <RecentTabCard key={tab.id} tab={tab} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function FeedHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-[30px] font-black italic leading-none tracking-tight text-[#001524]">
          The Tab
        </h1>
        <p className="mt-1 text-[13px] font-semibold text-[#8B8680]">
          Tonight&apos;s receipts.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4D0CC] bg-white shadow-[0_4px_14px_rgba(0,21,36,0.06)]">
          <Bell className="h-5 w-5 text-[#001524]" />
        </button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#D4D0CC] shadow-[0_6px_18px_rgba(0,21,36,0.08)] ring-1 ring-[#D4D0CC]">
          TP
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#ff7d00]" />
        </button>
      </div>
    </header>
  );
}

function SectionHeader({
  title,
  icon,
  noMargin = false,
}: {
  title: string;
  icon?: React.ReactNode;
  noMargin?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 ${noMargin ? "" : "mb-4"}`}>
      <h2 className="text-[13px] font-black uppercase leading-none tracking-[0.08em] text-[#001524]">
        {title}
      </h2>
      {icon}
    </div>
  );
}

function FeaturedTabCard({ tab }: { tab: TabSession }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#D4D0CC] bg-white shadow-[0_10px_30px_rgba(0,21,36,0.08)]">
      <div className="relative p-3 pb-0">
        <div
          className={`relative h-[150px] overflow-hidden rounded-[26px] bg-gradient-to-br ${tab.imageGradient}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.30),transparent_28%),linear-gradient(to_top,rgba(0,21,36,0.55),transparent_62%)]" />

          <span className="absolute left-4 top-4 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#001524] shadow-sm">
            Live
          </span>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-[11px] font-black uppercase tracking-wide text-white/85">
              Current Tab
            </p>

            <div className="mt-1 flex items-end justify-between gap-3">
              <h3 className="min-w-0 text-[24px] font-extrabold leading-tight text-white">
                {tab.title}
              </h3>

              <div className="flex h-12 w-12 shrink-0 rotate-3 items-center justify-center rounded-2xl bg-white shadow-md">
                <Beer className="h-7 w-7 text-[#ff7d00]" />
              </div>
            </div>
          </div>
        </div>

        <Tape className="right-8 top-2 rotate-6" />
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center justify-between gap-3">
          <AvatarStack members={tab.members} extraMembers={tab.extraMembers} />

          <button className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#D4D0CC] bg-[#FAFAF8] px-3 py-1.5 text-sm font-bold text-[#001524]">
            <Plus className="h-4 w-4 text-[#ff7d00]" />
            Invite
          </button>
        </div>

        <StatsGrid tab={tab} />

        <div className="mt-4 border-t border-[#D4D0CC] pt-3">
          <p className="text-sm font-semibold text-[#8B8680]">
            {tab.lastActivity}
          </p>
        </div>
      </div>
    </article>
  );
}

function RecentTabCard({ tab }: { tab: TabSession }) {
  return (
    <article className="overflow-hidden rounded-[24px] border border-[#D4D0CC] bg-white p-4 shadow-[0_6px_22px_rgba(0,21,36,0.06)]">
      <div className="flex gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[22px] font-extrabold leading-tight text-[#001524]">
            {tab.title}
          </h3>

          <p className="mt-1 truncate text-xs font-semibold text-[#8B8680]">
            {tab.subtitle}
          </p>

          <div className="mt-3">
            <AvatarStack
              members={tab.members}
              extraMembers={tab.extraMembers}
              size="sm"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 divide-x divide-[#D4D0CC] rounded-2xl bg-[#FAFAF8] py-3">
            <MiniStat value={tab.beers} label="Beers" />
            <MiniStat value={tab.pintScore} label="Pint Score" />
            <MiniStat value={tab.shots} label="Shots" />
          </div>
        </div>

        <div className="relative mt-1 h-[88px] w-[72px] shrink-0 rounded-[16px] bg-white p-1.5 shadow-[0_6px_14px_rgba(0,21,36,0.08)]">
          <div
            className={`h-full w-full rounded-[14px] bg-gradient-to-br ${tab.imageGradient}`}
          >
            <div className="h-full w-full rounded-[14px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_28%),linear-gradient(to_top,rgba(0,21,36,0.35),transparent)]" />
          </div>
        </div>
      </div>
    </article>
  );
}

function StatsGrid({ tab }: { tab: TabSession }) {
  return (
    <div className="mt-4 grid grid-cols-4 divide-x divide-[#D4D0CC] rounded-2xl bg-[#FAFAF8] py-2.5">
      <MiniStat value={tab.beers} label="Beers" />
      <MiniStat value={tab.pintScore} label="Pint Score" />
      <MiniStat value={tab.shots} label="Shots" />
      <MiniStat value={tab.media} label="Media" />
    </div>
  );
}

function MiniStat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="px-2 text-center">
      <p className="text-[17px] font-black leading-none text-[#001524]">
        {value}
      </p>
      <p className="mt-1 text-[10px] font-black uppercase leading-none tracking-wide text-[#8B8680]">
        {label}
      </p>
    </div>
  );
}

function AvatarStack({
  members,
  extraMembers,
  size = "md",
}: {
  members: string[];
  extraMembers?: number;
  size?: "sm" | "md";
}) {
  const dimensions =
    size === "sm"
      ? "h-8 w-8 text-[10px] -ml-1.5 first:ml-0"
      : "h-9 w-9 text-xs -ml-1.5 first:ml-0";

  const colors = [
    "bg-[#15616d]",
    "bg-[#ff7d00]",
    "bg-[#001524]",
    "bg-[#6FAFA5]",
  ];

  return (
    <div className="flex items-center pl-0.5">
      {members.map((member, index) => (
        <div
          key={`${member}-${index}`}
          className={`${dimensions} flex items-center justify-center rounded-full border-2 border-white font-black text-white shadow-sm ${
            colors[index % colors.length]
          }`}
        >
          {member}
        </div>
      ))}

      {extraMembers ? (
        <div
          className={`${dimensions} flex items-center justify-center rounded-full border-2 border-white bg-[#D4D0CC] font-black text-[#001524] shadow-sm`}
        >
          +{extraMembers}
        </div>
      ) : null}
    </div>
  );
}

function Tape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute h-6 w-16 rounded-sm bg-[#F2C14E]/50 shadow-sm backdrop-blur-[1px] ${className}`}
    />
  );
}
