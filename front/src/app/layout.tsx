"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { AppProvider } from "@/contexts/AppContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCookieAccepted, setIsCookieAccepted] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();

    const cookieAccepted = cookies.get("cookieAccepted") ?? null;
    if (!cookieAccepted) {
      setIsCookieAccepted(false);
    }
  }, []);

  const handleAcceptCookie = async () => {
    const cookies = new Cookies();
    cookies.set("cookieAccepted", true, { path: "/" });
    setIsCookieAccepted(true);
  };

  return (
    <html lang="fr">
      <body className={inter.className}>
        <AppProvider>
          {children}
          {!isCookieAccepted && (
            <div>
              <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex flex-col justify-center z-50">
                <p className="text-center">
                  {`En poursuivant votre navigation sur ce site, vous acceptez
                l'utilisation de cookies et du stockage local pour 
                le bon fonctionnement du site.`}
                </p>
                <div className="w-full text-center">
                  <button
                    className="bg-white text-black font-bold p-4 rounded mt-4"
                    onClick={handleAcceptCookie}
                  >
                    Accepter
                  </button>
                </div>
              </div>
            </div>
          )}
        </AppProvider>
      </body>
    </html>
  );
}
