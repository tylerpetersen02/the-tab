interface AppPageProps {
  children: React.ReactNode;
}

export function AppPage({ children }: AppPageProps) {
  return (
    <main className="min-h-dvh bg-off-white text-ink">
      <div className="mx-auto w-full max-w-md pb-44">
        {children}
      </div>
    </main>
  );
}
