"use server";

import { generateTokens, verify } from "app/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";

type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  path: string;
  maxAge: number;
};

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

export const setTokenCookies = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  (await cookies()).set(
    ACCESS_TOKEN_COOKIE_NAME,
    accessToken,
    getCookieOptions(),
  );
};

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (password === ADMIN_PASSWORD) {
    const { accessToken } = await generateTokens({
      role: "admin",
    });

    await setTokenCookies({ accessToken });

    redirect("/admin");
  }

  redirect("/admin?error=1");
}

export async function logout() {
  (await cookies()).set(
    ACCESS_TOKEN_COOKIE_NAME,
    "",
    getCookieOptions({ maxAge: 0 }),
  );
  redirect("/admin");
}

export async function refreshAdminCookie() {
  if (await isAuthenticated()) {
    const token = await generateTokens({ role: "admin" });
    return setTokenCookies(token);
  }
  console.warn("Failed to refresh the token in the cookie.");
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);
  if (!cookie?.value) return false;

  try {
    verify(cookie.value);
    return true;
  } catch {
    return false;
  }
}
