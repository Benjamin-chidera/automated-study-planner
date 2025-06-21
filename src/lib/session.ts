import "server-only";

import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { SessionPayload as CustomSessionPayload } from "@/types/session";
import { cookies } from "next/headers";
// import { SessionPayload as CustomSessionPayload } from '@/app/lib/definitions'

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload extends CustomSessionPayload, JWTPayload {
  // You can add any additional custom claims here if needed
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session", error);
  }
}

export async function createSession(userId: string, userName: string, userEmail: string, userImage: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // this gives us a date 7 days from now
  const session = await encrypt({ userId, expiresAt, userName, userEmail, userImage });

  // console.log("this is the session:", session);

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  // console.log("this is the cookie store:", cookieStore);
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
