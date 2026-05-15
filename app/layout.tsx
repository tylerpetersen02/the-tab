import type { Metadata, Viewport } from "next";
import { AuthClientShell } from "@/components/auth/AuthClientShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Tab",
  description: "A social drinking tab tracker for friend groups",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="w-full bg-off-white">
        <AuthClientShell>{children}</AuthClientShell>
      </body>
    </html>
  );
}
