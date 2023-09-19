import Cookies from "universal-cookie";
import { verifyJwtToken } from "@/libs/auth";
import { useState, useEffect } from "react";

const fromServer = async () => {
  const cookies = require("next/headers").cookies;
  const cookieList = cookies();
  const { value: token } = cookieList.get("token") ?? { value: null };
  const verifiedToken = await verifyJwtToken(token);

  return verifiedToken;
};

// TODO: this `useAuth` creates a vulnerability issue because it needs to have
// verifyJwtToken which works with process.env.JWT_SECRET_KEY which is not
// initially available on the client side. This is why we shouldn't rely on
// this hook if we really don't need to use.
// Alternatively we can have an API route to verification on the server layer.
export function useAuth() {
  // Have also loading state to not show flickering to the user
  const [auth, setAuth] = useState<any>(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get("token") ?? null;
    const verifiedToken = await verifyJwtToken(token);
    setAuth(verifiedToken);
  };

  useEffect(() => {
    getVerifiedtoken();
  }, []);

  return auth;
}

// Adding a type definition for the fromServer function
export namespace useAuth {
  export type FromServer = typeof fromServer;
}

useAuth.fromServer = fromServer;
