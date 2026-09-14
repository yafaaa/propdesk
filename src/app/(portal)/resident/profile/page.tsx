"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building, ChevronRight, HelpCircle, FileText, Bot,
  MessageSquareWarning, BookOpen, Shield, Info, Smartphone
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TelegramBridgeBox } from "@/components/portal/telegram-bridge";

export default function ResidentProfilePage() {
  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 pb-12">

      {/* Identity Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">AK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">Abebe Kebede</h1>
                <Badge variant="secondary">Resident</Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Building className="h-3.5 w-3.5" />
                Unit 101 · Demo Unit owner association
              </p>
              <div className="mt-3 text-sm space-y-1">
                <p>abebe.k@example.com</p>
                <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground uppercase font-medium mt-1">Bills Paid</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-xs text-muted-foreground uppercase font-medium mt-1">Maintenance</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">742</div>
            <div className="text-xs text-muted-foreground uppercase font-medium mt-1">Days Here</div>
          </CardContent>
        </Card>
      </div>

      {/* Telegram Bridge */}
      <TelegramBridgeBox />

      {/* Guidance */}
      <Card>
        <CardContent className="p-0">
          <Accordion className="w-full">
            <AccordionItem value="guidance" className="border-b-0 px-6">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-2 font-semibold">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  Guidance - 4 tips for your role
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Check the community rules before undertaking major unit renovations.</li>
                  <li>Upload payment slips clearly with transaction IDs visible.</li>
                  <li>Report critical water leaks as "Urgent" tickets immediately.</li>
                  <li>Join the Telegram bot for instant notifications on dues.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Unit Switcher */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
          <div>
            <h4 className="font-medium">Switch unit account</h4>
            <p className="text-xs text-muted-foreground mt-1">Switch or add unit accounts saved on this device</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardContent>
      </Card>

      {/* Resources Stack */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Resources</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col">
            {[
              { icon: FileText, label: "Documents" },
              { icon: HelpCircle, label: "Help & support" },
              { icon: Bot, label: "Ask AI" },
              { icon: Info, label: "Show tips again" },
              { icon: MessageSquareWarning, label: "Report Technical Problem" },
              { icon: BookOpen, label: "Community rules" },
              { icon: Shield, label: "Privacy Policy" },
              { icon: Info, label: "About PropDesk v1.0.2" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-muted/30 cursor-pointer">
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-50" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
