"use server";

import { cookies } from "next/headers";
import type { Token } from "app/lib/jwt";
import { generateTokens, verify } from "app/lib/jwt";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/app/constants";

// ─── AuthError (exported for consumers to pattern-match) ─────────────────────

export type AuthError =
  | { kind: "INVALID_PASSWORD" }
  | { kind: "CONFIG_ERROR"; message: string }
  | { kind: "JWT_ERROR"; cause: string };

// ─── Result type (defined here, not extracted — only one consumer) ────────────

type Result<T> = { ok: true; value: T } | { ok: false; error: AuthError };

// ─── Module-level constant: ensure ADMIN_PASSWORD is configured ───────────────

const ADMIN_PASSWORD = getAdminPassword();

function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD environment variable is not set. " +
        "Set it in your .env.local for development or in production.",
    );
  }
  return password;
}

// ─── Public interface (4 focused functions) ──────────────────────────────────

/**
 * Validate a password and return tokens if valid.
 *
 * Returns Result<Token> — no side effects (no redirect, no cookie manipulation).
 */
export async function authenticate(
  password: string,
): Promise<Result<Token>> {
  if (password !== ADMIN_PASSWORD) {
    return {
      ok: false,
      error: { kind: "INVALID_PASSWORD" },
    };
  }

  try {
    await generateTokens({ role: "admin" });
    return { ok: true, value: { role: "admin" } };
  } catch (error) {
    return {
      ok: false,
      error: {
        kind: "JWT_ERROR",
        cause: error instanceof Error ? error.message : String(error),
      },
    };
  }
}

/**
 * Set the access token cookie.
 */
export async function createSession(token: Token) {
  const { accessToken } = await generateTokens(token);
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return accessToken;
}

/**
 * Clear the session cookie.
 */
export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Verify an existing token and refresh it if valid.
 *
 * Used by the RefreshCookie component to silently extend the session.
 */
export async function refreshSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME);

  if (!cookie?.value) return;

  try {
    verify(cookie.value);
    await createSession({ role: "admin" });
  } catch {
    // Token is invalid/expired — silently do nothing.
    // The user will be prompted to re-login on next access.
  }
}

/**
 * Internal helper: verify a token from the cookie store.
 *
 * Used by consumers (page.tsx, nav.tsx) to check authentication status.
 */
export async function verifyToken() {
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
