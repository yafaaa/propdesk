"use client";

import { AlertTriangle, Clock, Wrench, Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { claimTicket } from "@/actions";

export default function MaintenancePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance Board</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage building work orders and repairs.</p>
        </div>
        <Button className="shrink-0 gap-2">
          <Plus className="h-4 w-4" />
          Log Ticket
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col space-y-4">

        {/* Overdue Alert Banner */}
        <Card className="bg-amber-100/50 border-amber-200">
          <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-800 text-sm font-medium">
              <Clock className="h-4 w-4" />
              4 overdue reminders - Open schedule
            </div>
            <Button size="sm" variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-200 h-8">
              View Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Board Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="active" className="gap-2">
                4 active
              </TabsTrigger>
              <TabsTrigger value="open" className="gap-2">
                Active (2)
              </TabsTrigger>
              <TabsTrigger value="doing" className="gap-2">
                Doing (2)
              </TabsTrigger>
              <TabsTrigger value="urgent" className="gap-2">
                Urgent (0)
              </TabsTrigger>
              <TabsTrigger value="done" className="gap-2">
                Done (0)
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tickets..." className="pl-8 h-9" />
              </div>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <Filter className="h-4 w-4" />
                My Queue
              </Button>
            </div>
          </div>

          <TabsContent value="active" className="mt-4 space-y-4">
            {/* Ticket Card 1 */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row border-l-4 border-l-border">
                <div className="p-4 flex flex-col justify-center bg-muted/20 md:w-32 border-b md:border-b-0 md:border-r">
                  <Badge variant="outline" className="w-fit mb-1 font-mono">UNIT 105</Badge>
                  <span className="text-xs text-muted-foreground font-medium">Shop 105</span>
                </div>

                <div className="p-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-base leading-none">Shop shutter jammed</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><Wrench className="h-3 w-3" /> Doors / Windows</span>
                      <span>•</span>
                      <span>4d ago</span>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs rounded-full font-normal">Open</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      onClick={async () => {
                        // await claimTicket('mock-ticket-id');
                        alert("Ticket claimed via Server Action (Mocked)");
                      }}
                    >Claim & start</Button>
                    <Button
                      onClick={async () => {
                        // await claimTicket('mock-ticket-id');
                        alert("Ticket claimed via Server Action (Mocked)");
                      }}
                    >Claim & start</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Ticket Card 2 */}
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row border-l-4 border-l-red-500">
                <div className="p-4 flex flex-col justify-center bg-muted/20 md:w-32 border-b md:border-b-0 md:border-r">
                  <Badge variant="outline" className="w-fit mb-1 font-mono border-red-200 text-red-600 bg-red-50">UNIT 101</Badge>
                  <span className="text-xs text-muted-foreground font-medium truncate">Abebe Kebede</span>
                </div>

                <div className="p-4 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base leading-none">Elevator slow on floor 1</h3>
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><Wrench className="h-3 w-3" /> Elevator</span>
                      <span>•</span>
                      <span className="text-amber-600 font-medium flex items-center gap-1"><Clock className="h-3 w-3" /> Visit Sep 9 10:00 AM</span>
                      <span>•</span>
                      <Badge variant="secondary" className="text-xs rounded-full font-normal">Open</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button>Claim & start</Button>
                  </div>
                </div>
              </div>
            </Card>

          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
