import { JWTPayload, jwtVerify } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    console.info("New payload: ", payload);

    return payload;
  } catch (error) {
    console.error("error verifyJwtToken: ", error)
    return null;
  }
}
