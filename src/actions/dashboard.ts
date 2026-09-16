"use server";

import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function getAdminDashboardStats(month: string) {
  const session = await requireSession();

  if (session.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const workspaceId = session.workspaceId;

  // Slips in review
  const slipsInReview = await prisma.invoice.count({
    where: {
      workspace_id: workspaceId,
      status: "IN_REVIEW",
    }
  });

  // Active tickets
  const activeTickets = await prisma.maintenanceTicket.count({
    where: {
      workspace_id: workspaceId,
      status: {
        in: ["OPEN", "DOING"]
      }
    }
  });

  const urgentTickets = await prisma.maintenanceTicket.count({
    where: {
      workspace_id: workspaceId,
      status: {
        in: ["OPEN", "DOING"]
      },
      priority: "URGENT"
    }
  });

  // Overdue units
  const overdueUnits = await prisma.invoice.count({
    where: {
      workspace_id: workspaceId,
      status: "UNPAID",
      due_date: {
        lt: new Date()
      }
    }
  });

  // Upcoming upkeep
  const upcomingUpkeep = await prisma.upkeepEvent.count({
    where: {
      workspace_id: workspaceId,
      event_date: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
      }
    }
  });

  // Collection progress
  const invoices = await prisma.invoice.findMany({
    where: {
      workspace_id: workspaceId,
      billing_month: month
    }
  });

  let collected = 0;
  let stillOwed = 0;
  let invoicesPaid = 0;

  for (const invoice of invoices) {
    if (invoice.status === "CONFIRMED") {
      collected += Number(invoice.verified_amount || invoice.claimed_amount || invoice.expected_amount);
      invoicesPaid++;
    } else if (invoice.status !== "WAIVED") {
      stillOwed += Number(invoice.expected_amount);
    }
  }

  // Occupancy
  const totalUnits = await prisma.unit.count({
    where: { workspace_id: workspaceId }
  });
  const occupiedUnits = await prisma.unit.count({
    where: { workspace_id: workspaceId, status: "OCCUPIED" }
  });

  // Utilities
  const meterReadings = await prisma.meterReading.findMany({
    where: { workspace_id: workspaceId, reading_month: month }
  });

  let waterConsumption = 0;
  let powerConsumption = 0;

  for (const reading of meterReadings) {
    if (reading.utility_type === "WATER") {
      waterConsumption += Number(reading.consumption);
    } else if (reading.utility_type === "ELECTRIC") {
      powerConsumption += Number(reading.consumption);
    }
  }

  return {
    slipsInReview,
    activeTickets,
    urgentTickets,
    normalTickets: activeTickets - urgentTickets,
    overdueUnits,
    upcomingUpkeep,
    collection: {
      collected,
      stillOwed,
      percentage: (collected + stillOwed) > 0 ? Math.round((collected / (collected + stillOwed)) * 100) : 0,
      invoicesPaid,
      totalInvoices: invoices.length,
      occupiedUnits,
      totalUnits,
      waterConsumption,
      powerConsumption
    }
  };
}
