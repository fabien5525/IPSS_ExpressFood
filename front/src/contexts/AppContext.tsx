"use client";

import { getPayload } from "@/libs/auth";
import Utilisateur from "@/models/Utilisateur";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

interface AppContextType {
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    user: Utilisateur | undefined;
    setUser: (user: Utilisateur | undefined) => void;
    getRoles: () => string[];
    setToken: (token: string) => void;
    getToken: () => string | undefined;
}

const appContextDefaultValue : AppContextType = {
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
}

const AppProvider = ({children} : {children: React.ReactNode}) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<Utilisateur | undefined>(undefined);

    const getToken = () => {
        const token = new Cookies().get("token");
        return token ? token : undefined;
    }

    const getRoles = () => {
        const token = getToken();

        if (!token) {
            return [];
        }

        const payload = getPayload(getToken());

        return payload.roles ?? [];
    }

    const setToken = (token: string) => {
        new Cookies().set("token", token, {path: "/"});
    }

    const setUserData = async (mail : string, token : string) => {
        const res = await fetch(`/api/user/${mail}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        console.log(res);

        if (!res.ok) {
            return;
        }

        const user = await res.json() as Utilisateur;

        setUser(user);
    }


    useEffect(() => {
        const token = getToken();
        console.log(token);

        if (!token) {
            return;
        }

        const {username} = getPayload(token);
        console.log(username);

        if (!token || !username) {
            return;
        }

        setIsAuth(true);
        setUserData(username, token);
    }, []);

    return (
        <AppContext.Provider value={{isAuth, setIsAuth, user, setUser, getRoles, setToken, getToken}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppProvider, useAuth};