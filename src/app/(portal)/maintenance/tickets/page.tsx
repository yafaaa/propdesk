"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, Clock, AlertTriangle } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { markTicketDoing, markTicketDone } from "@/actions/maintenance";

export default function MaintenanceTicketsPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t('maintenance')}</h1>
      </div>

      <div className="space-y-4">
        {/* Mocked Assigned Ticket */}
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                <Badge variant="secondary" className="text-xs rounded-full font-normal">Assigned</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button onClick={async () => {
                try {
                  await markTicketDoing('mock-ticket-id');
                  alert('Ticket status changed to DOING (mock)');
                } catch(e) {
                  alert('Error updating ticket');
                }
              }}>Mark Doing</Button>
              <Button variant="outline" onClick={async () => {
                try {
                  await markTicketDone('mock-ticket-id');
                  alert('Ticket status changed to DONE (mock)');
                } catch(e) {
                  alert('Error updating ticket');
                }
              }}>Mark Done</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
