import Link from "next/link";
import { LayoutDashboard, FileText, Wrench, Megaphone, CalendarDays, Users, Settings } from "lucide-react";

export function Sidebar({ role = "ADMIN" }: { role?: string }) {

  const renderLinks = () => {
    if (role === 'RESIDENT' || role === 'UNIT_OWNER') {
      return (
        <>
          <Link href="/resident" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <LayoutDashboard className="h-4 w-4" /> Home
          </Link>
          <Link href="/resident/dues" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <FileText className="h-4 w-4" /> Dues
          </Link>
          <Link href="/resident/messages" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Megaphone className="h-4 w-4" /> Messages
          </Link>
          <Link href="/resident/tickets" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Wrench className="h-4 w-4" /> Tickets
          </Link>
          <Link href="/resident/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users className="h-4 w-4" /> Profile
          </Link>
        </>
      );
    } else if (role === 'STAFF' || role === 'MAINTENANCE') {
      return (
        <>
          <Link href="/maintenance" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <LayoutDashboard className="h-4 w-4" /> Home
          </Link>
          <Link href="/maintenance/tools" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Wrench className="h-4 w-4" /> Workspace
          </Link>
          <Link href="/maintenance/messages" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Megaphone className="h-4 w-4" /> Messages
          </Link>
          <Link href="/maintenance/tickets" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Wrench className="h-4 w-4" /> Maintenance
          </Link>
          <Link href="/maintenance/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users className="h-4 w-4" /> Profile
          </Link>
        </>
      );
    } else {
      // Default to ADMIN
      return (
        <>
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/admin/invoices" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <FileText className="h-4 w-4" /> Invoices & Payments
          </Link>
          <Link href="/admin/maintenance" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Wrench className="h-4 w-4" /> Maintenance
          </Link>
          <Link href="/admin/announcements" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Megaphone className="h-4 w-4" /> Announcements
          </Link>
          <Link href="/admin/calendar" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <CalendarDays className="h-4 w-4" /> Upkeep Calendar
          </Link>
          <Link href="/admin/community" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users className="h-4 w-4" /> Community & Association
          </Link>
        </>
      );
    }
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/20">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="font-bold text-lg text-primary">etpropdesk</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
          {renderLinks()}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </div>
  );
}
