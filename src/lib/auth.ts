import { headers } from "next/headers";

export async function getTenantContext() {
  const headersList = await headers();
  const workspaceId = headersList.get('x-workspace-id') || 'demo-workspace-id';
  const userId = headersList.get('x-user-id') || 'demo-admin-user-id';
  const role = headersList.get('x-user-role') || 'ADMIN';

  if (!workspaceId) {
    throw new Error("SECURITY EXCEPTION: Operation blocked without workspace_id scoping.");
  }

  return { workspaceId, userId, role };
}
