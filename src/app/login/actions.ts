"use server";

import { createSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function doLogin(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    // Real database authentication
    const user = await prisma.user.findUnique({
      where: { email },
      include: { memberships: true }
    });

    if (!user || user.memberships.length === 0) {
      return { success: false, error: "Invalid credentials or no workspace membership" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        return { success: false, error: "Invalid credentials" };
    }

    const membership = user.memberships[0];

    const payload: any = {
      userId: user.id,
      workspaceId: membership.workspace_id,
      role: membership.role,
    };

    if (membership.unit_id) {
      payload.unitId = membership.unit_id;
    }

    await createSession(payload);
    return { success: true };
  } catch (error) {
    // Sanitize database errors
    console.error("Login Error", error);
    return { success: false, error: "Invalid credentials" };
  }
}
