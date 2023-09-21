"use client";

import { utilisateurSimple } from "@/models/Utilisateur";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UtilisateurInscription extends utilisateurSimple {
  password: string;
  confirmPassword: string;
}

const InscriptionPage = () => {
  const router = useRouter();
  const [utilisateur, setUtilisateur] = useState<UtilisateurInscription>({
    id: 0,
    nom: "",
    prenom: "",
    photo: null,
    tel: "",
    mail: "",
    adresse: "",
    password: "",
    confirmPassword: "",
  });

  const hanleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      utilisateur.nom === "" ||
      utilisateur.prenom === "" ||
      utilisateur.tel === "" ||
      utilisateur.mail === "" ||
      utilisateur.adresse === ""
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const regexEmail = new RegExp(
      "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
    );

    if (!regexEmail.test(utilisateur.mail)) {
      alert("Veuillez entrer une adresse e-mail valide");
      return;
    }

    const regexTelephone = new RegExp("^[0-9]{10}$");

    if (!regexTelephone.test(utilisateur.tel)) {
      alert("Veuillez entrer un numéro de téléphone valide");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(utilisateur),
    });

    console.log(res);

    if (!res.ok) {
      alert("Email déjà utilisé");
      return;
    }

    router.push("/auth/connexion");
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
              value={utilisateur.tel}
              onChange={(e) => {
                setUtilisateur({ ...utilisateur, tel: e.target.value });
              }}
            />
            <label htmlFor="email">Adresse e-mail</label>
            <TextField
              className="rounded-lg bg-gray-200"
              placeholder=""
              id="email"
              variant="outlined"
              value={utilisateur.mail}
              onChange={(e) => {
                setUtilisateur({ ...utilisateur, mail: e.target.value });
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
            <label htmlFor="password">Mot de passe</label>
            <TextField
              className="rounded-lg bg-gray-200"
              type="password"
              id="password"
              variant="outlined"
              value={utilisateur.password}
              onChange={(e) => {
                setUtilisateur({ ...utilisateur, password: e.target.value });
              }}
            />
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <TextField
              className="rounded-lg bg-gray-200"
              type="password"
              id="confirmPassword"
              variant="outlined"
              value={utilisateur.confirmPassword}
              onChange={(e) => {
                setUtilisateur({
                  ...utilisateur,
                  confirmPassword: e.target.value,
                });
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
