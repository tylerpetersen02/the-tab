interface SafeAreaWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SafeAreaWrapper({ children, className = "" }: SafeAreaWrapperProps) {
  return <div className={`${className}`}>{children}</div>;
}
