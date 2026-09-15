import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/i18n/context";

export const metadata: Metadata = {
  title: "etpropdesk - Property Management",
  description: "All-in-one digital command center for building owners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
