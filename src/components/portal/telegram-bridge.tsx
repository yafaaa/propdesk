import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

export function TelegramBridgeBox({ title = "Link my Telegram", description = "Get bills, tickets, and admin shortcuts in @etpropdeskbot", buttonText = "Open @etpropdeskbot" }) {
  return (
    <Card className="bg-[#0088cc]/5 border-[#0088cc]/20">
      <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-[#0088cc] flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        </div>
        <Button className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white w-full md:w-auto">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
