"use client";

import { useState } from "react";
import { Search, AlertCircle, FileImage, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { approvePaymentSlip, rejectPaymentSlip } from "@/actions/admin";

export default function InvoicesPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>("101-1");

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row gap-4 overflow-hidden -mx-4 -mb-4 p-4 md:-mx-6 md:-mb-6 md:p-6 lg:gap-6">
      {/* Left Pane - Queue */}
      <div className="flex w-full flex-col md:w-1/3 lg:w-[400px] gap-4 bg-background border rounded-lg overflow-hidden">
        <div className="p-4 pb-0 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search unit..." className="pl-8" />
          </div>

          <Tabs defaultValue="unit" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="unit">By Unit</TabsTrigger>
              <TabsTrigger value="month">By Month</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="text-sm text-muted-foreground">
            546 in review - 58 confirm, 488 marked chkd
          </div>

          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2 font-semibold text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                DISPUTES (1)
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Unit 101: Water charge high</span>
                <div className="space-x-1">
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Res</Button>
                  <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Dism</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ScrollArea className="flex-1 px-4 pb-4">
          <Accordion className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                Unit 101 (7)
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-1">
                <div
                  className={`p-3 rounded-lg border text-sm cursor-pointer transition-colors ${selectedInvoice === '101-1' ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}
                  onClick={() => setSelectedInvoice('101-1')}
                >
                  <div className="font-medium">HOA Invoice May 2026: 13,497 ETB</div>
                  <div className="mt-2 space-x-2">
                    <Button size="sm" variant="secondary" className="h-7 text-xs">Paste SMS</Button>
                    <Button size="sm" variant="secondary" className="h-7 text-xs">Mark checked</Button>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg border text-sm cursor-pointer transition-colors ${selectedInvoice === '101-2' ? 'bg-muted border-primary' : 'hover:bg-muted/50'}`}
                  onClick={() => setSelectedInvoice('101-2')}
                >
                  <div className="font-medium">Shop Rent May 2026: 15,000 ETB</div>
                  <div className="mt-2 text-muted-foreground text-xs">Awaiting review...</div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                Unit 102 (12)
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-1">
                <div className="text-sm text-muted-foreground p-2">Items for Unit 102...</div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>
      </div>

      {/* Right Pane - Verification Inspector */}
      <div className="flex-1 bg-background border rounded-lg overflow-hidden flex flex-col">
        {selectedInvoice ? (
          <>
            <div className="p-4 md:p-6 border-b bg-muted/20">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Unit 101 - HOA Invoice - May 2026</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">Expected</span>
                      <span className="font-medium">13,497 ETB</span>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">Claimed</span>
                      <span className="font-medium">13,497 ETB</span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm italic text-muted-foreground">
                    "Paid via Telebirr - awaiting confirmation"
                  </div>
                </div>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 self-start">
                  In Review
                </Badge>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6">
              {/* Slip Image/Preview */}
              <div className="flex-1 flex flex-col gap-2 min-h-[300px]">
                <div className="text-sm font-medium">Payment Proof</div>
                <div className="flex-1 border rounded-lg bg-muted/30 flex items-center justify-center relative overflow-hidden">
                   {/* Fallback for no image or image placeholder */}
                   <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 p-6 text-center">
                     <ImageIcon className="h-12 w-12 opacity-20" />
                     <p>Slip image preview would appear here.</p>
                     <Button variant="outline" size="sm" className="mt-2">View Full Screen</Button>
                   </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="w-full lg:w-[320px] flex flex-col gap-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Bank SMS Verification</div>
                  <Textarea placeholder="Paste raw incoming bank SMS notification here to log proof..." className="min-h-[100px] text-xs resize-none" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="text-sm font-medium text-destructive">Reject Reason</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">Blurry</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">Wrong ID</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">Wrong Amount</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">Wrong Account</Badge>
                  </div>
                  <Button
                     variant="destructive"
                     className="w-full mt-2"
                     onClick={async () => {
                        try {
                           await rejectPaymentSlip('mock-invoice-id', 'Blurry');
                           alert("Payment rejected (mock)");
                        } catch (e) {
                           alert("Error rejecting payment");
                        }
                     }}
                  >Reject Payment</Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full">Adjust Amount</Button>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={async () => {
                      try {
                        await approvePaymentSlip('mock-invoice-id', 13497);
                        alert("Payment confirmed (mock)");
                      } catch (e) {
                        alert("Error confirming payment");
                      }
                    }}
                  >
                    Confirm Payment
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select an invoice from the queue to review
          </div>
        )}
      </div>
    </div>
  );
}
