import { SafeAreaWrapper } from "./SafeAreaWrapper";

interface PageProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Page({ title, subtitle, children }: PageProps) {
  return (
    <SafeAreaWrapper className="flex flex-col flex-1 overflow-y-auto bg-off-white">
      {title && (
        <div className="px-4 pt-6 pb-4 bg-light-gray border-b border-medium-gray">
          <h1 className="text-3xl font-bold text-ink">{title}</h1>
          {subtitle && <p className="text-sm text-dark-gray mt-2">{subtitle}</p>}
        </div>
      )}
      <main className="flex-1 px-4 py-6 pb-28">{children}</main>
    </SafeAreaWrapper>
  );
}
