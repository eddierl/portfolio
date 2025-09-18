"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin-auth";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export async function login(formData: FormData) {
    const password = String(formData.get("password") ?? "");

    if (password === ADMIN_PASSWORD) {
        (await cookies()).set(COOKIE_NAME, "1", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 8,
        });
        redirect("/admin");
    }

    redirect("/admin?error=1");
}

export async function logout() {
    (await cookies()).set(COOKIE_NAME, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });
    redirect("/admin");
}

export async function isAuthenticated(): Promise<boolean> {
    const cookie = (await cookies()).get(COOKIE_NAME);
    return cookie?.value === "1";
}


