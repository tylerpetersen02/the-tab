import { cn } from "@/lib/utils";

export type AppTextVariant =
  | "brand"
  | "pageTitle"
  | "pageSubtitle"
  | "sectionLabel"
  | "cardTitle"
  | "body"
  | "bodySmall"
  | "meta"
  | "tinyLabel"
  | "statValue"
  | "statLabel";

interface AppTextProps {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "div";
  variant?: AppTextVariant;
  className?: string;
  children: React.ReactNode;
}

const textVariants: Record<AppTextVariant, string> = {
  brand:
    "text-[34px] font-black italic leading-none tracking-[-0.04em] text-ink",

  pageTitle:
    "text-[28px] font-black leading-tight tracking-[-0.03em] text-ink",

  pageSubtitle:
    "mt-1 text-[13px] font-semibold leading-snug text-dark-gray",

  sectionLabel:
    "text-[13px] font-black uppercase leading-none tracking-[0.08em] text-ink",

  cardTitle:
    "text-[18px] font-black leading-tight tracking-[-0.02em] text-ink",

  body:
    "text-sm font-semibold leading-relaxed text-ink",

  bodySmall:
    "text-xs font-semibold leading-snug text-ink",

  meta:
    "text-[12px] font-semibold leading-snug text-dark-gray",

  tinyLabel:
    "text-[10px] font-black uppercase leading-none tracking-[0.08em] text-dark-gray",

  statValue:
    "text-2xl font-black leading-none text-ink",

  statLabel:
    "mt-1 text-[10px] font-black uppercase leading-none tracking-[0.08em] text-dark-gray",
};

export function AppText({
  as = "p",
  variant = "body",
  className,
  children,
}: AppTextProps) {
  const Component = as;

  return (
    <Component className={cn(textVariants[variant], className)}>
      {children}
    </Component>
  );
}
