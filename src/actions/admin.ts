"use server";

import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { InvoiceStatus } from "@prisma/client";

export async function approvePaymentSlip(invoiceId: string, verifiedAmount: number) {
  const session = await requireSession();

  if (session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId, workspace_id: session.workspaceId }
  });

  if (!invoice) throw new Error("Invoice not found");

  await prisma.$transaction([
    prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.CONFIRMED,
        verified_amount: verifiedAmount,
      }
    }),
    prisma.paymentSlip.updateMany({
      where: { invoice_id: invoiceId },
      data: {
        reviewed_by_user_id: session.userId,
        reviewed_at: new Date()
      }
    })
  ]);

  revalidatePath('/admin/invoices');
  return { success: true };
}

export async function rejectPaymentSlip(invoiceId: string, reason: string) {
  const session = await requireSession();

  if (session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId, workspace_id: session.workspaceId }
  });

  if (!invoice) throw new Error("Invoice not found");

  await prisma.$transaction([
    prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.REJECTED,
        claimed_amount: null,
      }
    }),
    prisma.paymentSlip.updateMany({
      where: { invoice_id: invoiceId },
      data: {
        rejection_reason: reason,
        reviewed_by_user_id: session.userId,
        reviewed_at: new Date()
      }
    })
  ]);

  revalidatePath('/admin/invoices');
  return { success: true };
}
