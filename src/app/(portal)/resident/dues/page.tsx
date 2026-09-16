"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { uploadPaymentSlip } from "@/actions/resident";

export default function ResidentDuesPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t('dues')}</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">13,497 ETB</h2>
                <Badge variant="destructive" className="uppercase text-[10px]">{t('unpaid')}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">August 2026 HOA Dues</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                className="w-full md:w-auto gap-2"
                onClick={async () => {
                  // Wire up to server action (using hardcoded invoice ID that would fail until DB seeded, just for demo)
                  try {
                    await uploadPaymentSlip('mock-invoice-id', 13497, 'Bank transfer SMS...');
                    alert('Submitted successfully');
                  } catch (e) {
                    alert('Error submitting (mock db empty)');
                  }
                }}
              >
                <Upload className="h-4 w-4" />
                {t('pay_upload_slip')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="font-semibold text-lg mb-3">History</h3>
        <Card>
          <CardContent className="p-0">
             <div className="p-4 border-b text-sm flex justify-between items-center opacity-50">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  <span>July 2026 Dues</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Paid</Badge>
             </div>
             <div className="p-4 text-sm flex justify-between items-center opacity-50">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  <span>June 2026 Dues</span>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Paid</Badge>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
