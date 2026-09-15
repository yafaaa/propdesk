"use client";

import { useState } from "react";
import { Megaphone, Send, Sparkles, Clock, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { dispatchAnnouncement } from "@/actions";

export default function AnnouncementsPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const templates = [
    "Power Outage", "Power Restored", "Water Outage", "Water Restored", "Elevator Down"
  ];

  const handleTemplateClick = (temp: string) => {
    setTitle(`Notice: ${temp}`);
    if (temp === "Water Outage") {
      setContent("Water pressure test tomorrow 10:00-12:00. Please store a few liters. -- Board");
    } else {
      setContent(`This is a standard notice regarding ${temp.toLowerCase()}.`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Building Announcements</h1>
        <p className="text-sm text-muted-foreground mt-1">Broadcast critical building notices to residents.</p>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg">Compose Notice</CardTitle>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-sm text-muted-foreground flex items-center mr-2">Templates:</span>
            {templates.map(t => (
              <Badge
                key={t}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/20"
                onClick={() => handleTemplateClick(t)}
              >
                {t}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="title">Announcement Title</Label>
            </div>
            <Input
              id="title"
              placeholder="e.g. Scheduled Maintenance"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content">Message Body</Label>
            </div>
            <Textarea
              id="content"
              placeholder="Type your announcement here..."
              className="min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="schedule" className="cursor-pointer">Schedule for later</Label>
              </div>
              <Switch id="schedule" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="specific-units" className="cursor-pointer">Send to specific units</Label>
              </div>
              <Switch id="specific-units" />
            </div>
          </div>

        </CardContent>
        <CardFooter className="bg-muted/30 pt-6">
          <Button
            className="w-full gap-2"
            onClick={async () => {
              // Mock UI calling Server Action
              // await dispatchAnnouncement({ title, body: content, targetScope: 'ALL_RESIDENTS', isPinned: false });
              alert("Announcement Dispatched via Server Action (Mocked)");
            }}
          >
            <Send className="h-4 w-4" />
            Send to All Residents
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
