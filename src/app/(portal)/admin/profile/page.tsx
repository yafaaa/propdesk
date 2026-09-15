"use client";

import { useI18n } from "@/i18n/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";

export default function AdminProfilePage() {
  const { t } = useI18n();
  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 pb-12">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">AM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">Admin Manager</h1>
                <Badge variant="secondary">{t('admin_manager')}</Badge>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Building className="h-3.5 w-3.5" />
                Demo Unit owner association
              </p>
              <div className="mt-3 text-sm space-y-1">
                <p>admin@example.com</p>
                <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Options stub */}
      <Card>
        <CardHeader>
           <CardTitle>{t('settings')}</CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground text-sm">System configuration goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
