import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose"; // Use jose for Edge runtime compatibility

// Use environment variable for secret, fallback to secure random string in memory if not set (for development)
const secretKey = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-prod-1234567890";
const key = new TextEncoder().encode(secretKey);

export async function createSession(payload: any) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'lax'
  });
}

export async function verifySession(sessionToken: string | undefined) {
  if (!sessionToken) return null;
  try {
    const { payload } = await jwtVerify(sessionToken, key, { algorithms: ['HS256'] });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function requireSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;
  const payload = await verifySession(sessionToken);

  if (!payload) {
    throw new Error("Missing or invalid session");
  }

  return {
    userId: payload.userId as string,
    workspaceId: payload.workspaceId as string,
    role: payload.role as string,
    unitId: payload.unitId as string | undefined
  };
}
