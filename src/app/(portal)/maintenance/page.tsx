"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus, CalendarClock, Ticket, Receipt, Settings, FileSpreadsheet,
  Droplets, Zap, Activity, AlertTriangle, MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function MaintenanceDashboard() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-lg">
        <h1 className="text-2xl font-bold tracking-tight text-orange-700">Demo Unit owner association</h1>
        <p className="text-sm font-medium text-orange-600/80 mt-1 uppercase tracking-wider">Facility Operations</p>
      </div>

      {/* Metric Strip */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">2</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">OPEN URGENT NOW</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">14</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">RESOLVED THIS MONTH</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">96%</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">METERS SUBMITTED</div>
          </CardContent>
        </Card>
      </div>

      {/* Water Tanker Live Widget */}
      <Card className="border-l-4 border-l-blue-500 hover:bg-muted/30 cursor-pointer transition-colors">
        <Link href="/maintenance/tools" className="block w-full h-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                Water Tanker Reserve Live
              </h3>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Online</Badge>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Ground Tank</span>
                  <span>68%</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '68%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Roof Tank</span>
                  <span className="text-amber-600">41%</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '41%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      {/* Quick Actions Row */}
      <div>
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="px-3 py-1.5 cursor-pointer hover:bg-muted bg-muted/50 text-foreground font-normal border">
            + Add expense
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 cursor-pointer hover:bg-muted bg-muted/50 text-foreground font-normal border">
            Expenses
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 cursor-pointer hover:bg-muted bg-muted/50 text-foreground font-normal border">
            Announcement
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 cursor-pointer hover:bg-muted bg-muted/50 text-foreground font-normal border">
            Tickets
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 cursor-pointer hover:bg-muted bg-muted/50 text-foreground font-normal border">
            Supplies
          </Badge>
          <Badge variant="secondary" className="px-3 py-1.5 cursor-pointer hover:bg-muted bg-muted/50 text-foreground font-normal border">
            Unpaid follow-up
          </Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Needs Attention */}
        <div className="space-y-3">
          <h3 className="font-semibold">Needs Attention</h3>
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4 border-b hover:bg-muted/30 cursor-pointer">
                <div className="flex items-center gap-3">
                  <CalendarClock className="h-5 w-5 text-amber-500" />
                  <span className="font-medium text-sm">Next: 2 visits today</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border-b hover:bg-muted/30 cursor-pointer">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <span className="font-medium text-sm">4 open maintenance tickets</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 hover:bg-muted/30 cursor-pointer">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-sm">2 reminders due soon</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card className="hover:bg-muted/30 cursor-pointer transition-colors bg-blue-50/50">
              <CardContent className="p-4 text-center">
                <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <h4 className="font-medium text-sm">Water meters</h4>
              </CardContent>
            </Card>
            <Card className="hover:bg-muted/30 cursor-pointer transition-colors bg-yellow-50/50">
              <CardContent className="p-4 text-center">
                <Zap className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <h4 className="font-medium text-sm">Electric meters</h4>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-3">
          <h3 className="font-semibold">Activity Feed</h3>
          <Card className="h-[300px] overflow-y-auto">
            <CardContent className="p-4 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Ticket className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Ticket Logged</p>
                  <p className="text-xs text-muted-foreground">Unit 105: Shop shutter jammed</p>
                  <span className="text-[10px] text-muted-foreground">10 mins ago</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Activity className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Generator Test</p>
                  <p className="text-xs text-muted-foreground">Routine load test scheduled for tomorrow</p>
                  <span className="text-[10px] text-muted-foreground">2 hours ago</span>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Receipt className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">PO Approved</p>
                  <p className="text-xs text-muted-foreground">Plumbing supplies from Vendor X</p>
                  <span className="text-[10px] text-muted-foreground">Yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
