"use client";

import { TextField } from "@mui/material";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const ConnexionPage = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mail === "" || password === "") {
      alert("Veuillez remplir tous les champs");
      return;
    }

    //TODO: send to api
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mail, password }),
    }).then((response) => {
      console.log(response);
    });

    // //IF NOT GOOD
    // if (false) {
    //   alert("Mauvais identifiants");
    //   return;
    // }

    // const token = "token";

    // const cookies = new Cookies();
    // cookies.set("token", token, { path: "/" });

    // //TODO: IF owner => redirect to /admin/utilisateur

    // //TODO: IF user => redirect to /front/accueil
    // router.push("/front/accueil")
    // return;
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
