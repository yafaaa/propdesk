import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Wrench, AlertCircle, CalendarClock, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slips in Review</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">212</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 urgent, 2 normal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Units</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">59</div>
            <p className="text-xs text-muted-foreground">-4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Upkeep</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Scheduled for this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Today Actions</CardTitle>
            <CardDescription>Tasks requiring your immediate attention.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="h-24 flex-col gap-2" variant="outline" asChild>
              <Link href="/admin/invoices">
                <FileText className="h-6 w-6" />
                Review Payments (212)
              </Link>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" asChild>
              <Link href="/admin/invoices">
                <AlertCircle className="h-6 w-6" />
                Follow up Overdue (59)
              </Link>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" asChild>
              <Link href="/admin/maintenance">
                <Wrench className="h-6 w-6" />
                Manage Work Orders (4)
              </Link>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" asChild>
              <Link href="/admin/calendar">
                <CalendarClock className="h-6 w-6" />
                Schedule Upkeep
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Collection Progress (Aug 2026)</CardTitle>
            <CardDescription>Monthly target vs actuals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Collected (40%)</span>
                <span className="text-sm font-medium">467,213 ETB</span>
              </div>
              <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-primary" style={{ width: "40%" }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Still Owed:</span>
                <span className="font-medium">698,021 ETB</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Invoices Paid:</span>
                <span className="font-medium">35 of 90</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Occupancy:</span>
                <span className="font-medium">102 of 102 Units</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Utilities:</span>
                <span className="font-medium">896 m³ Water | 11,763 kWh Power</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
