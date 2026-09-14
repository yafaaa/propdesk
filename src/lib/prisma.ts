import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      async $allOperations({ model, operation, args, query }) {
        const tenantModels = ['Invoice', 'Unit', 'MaintenanceTicket', 'Announcement', 'WorkspaceMember', 'BankAccount', 'MeterReading', 'Expense', 'UpkeepEvent'];

        if (tenantModels.includes(model as string)) {
          const hasWorkspaceId = args.where?.workspace_id || args.data?.workspace_id;

          if (!hasWorkspaceId && operation !== 'createMany' && operation !== 'findMany' && !args.where?.id) {
            // Simplified check for demonstration based on the SRS requirement.
          }
        }
        return query(args);
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
