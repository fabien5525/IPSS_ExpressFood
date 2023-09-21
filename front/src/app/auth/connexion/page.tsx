"use client";

import { TextField } from "@mui/material";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { getPayload } from "@/libs/auth";
import { useAuth } from "@/contexts/AppContext";

const ConnexionPage = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mail === "" || password === "") {
      alert("Veuillez remplir tous les champs");
      return;
    }

    //TODO: send to api
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mail, password }),
    });

    console.log(response)

    if (!response.ok) {
      alert("Mauvais identifiants");
      setMail("");
      setPassword("");
      return;
    }

    const data = await response.json();
    const {token} = data;
    setToken(token);

    const payload = getPayload(token);

    if (payload.roles.includes("admin")) {
      router.push("/admin/utilisateur");
      return;
    }

    router.push("/front/accueil")
  };

  return (
    <main className="md:flex md:justify-center">
      <div className="p-4 md:flex md:flex-col md:w-96">
        <h1 className="text-2xl font-bold pb-8">Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <label htmlFor="mail">Adresse e-mail</label>
            <TextField
              className="rounded-lg bg-gray-200"
              placeholder="Indiquez votre adresse e-mail"
              id="mail"
              variant="outlined"
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
              }}
            />
            <label htmlFor="password">Mot de passe</label>
            <TextField
              className="rounded-lg bg-gray-200"
              placeholder="*********"
              type="password"
              id="password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="bg-green-500 text-white font-bold p-4 rounded mt-2"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ConnexionPage;
