import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { AppText, type AppTextVariant } from "./AppText";

type AppButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "muted"
  | "ghost"
  | "danger";

type AppButtonSize = "sm" | "md" | "lg" | "icon";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

const variantStyles: Record<AppButtonVariant, string> = {
  primary:
    "bg-orange text-white border border-orange hover:bg-orange/90 shadow-[0_4px_14px_rgba(255,125,0,0.22)]",
  secondary:
    "bg-teal text-white border border-teal hover:bg-teal/90 shadow-[0_4px_14px_rgba(21,97,109,0.18)]",
  outline:
    "bg-white text-ink border border-medium-gray hover:bg-off-white",
  muted:
    "bg-off-white text-ink border border-medium-gray hover:bg-light-gray",
  ghost:
    "bg-transparent text-dark-gray border border-transparent hover:text-ink hover:bg-off-white",
  danger:
    "bg-red-500 text-white border border-red-500 hover:bg-red-600",
};

const sizeStyles: Record<AppButtonSize, string> = {
  sm: "h-9 px-3",
  md: "h-11 px-4",
  lg: "h-14 px-5",
  icon: "h-10 w-10 p-0",
};

const radiusStyles: Record<AppButtonSize, string> = {
  sm: "rounded-[16px]",
  md: "rounded-full",
  lg: "rounded-full",
  icon: "rounded-full",
};

const textVariants: Record<AppButtonSize, AppTextVariant> = {
  sm: "bodySmall",
  md: "bodySmall",
  lg: "cardTitle",
  icon: "body",
};

export function AppButton({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: AppButtonProps) {
  const isIconOnly = size === "icon";
  const textVariant = textVariants[size];

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        radiusStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isIconOnly ? (
        children
      ) : typeof children === "string" ? (
        <AppText as="span" variant={textVariant} className="text-inherit">
          {children}
        </AppText>
      ) : (
        children
      )}
    </button>
  );
}
