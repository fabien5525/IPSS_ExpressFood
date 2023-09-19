"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCookieAccepted, setIsCookieAccepted] = useState(true);

  const setCookieAccepted = async (value: true | null = null) => {
    const cookies = new Cookies();

    if (value) {
      cookies.set("cookieAccepted", "true", { path: "/" });
      cookies.update();
      setIsCookieAccepted(true);
      return;
    }

    const cookieAccepted = cookies.get("cookieAccepted") ?? null;
    if (!cookieAccepted) {
      setIsCookieAccepted(false);
    }
  };

  useEffect(() => {
    setCookieAccepted();
  }, []);

  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        {!isCookieAccepted && (
          <div>
            <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex flex-col justify-center">
              <p className="text-center">
                {`En poursuivant votre navigation sur ce site, vous acceptez
                l'utilisation de cookies et du stockage local pour 
                le bon fonctionnement du site.`}
              </p>
              <div className="w-full text-center">
                <button
                  className="bg-white text-black font-bold p-4 rounded mt-4"
                  onClick={async () => {
                    await setCookieAccepted(true);
                    setIsCookieAccepted(true);
                  }}
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
