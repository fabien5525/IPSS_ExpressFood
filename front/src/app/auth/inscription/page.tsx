"use client";

import Utilisateur from "@/models/Utilisateur";
import { TextField } from "@mui/material";
import { useState } from "react";

const InscriptionPage = () => {
  const [utilisateur, setUtilisateur] = useState<Utilisateur>({
    nom: "",
    prenom: "",
    image: undefined,
    telephone: "",
    email: "",
    adresse: "",
  });

  const hanleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      utilisateur.nom === "" ||
      utilisateur.prenom === "" ||
      utilisateur.telephone === "" ||
      utilisateur.email === "" ||
      utilisateur.adresse === ""
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const regexEmail = new RegExp(
      "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
    );

    if (!regexEmail.test(utilisateur.email)) {
      alert("Veuillez entrer une adresse e-mail valide");
      return;
    }

    const regexTelephone = new RegExp("^[0-9]{10}$");

    if (!regexTelephone.test(utilisateur.telephone)) {
      alert("Veuillez entrer un numéro de téléphone valide");
      return;
    }

    console.log(utilisateur);

    //TODO: send to api

    alert("Inscription réussi");
  };

  return (
    <main className="md:flex md:justify-center">
      <div className="p-4 md:flex md:flex-col md:w-96">
        <h1 className="text-2xl font-bold pb-8">Inscription</h1>
        <form onSubmit={hanleSubmit}>
          <div className="flex flex-col gap-4">
            <label htmlFor="nom">Nom</label>
            <TextField
              className="rounded-lg bg-gray-200"
              placeholder=""
              id="nom"
              variant="outlined"
              value={utilisateur.nom}
              onChange={(e) => {
                setUtilisateur({ ...utilisateur, nom: e.target.value });
              }}
            />
            <label htmlFor="prenom">Prénom</label>
            <TextField
              className="rounded-lg bg-gray-200"
              placeholder=""
              id="prenom"
              variant="outlined"
              value={utilisateur.prenom}
              onChange={(e) => {
                setUtilisateur({ ...utilisateur, prenom: e.target.value });
              }}
            />
            <label htmlFor="telephone">Téléphone</label>
            <TextField
              className="rounded-lg bg-gray-200"
              placeholder=""
              id="telephone"
              variant="outlined"
              value={utilisateur.telephone}
              onChange={(e) => {
                setUtilisateur({ ...utilisateur, telephone: e.target.value });
              }}
            />
            <label htmlFor="email">Adresse e-mail</label>
            <TextField
              className="rounded-lg bg-gray-200"
              placeholder=""
              id="email"
              variant="outlined"
              value={utilisateur.email}
              onChange={(e) => {
                setUtilisateur({ ...utilisateur, email: e.target.value });
              }}
            />
            <label htmlFor="adresse">Adresse</label>
            <TextField
              className="rounded-lg bg-gray-200"
              placeholder=""
              id="adresse"
              variant="outlined"
              value={utilisateur.adresse}
              onChange={(e) => {
                setUtilisateur({ ...utilisateur, adresse: e.target.value });
              }}
            />
            <button
              type="submit"
              className="p-4 bg-black text-white rounded-lg mt-2"
            >
              {"S'inscrire"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default InscriptionPage;
