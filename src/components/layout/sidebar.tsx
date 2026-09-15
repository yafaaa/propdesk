"use client";

import Link from "next/link";
import { LayoutDashboard, FileText, Wrench, Megaphone, CalendarDays, Users, Settings } from "lucide-react";
import { useI18n } from "@/i18n/context";

export function Sidebar({ role = "ADMIN" }: { role?: string }) {
  const { t } = useI18n();

  const renderLinks = () => {
    if (role === 'RESIDENT' || role === 'UNIT_OWNER') {
      return (
        <>
          <Link href="/resident" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <LayoutDashboard className="h-4 w-4" /> {t('home')}
          </Link>
          <Link href="/resident/dues" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <FileText className="h-4 w-4" /> {t('dues')}
          </Link>
          <Link href="/resident/messages" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Megaphone className="h-4 w-4" /> {t('messages')}
          </Link>
          <Link href="/resident/tickets" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Wrench className="h-4 w-4" /> {t('tickets')}
          </Link>
          <Link href="/resident/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users className="h-4 w-4" /> {t('profile')}
          </Link>
        </>
      );
    } else if (role === 'STAFF' || role === 'MAINTENANCE') {
      return (
        <>
          <Link href="/maintenance" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <LayoutDashboard className="h-4 w-4" /> {t('home')}
          </Link>
          <Link href="/maintenance/tools" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Wrench className="h-4 w-4" /> {t('workspace')}
          </Link>
          <Link href="/maintenance/messages" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Megaphone className="h-4 w-4" /> {t('messages')}
          </Link>
          <Link href="/maintenance/tickets" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Wrench className="h-4 w-4" /> {t('maintenance')}
          </Link>
          <Link href="/maintenance/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users className="h-4 w-4" /> {t('profile')}
          </Link>
        </>
      );
    } else {
      // Default to ADMIN
      return (
        <>
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <LayoutDashboard className="h-4 w-4" /> {t('home')}
          </Link>
          <Link href="/admin/invoices" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <FileText className="h-4 w-4" /> {t('invoices_payments')}
          </Link>
          <Link href="/admin/community" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Megaphone className="h-4 w-4" /> {t('messages')}
          </Link>
          <Link href="/admin/maintenance" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Wrench className="h-4 w-4" /> {t('maintenance')}
          </Link>
          <Link href="/admin/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users className="h-4 w-4" /> {t('profile')}
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
          {t('settings')}
        </Link>
      </div>
    </div>
  );
}
