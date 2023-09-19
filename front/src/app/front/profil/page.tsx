"use client";

import Utilisateur from "@/components/Utilisateur";
import { Skeleton } from "@mui/material";
import { useState } from "react";

const utilisateurExample: Utilisateur = {
  nom: "Doe",
  prenom: "John",
  image: undefined,
  telephone: "0600000000",
  email: "text@text.test",
  adresse: "1 rue de la paix",
};

const ProfilePage = () => {
  const [utilisateur, setUtilisateur] =
    useState<Utilisateur>(utilisateurExample);

  return (
    <main>
      <div className="p-4 flex flex-row justify-between">
        <p className="text-lg font-bold">
          {utilisateur.nom} {utilisateur.prenom}
        </p>
        <Skeleton variant="circular" width={64} height={64} />
      </div>
      <div className="p-4">
        <p className="text-2xl font-bold">Information sur le compte</p>
        <div className="flex flex-col">
          <div className="py-4">
            <p>Nom</p>
            <p className="text-gray-500">
              {utilisateur.prenom} {utilisateur.nom}
            </p>
          </div>
          <hr />
          <div className="py-4">
            <p>Téléphone</p>
            <p className="text-gray-500">{utilisateur.telephone}</p>
          </div>
          <hr />
          <div className="py-4">
            <p>Adresse e-mail</p>
            <p className="text-gray-500">{utilisateur.email}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
