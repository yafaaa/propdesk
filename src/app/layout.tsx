import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
