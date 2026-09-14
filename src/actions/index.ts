"use server";

import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/lib/auth";
import { InvoiceStatus, AnnouncementTarget, TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

// 1. Billing & Invoicing Actions
export async function reviewPaymentSlip(invoiceId: string, action: 'CONFIRM' | 'REJECT' | 'ADJUST', data: { verifiedAmount?: number, rejectionReason?: string, rawSmsContent?: string }) {
  const { workspaceId, userId } = await getTenantContext();

  const invoice = await prisma.invoice.findFirst({
    where: { id: invoiceId, workspace_id: workspaceId },
    include: { slips: true }
  });

  if (!invoice) throw new Error("Invoice not found");

  if (action === 'CONFIRM') {
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.CONFIRMED,
        verified_amount: data.verifiedAmount ?? invoice.claimed_amount ?? invoice.expected_amount,
        slips: {
          updateMany: {
            where: { invoice_id: invoiceId },
            data: { reviewed_by_user_id: userId, reviewed_at: new Date() }
          }
        }
      }
    });
  } else if (action === 'REJECT') {
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.REJECTED,
        claimed_amount: null, // Reset claimed amount on rejection
        slips: {
          updateMany: {
            where: { invoice_id: invoiceId },
            data: {
              rejection_reason: data.rejectionReason,
              reviewed_by_user_id: userId,
              reviewed_at: new Date()
            }
          }
        }
      }
    });
  }

  revalidatePath('/invoices');
  return { success: true };
}

// 2. Maintenance Ticket Actions
export async function claimTicket(ticketId: string) {
  const { workspaceId, userId } = await getTenantContext();

  await prisma.maintenanceTicket.update({
    where: { id: ticketId, workspace_id: workspaceId },
    data: {
      status: TicketStatus.DOING,
      assigned_to_id: userId
    }
  });

  revalidatePath('/maintenance');
  return { success: true };
}

export async function createTicket(data: { unitId: string, title: string, category: TicketCategory, priority: TicketPriority, scheduledVisit?: Date }) {
  const { workspaceId, userId } = await getTenantContext();

  const ticket = await prisma.maintenanceTicket.create({
    data: {
      workspace_id: workspaceId,
      unit_id: data.unitId,
      reporter_id: userId,
      title: data.title,
      category: data.category,
      priority: data.priority,
      scheduled_visit: data.scheduledVisit,
      status: TicketStatus.OPEN
    }
  });

  revalidatePath('/maintenance');
  return { success: true, ticketId: ticket.id };
}

// 3. Announcement Actions
export async function dispatchAnnouncement(data: { title: string, body: string, templateTag?: string, targetScope: AnnouncementTarget, isPinned: boolean, scheduledFor?: Date }) {
  const { workspaceId, userId } = await getTenantContext();

  const announcement = await prisma.announcement.create({
    data: {
      workspace_id: workspaceId,
      author_id: userId,
      title: data.title,
      body: data.body,
      template_tag: data.templateTag,
      target_scope: data.targetScope,
      is_pinned: data.isPinned,
      scheduled_for: data.scheduledFor
    }
  });

  // Here we would dispatch Telegram bot Webhooks if configured
  revalidatePath('/announcements');
  return { success: true, announcementId: announcement.id };
}
