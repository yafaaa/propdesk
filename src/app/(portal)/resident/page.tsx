"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ChevronLeft, ChevronRight, FileText, Wrench, Megaphone, Gauge, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

export default function ResidentDashboard() {
  const hasInvoice = true; // Simulating state based on SRS

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Home</h1>
      </div>

      <div className="flex items-center justify-between bg-background p-3 rounded-lg border">
        <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
        <div className="font-semibold">August 2026</div>
        <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
      </div>

      {hasInvoice ? (
        <Card className="border-l-4 border-l-destructive shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">13,497 ETB</h2>
                  <Badge variant="destructive" className="uppercase text-[10px]">Unpaid</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Due on August 15, 2026
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto">View Bill</Button>
                <Button className="w-full md:w-auto" asChild>
                  <Link href="/resident/dues">Pay / Upload Slip</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <FileSpreadsheet className="h-10 w-10 text-muted-foreground mb-3 opacity-50" />
            <h3 className="font-medium">No invoice for August</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-sm">
              Your office hasn't posted this month's bill yet. Tap to view all bills.
            </p>
            <Button variant="outline" asChild>
              <Link href="/resident/dues">View all bills</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div>
        <h3 className="font-semibold text-lg mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-24 flex-col gap-2 bg-background hover:bg-muted/50" asChild>
            <Link href="/resident/tickets">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="text-sm">Report issue</span>
            </Link>
          </Button>

          <Button variant="outline" className="h-24 flex-col gap-2 bg-background hover:bg-muted/50" asChild>
            <Link href="/admin/announcements">
              <Megaphone className="h-6 w-6 text-primary" />
              <span className="text-sm">Announcements</span>
            </Link>
          </Button>

          <Button variant="outline" className="h-24 flex-col gap-2 bg-background hover:bg-muted/50">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-sm">Community rules</span>
          </Button>

          <Button variant="outline" className="h-24 flex-col gap-2 bg-background hover:bg-muted/50">
            <Gauge className="h-6 w-6 text-primary" />
            <span className="text-sm">Submit meter</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
