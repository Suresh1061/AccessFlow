"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
     throw new Error("SECRET_KEY is not defined. Please check your environment variables.");
}
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
     return await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(key);
}

export async function decrypt(input: string): Promise<any> {
     const { payload } = await jwtVerify(input, key, {
          algorithms: ["HS256"],
     });
     return payload;
}

export async function generateToken(userData: UserData) {
     const { name,email, type, _id, status, role, permissions } = userData;
     const user = {
          id: _id,
          name,
          email,
          type,
          status,
          role,
          permissions
     };
     const expires = new Date(Date.now() + 60 * 60 * 36000); // Expires in 36 hours
     const session = await encrypt({ user, expires });

     // Await cookies before calling .set
     const cookieStore = await cookies();
     cookieStore.set("session", session, { expires, httpOnly: true });
}

export async function logout() {
     // Await cookies before calling .set
     const cookieStore = await cookies();
     cookieStore.set("session", "", { expires: new Date(0) });
}

export async function getSession() {
     // Await cookies before calling .get
     const cookieStore = await cookies();
     const session = cookieStore.get("session")?.value;
     if (!session) return null;
     return await decrypt(session);
}
