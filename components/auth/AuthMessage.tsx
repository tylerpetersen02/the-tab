import { AppText } from "@/components/common/AppText";

export function AuthMessage({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center space-y-2 mb-8">
      <AppText as="h1" variant="pageTitle" className="text-ink">
        {title}
      </AppText>
      {subtitle && (
        <AppText variant="body" className="text-dark-gray">
          {subtitle}
        </AppText>
      )}
    </div>
  );
}
