import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In a real app we'd get this from session. For now we mock it based on headers or default to ADMIN.
  const headersList = await headers();
  const role = headersList.get('x-user-role') || 'ADMIN';

  // Note: Sidebar will need to be updated to render role-specific links.

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar role={role} />
      </div>
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
