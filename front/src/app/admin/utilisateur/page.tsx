"use client";

import Utilisateur from "@/models/Utilisateur";
import { useEffect, useState } from "react";
import UtilisateurTable from "./UtilisateurTable";

const UtilisateurPage = () => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    // TODO: fetch API
  }, []);

  const handleDelete = (email: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      //TODO: fetch API
    }
  };

  return (
    <main className="p-4">
      <UtilisateurTable
        utilisateurs={utilisateurs}
        setUtilisateurs={setUtilisateurs}
        limit={limit}
        setLimit={setLimit}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default UtilisateurPage;
