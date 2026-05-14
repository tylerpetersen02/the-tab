interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageSection({ children, className = "" }: PageSectionProps) {
  return <section className={`mt-6 px-4 ${className}`}>{children}</section>;
}
