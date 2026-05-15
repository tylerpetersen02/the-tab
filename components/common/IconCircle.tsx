interface IconCircleProps {
  children: React.ReactNode;
  className?: string;
}

export function IconCircle({ children, className = "" }: IconCircleProps) {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-medium-gray bg-white shadow-[0_4px_14px_rgba(0,21,36,0.04)] hover:shadow-[0_6px_16px_rgba(0,21,36,0.06)] transition-shadow ${className}`}
    >
      {children}
    </button>
  );
}
