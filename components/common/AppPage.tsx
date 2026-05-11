interface AppPageProps {
  children: React.ReactNode;
}

export function AppPage({ children }: AppPageProps) {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#001524]">
      <div className="mx-auto w-full max-w-md pb-36">
        {children}
      </div>
    </main>
  );
}
