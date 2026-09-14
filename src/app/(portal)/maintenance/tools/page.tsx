"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets, Zap, Wrench, Megaphone, FileWarning,
  CalendarClock, BookOpen, Warehouse, ShoppingCart, Receipt
} from "lucide-react";
import Link from "next/link";

export default function MaintenanceToolsPage() {
  const tools = [
    {
      category: "Meters",
      items: [
        { icon: Droplets, title: "Water meters", desc: "Batch unit input", color: "text-blue-500", bg: "bg-blue-50" },
        { icon: Zap, title: "Electric meters", desc: "Batch kWh readings", color: "text-yellow-600", bg: "bg-yellow-50" },
      ]
    },
    {
      category: "Work Operations",
      items: [
        { icon: Wrench, title: "Work orders", desc: "4 active tickets", color: "text-orange-500", bg: "bg-orange-50", badge: "4" },
        { icon: Megaphone, title: "Announcements", desc: "Broadcast notices", color: "text-primary", bg: "bg-primary/10" },
        { icon: FileWarning, title: "Unpaid bills", desc: "Tenant delinquency", color: "text-destructive", bg: "bg-destructive/10" },
        { icon: CalendarClock, title: "Schedule", desc: "Preventative tasks", color: "text-emerald-500", bg: "bg-emerald-50" },
        { icon: BookOpen, title: "Assets & manuals", desc: "Fleet directory", color: "text-slate-500", bg: "bg-slate-100" },
        { icon: Droplets, title: "Tanker reserve", desc: "Sensor telemetry", color: "text-cyan-500", bg: "bg-cyan-50" },
        { icon: Warehouse, title: "Materials", desc: "Inventory tracking", color: "text-indigo-500", bg: "bg-indigo-50" },
        { icon: ShoppingCart, title: "Purchase orders", desc: "Vendor approvals", color: "text-violet-500", bg: "bg-violet-50" },
        { icon: Receipt, title: "Expenses", desc: "Log costs", color: "text-pink-500", bg: "bg-pink-50" },
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Maintenance Tools</h1>
        <p className="text-sm text-muted-foreground mt-1">Directory of facility operations and utilities.</p>
      </div>

      {tools.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <h2 className="text-lg font-semibold">{section.category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {section.items.map((item, i) => (
              <Card key={i} className="hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all group">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg ${item.bg}`}>
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    {item.badge && (
                      <Badge variant="destructive" className="rounded-full px-2">{item.badge}</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
