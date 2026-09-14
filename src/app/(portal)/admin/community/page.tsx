"use client";

import { Search, Heart, MessageSquare, Pin, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full h-[calc(100vh-6rem)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Community</h1>
        <p className="text-sm text-muted-foreground mt-1">Public announcements and private direct messages.</p>
      </div>

      <Tabs defaultValue="feed" className="w-full flex-1 flex flex-col min-h-0">
        <TabsList className="w-[400px]">
          <TabsTrigger value="feed" className="w-1/2">Feed</TabsTrigger>
          <TabsTrigger value="messages" className="w-1/2">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="flex-1 overflow-auto mt-4 pr-2">
          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Feed Post */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">AA</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        Association Admin
                        <span className="text-xs font-normal text-muted-foreground">(Unit A-001)</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Announcement</Badge>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-200 text-amber-700 bg-amber-50 flex items-center gap-1">
                          <Pin className="h-3 w-3" /> Pinned
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">4d ago</span>
                </div>

                <div className="text-sm space-y-2 text-foreground/90">
                  <p>Welcome to Demo Unit owner association. Mixed homes + shops seeded...</p>
                  <p>Please review the updated guidelines for waste disposal and common area usage on the board. We appreciate your cooperation.</p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-4 border-t">
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground hover:text-foreground">
                    <Heart className="h-4 w-4" /> 12
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground hover:text-foreground">
                    <MessageSquare className="h-4 w-4" /> 4
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="flex-1 overflow-hidden mt-4 h-full">
          <Card className="h-full flex flex-col md:flex-row overflow-hidden border">
            {/* Left Column: Thread List */}
            <div className="w-full md:w-[300px] border-b md:border-b-0 md:border-r flex flex-col">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search unit..." className="pl-8 bg-muted/50" />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="p-3 hover:bg-muted/50 cursor-pointer border-l-4 border-l-primary bg-muted/30">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold text-sm">Unit 101</span>
                    <span className="text-xs text-muted-foreground">17d ago</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    <span className="font-medium">You:</span> Board notice: AGM...
                  </div>
                </div>
                <div className="p-3 hover:bg-muted/50 cursor-pointer border-l-4 border-l-transparent">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold text-sm">Unit 105</span>
                    <span className="text-xs text-muted-foreground">1mo ago</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    <span className="font-medium text-foreground">Tenant:</span> When will the shop shutter be fixed?
                  </div>
                </div>
              </div>
              <div className="p-3 border-t">
                <Button className="w-full gap-2" variant="outline">
                  <MessageSquare className="h-4 w-4" />
                  + Message Unit
                </Button>
              </div>
            </div>

            {/* Right Column: Chat View */}
            <div className="flex-1 flex flex-col bg-muted/10 h-full">
              <div className="p-4 border-b bg-background flex justify-between items-center">
                <div className="font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  Unit 101
                </div>
                <Button variant="ghost" size="sm" className="h-8">View Unit</Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Chat Messages */}
                <div className="flex flex-col gap-1 items-start">
                  <div className="text-[10px] text-muted-foreground mx-auto mb-2">August 28, 2026</div>
                  <div className="bg-background border rounded-lg rounded-tl-none p-3 max-w-[80%] text-sm shadow-sm">
                    Board notice: AGM is scheduled for next week. Please confirm attendance.
                  </div>
                  <span className="text-[10px] text-muted-foreground ml-1">You - 10:45 AM</span>
                </div>

                <div className="flex flex-col gap-1 items-end mt-4">
                  <div className="bg-primary text-primary-foreground rounded-lg rounded-tr-none p-3 max-w-[80%] text-sm shadow-sm">
                    I will be there. Thanks for the heads up.
                  </div>
                  <span className="text-[10px] text-muted-foreground mr-1">Unit 101 - 11:30 AM</span>
                </div>
              </div>

              <div className="p-3 border-t bg-background">
                <div className="flex items-center gap-2">
                  <Input placeholder="Type your message to Unit 101..." className="flex-1" />
                  <Button size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
