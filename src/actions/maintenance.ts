"use server";

import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { TicketStatus } from "@prisma/client";

export async function markTicketDoing(ticketId: string) {
  const session = await requireSession();

  if (session.role !== "STAFF" && session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.maintenanceTicket.updateMany({
    where: { id: ticketId, workspace_id: session.workspaceId },
    data: {
      status: TicketStatus.DOING,
      assigned_to_id: session.userId,
    }
  });

  revalidatePath('/maintenance/tickets');
  revalidatePath('/admin/maintenance');
  return { success: true };
}

export async function markTicketDone(ticketId: string) {
  const session = await requireSession();

  if (session.role !== "STAFF" && session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.maintenanceTicket.updateMany({
    where: { id: ticketId, workspace_id: session.workspaceId, assigned_to_id: session.userId },
    data: {
      status: TicketStatus.DONE,
    }
  });

  revalidatePath('/maintenance/tickets');
  revalidatePath('/admin/maintenance');
  return { success: true };
}
