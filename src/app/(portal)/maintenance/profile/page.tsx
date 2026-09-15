"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Wrench, Plus, ClipboardList, Droplets } from "lucide-react";

export default function MaintenanceProfilePage() {
  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 pb-12">

      {/* Identity Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-orange-500/20">
              <AvatarFallback className="bg-orange-50 text-orange-600 text-xl font-bold">TC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">Techy Charlie</h1>
                <Badge className="bg-orange-500 hover:bg-orange-600">Maintenance staff</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                charlie.fix@example.com <br/>
                +251 911 234 567
              </p>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                Demo Unit owner association, Addis Ababa
                <br/> Member since Jan 2025
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">4</div>
            <div className="text-xs text-muted-foreground uppercase font-medium mt-1">Open</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">2</div>
            <div className="text-xs text-muted-foreground uppercase font-medium mt-1">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">14</div>
            <div className="text-xs text-muted-foreground uppercase font-medium mt-1">Done (MTD)</div>
          </CardContent>
        </Card>
      </div>

      {/* Direct Actions */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Work Orders</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Button className="h-auto py-4 flex-col gap-2 bg-orange-500 hover:bg-orange-600">
            <Plus className="h-5 w-5" />
            <span>Log ticket</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
            <span>All tickets</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <span>Unit water meters</span>
          </Button>
        </div>
      </div>

    </div>
  );
}
