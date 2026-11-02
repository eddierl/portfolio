"use server";

import { redirect } from "next/navigation";
import { authenticate, createSession, destroySession } from "app/lib/admin-auth";

/**
 * Server action for the login form.
 *
 * Validates the password via the deep module, then redirects based on the result.
 */
export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const result = await authenticate(password);

  if (!result.ok) {
    return redirect("/admin?error=1");
  }

  await createSession(result.value);
  return redirect("/admin");
}

/**
 * Server action for the logout form.
 *
 * Clears the session cookie and redirects back to admin.
 */
export async function logout() {
  await destroySession();
  return redirect("/admin");
}
