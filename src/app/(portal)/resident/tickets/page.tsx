"use client";

import { Wrench, Plus, Filter, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { submitMaintenanceTicket } from "@/actions/resident";
import { useState } from "react";

export default function ResidentTicketsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row gap-4 overflow-hidden -mx-4 -mb-4 p-4 md:-mx-6 md:-mb-6 md:p-6 lg:gap-6 relative">

      {/* Left Column - Queue */}
      <div className="flex w-full flex-col md:w-1/3 lg:w-[400px] gap-4 bg-background border rounded-lg overflow-hidden">
        <div className="p-4 pb-0 space-y-4">
          <h2 className="font-semibold text-lg">My Tickets</h2>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Badge variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-muted font-medium bg-muted">All</Badge>
            <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted font-medium">Open</Badge>
            <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted font-medium">Active</Badge>
            <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted font-medium">Done</Badge>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2 space-y-2">
          {/* Ticket Item */}
          <div className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 border-primary bg-muted/20">
            <div className="flex items-center justify-between mb-1">
              <Badge variant="outline" className="font-mono bg-background">101</Badge>
              <Badge variant="secondary" className="text-[10px] bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Open</Badge>
            </div>
            <h3 className="font-semibold text-sm line-clamp-1">Elevator slow on floor 1</h3>
            <p className="text-xs text-muted-foreground mt-1">Unit 101 · Abebe Kebede · Normal · Elevator</p>
          </div>
        </div>
      </div>

      {/* Right Column - Details */}
      <div className="flex-1 bg-background border rounded-lg overflow-hidden flex flex-col hidden md:flex">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">Elevator slow on floor 1</h2>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Open</Badge>
                <span>•</span>
                <span>Reported Aug 28, 2026</span>
              </div>
            </div>
            <Button variant="outline" size="sm">Edit / Cancel</Button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Ticket Logged</p>
                <p className="text-sm text-muted-foreground mt-1">The elevator door on the 1st floor takes unusually long to close and makes a grinding sound.</p>
                <span className="text-[10px] text-muted-foreground mt-2 block">Aug 28, 10:45 AM</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Visit Scheduled</p>
                <p className="text-sm text-muted-foreground mt-1">Technician has scheduled a visit.</p>
                <div className="mt-2 p-3 bg-muted/50 rounded border text-sm font-medium">
                  Expected: Sep 9, 2026 at 10:00 AM
                </div>
                <span className="text-[10px] text-muted-foreground mt-2 block">Aug 29, 09:12 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
         onClick={() => setShowModal(true)}
         size="lg"
         className="absolute bottom-6 md:bottom-10 right-6 md:right-10 rounded-full shadow-lg gap-2 h-12 px-6"
      >
        <Plus className="h-5 w-5" />
        New Request
      </Button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
             <form action={async (formData) => {
                 try {
                     await submitMaintenanceTicket(formData);
                     setShowModal(false);
                 } catch (e) {
                     alert("Mock DB error: " + e);
                 }
             }}>
                <div className="p-6 space-y-4">
                   <h2 className="text-xl font-bold">New Maintenance Request</h2>
                   <div className="space-y-2">
                     <label className="text-sm font-medium">Title</label>
                     <Input name="title" required placeholder="Brief description of the issue" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium">Description</label>
                     <Input name="description" required placeholder="Detailed explanation" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium">Category</label>
                     <select name="category" className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
                        <option value="PLUMBING">Plumbing</option>
                        <option value="ELECTRICAL">Electrical</option>
                        <option value="ELEVATOR">Elevator</option>
                        <option value="DOORS_WINDOWS">Doors / Windows</option>
                        <option value="OTHER">Other</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium">Priority</label>
                     <select name="priority" className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
                        <option value="NORMAL">Normal</option>
                        <option value="URGENT">Urgent</option>
                     </select>
                   </div>
                </div>
                <div className="p-6 border-t flex justify-end gap-3 bg-muted/20">
                   <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                   <Button type="submit">Submit Request</Button>
                </div>
             </form>
          </Card>
        </div>
      )}
    </div>
  );
}
