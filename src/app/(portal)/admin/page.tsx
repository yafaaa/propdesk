"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Wrench, AlertCircle, CalendarClock, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/context";
import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "@/actions/dashboard";

export default function Dashboard() {
  const { t } = useI18n();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const month = "2026-08"; // Mock period selector
        const data = await getAdminDashboardStats(month);
        setStats(data);
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">{t('loading')}</div>;
  }

  if (error || !stats) {
    return <div className="p-8 text-center text-destructive">Error: {error}</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t('dashboard')}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            {t('export_report')}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('slips_in_review')}</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.slipsInReview}</div>
            <p className="text-xs text-muted-foreground">Active submissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('active_tickets')}</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTickets}</div>
            <p className="text-xs text-muted-foreground">{stats.urgentTickets} urgent, {stats.normalTickets} normal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('overdue_units')}</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overdueUnits}</div>
            <p className="text-xs text-muted-foreground">Unpaid past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('upcoming_upkeep')}</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingUpkeep}</div>
            <p className="text-xs text-muted-foreground">Scheduled for this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{t('today_actions')}</CardTitle>
            <CardDescription>{t('tasks_attention')}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="h-24 flex-col gap-2" variant="outline" asChild>
              <Link href="/admin/invoices">
                <FileText className="h-6 w-6" />
                {t('review_payments')} ({stats.slipsInReview})
              </Link>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" asChild>
              <Link href="/admin/invoices">
                <AlertCircle className="h-6 w-6" />
                {t('follow_up_overdue')} ({stats.overdueUnits})
              </Link>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" asChild>
              <Link href="/admin/maintenance">
                <Wrench className="h-6 w-6" />
                {t('manage_work_orders')} ({stats.activeTickets})
              </Link>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" asChild>
              <Link href="/admin/calendar">
                <CalendarClock className="h-6 w-6" />
                {t('schedule_upkeep')}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>{t('collection_progress')} (Aug 2026)</CardTitle>
            <CardDescription>{t('monthly_target_vs_actuals')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t('collected')} ({stats.collection.percentage}%)</span>
                <span className="text-sm font-medium">{stats.collection.collected} ETB</span>
              </div>
              <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-primary" style={{ width: `${stats.collection.percentage}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('still_owed')}:</span>
                <span className="font-medium">{stats.collection.stillOwed} ETB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('invoices_paid')}:</span>
                <span className="font-medium">{stats.collection.invoicesPaid} of {stats.collection.totalInvoices}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('occupancy')}:</span>
                <span className="font-medium">{stats.collection.occupiedUnits} of {stats.collection.totalUnits} Units</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('utilities')}:</span>
                <span className="font-medium">{stats.collection.waterConsumption} m³ Water | {stats.collection.powerConsumption} kWh Power</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
