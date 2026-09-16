"use server";

import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { TicketCategory, TicketPriority, InvoiceStatus } from "@prisma/client";

export async function uploadPaymentSlip(invoiceId: string, claimedAmount: number, rawSms: string): Promise<void> {
  const session = await requireSession();

  if (!session.unitId) {
    throw new Error("User has no associated unit");
  }

  // Ensure invoice belongs to this user's unit
  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId, unit_id: session.unitId, workspace_id: session.workspaceId }
  });

  if (!invoice) {
    throw new Error("Invoice not found or unauthorized");
  }

  // Transaction to update invoice status and create slip
  await prisma.$transaction([
    prisma.paymentSlip.create({
      data: {
        invoice_id: invoiceId,
        raw_sms_content: rawSms,
      }
    }),
    prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.IN_REVIEW,
        claimed_amount: claimedAmount
      }
    })
  ]);

  revalidatePath('/resident/dues');
}

export async function submitMaintenanceTicket(formData: FormData): Promise<void> {
  const session = await requireSession();

  if (!session.unitId) {
    throw new Error("User has no associated unit");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string; // in a real app add to schema, mock for now
  const category = formData.get("category") as TicketCategory;
  const priority = formData.get("priority") as TicketPriority;

  await prisma.maintenanceTicket.create({
    data: {
      workspace_id: session.workspaceId,
      unit_id: session.unitId,
      reporter_id: session.userId,
      title: title,
      category: category,
      priority: priority,
    }
  });

  revalidatePath('/resident/tickets');
}
