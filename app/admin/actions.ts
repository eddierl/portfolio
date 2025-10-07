"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  path: string;
  maxAge: number;
};

const COOKIE_NAME = "admin-auth";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

function getCookieOptions(overrides?: Partial<CookieOptions>) {
  const defaults = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
  return { ...defaults, ...overrides };
}

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (password === ADMIN_PASSWORD) {
    (await cookies()).set(COOKIE_NAME, "1", getCookieOptions());
    redirect("/admin");
  }

  redirect("/admin?error=1");
}

export async function logout() {
  (await cookies()).set(COOKIE_NAME, "", getCookieOptions({ maxAge: 0 }));
  redirect("/admin");
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value === "1";
}
