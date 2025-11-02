import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET ?? "fallback-secret";

export async function generateTokens(user: { role: "admin" }) {
  const accessToken = jwt.sign(user, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken };
}

export const verify = (value: string) => jwt.verify(value, JWT_SECRET);
