"use client";

import { getPayload } from "@/libs/auth";
import { utilisateurSimple } from "@/models/Utilisateur";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "universal-cookie";

interface AppContextType {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  user: utilisateurSimple | undefined;
  setUser: (user: utilisateurSimple | undefined) => void;
  getRoles: () => string[];
  setToken: (token: string) => void;
  getToken: () => string | undefined;
}

const appContextDefaultValue: AppContextType = {
  isAuth: false,
  setIsAuth: () => {},
  user: undefined,
  setUser: () => {},
  getRoles: () => [],
  setToken: () => {},
  getToken: () => undefined,
};

const AppContext = createContext<AppContextType>(appContextDefaultValue);

const useAuth = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<utilisateurSimple | undefined>(undefined);

  const getToken = () => {
    const token = new Cookies().get("token");
    return token ? token : undefined;
  };

  const getRoles = () => {
    const token = getToken();

    if (!token) {
      return [];
    }

    const payload = getPayload(getToken());

    return payload.roles ?? [];
  };

  const setToken = (token: string) => {
    new Cookies().set("token", token, { path: "/" });
  };

  const setUserData = useCallback(async (id: number, token: string) => {
    const res = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });


    if (!res.ok) {
      return;
    }

    const data = (await res.json());
    const user = data.data as utilisateurSimple;
    setUser(user);
  }, []);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    const payload = getPayload(token);

    if (!token || !payload.id) {
      return;
    }

    setIsAuth(true);
    setUserData(payload.id, token);
  }, [setUserData]);

  return (
    <AppContext.Provider
      value={{ isAuth, setIsAuth, user, setUser, getRoles, setToken, getToken }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAuth };
