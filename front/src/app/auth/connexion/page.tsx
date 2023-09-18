"use client";

import { TextField } from "@mui/material";
import { useState } from "react";

const ConnexionPage = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mail === "" || password === "" || confirmPassword === "") {
      alert("Veuillez remplir tous les champs");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    //TODO: send to api

    alert("Inscription réussi");
  };

  return (
    <div className="p-4">
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
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <TextField
            className="rounded-lg bg-gray-200"
            type="password"
            id="confirmPassword"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
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
  );
};

export default ConnexionPage;
