"use client";

import { useState } from "react";
import { Plus, Calendar as CalendarIcon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function UpkeepCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 8, 9)); // September 9, 2026

  // Mock events for the legend and calendar
  // We simulate the color dots by injecting simple styles/elements in this view.
  // Real implementation would use the modifiers prop on DayPicker.

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Upkeep Schedule</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage date-sensitive building operations.</p>
        </div>
        <Button className="shrink-0 gap-2">
          <Plus className="h-4 w-4" />
          Add Reminder
        </Button>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">All Reminders</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-0 sm:flex">
              {/* Calendar Section */}
              <div className="p-6 border-b sm:border-b-0 sm:border-r flex-1 flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={new Date(2026, 8)}
                  className="rounded-md w-full max-w-[350px]"
                />
              </div>

              {/* Day Inspector Section */}
              <div className="p-6 w-full sm:w-[350px] bg-muted/10 flex flex-col">
                <div className="font-semibold mb-4">
                  {date ? format(date, "EEEE, MMMM do, yyyy") : "Select a date"}
                </div>

                <div className="flex-1">
                  {date && date.getDate() === 9 ? (
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg bg-red-50 border-red-200">
                        <div className="flex items-center gap-2 text-red-600 font-medium mb-1 text-sm">
                          <div className="w-2 h-2 rounded-full bg-red-600"></div>
                          Open Ticket
                        </div>
                        <p className="text-sm font-medium">Elevator slow on floor 1</p>
                        <p className="text-xs text-muted-foreground mt-1">Unit 101 - Scheduled Visit 10:00 AM</p>
                      </div>
                    </div>
                  ) : date && date.getDate() === 5 ? (
                     <div className="space-y-4">
                      <div className="p-3 border rounded-lg bg-cyan-50 border-cyan-200">
                        <div className="flex items-center gap-2 text-cyan-700 font-medium mb-1 text-sm">
                          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                          Meter Deadline
                        </div>
                        <p className="text-sm font-medium">Record Water Meters</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-32 flex flex-col items-center justify-center text-muted-foreground opacity-50">
                      <CalendarIcon className="h-8 w-8 mb-2" />
                      <span className="text-sm">No events on this day</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-muted-foreground">
                <Info className="h-4 w-4" />
                Color Legend
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#A0522D]"></div>
                  Maintenance (Brown)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#1E3A8A]"></div>
                  Invoice Day (Blue)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#06B6D4]"></div>
                  Meter Deadline (Cyan)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#16A34A]"></div>
                  Announcement (Green)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#7C3AED]"></div>
                  Invoice Issued (Purple)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#DC2626]"></div>
                  Open Ticket (Red)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground py-12">
              List view of reminders would appear here.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
