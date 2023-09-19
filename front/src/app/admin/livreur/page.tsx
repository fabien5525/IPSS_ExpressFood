"use client";

import { useEffect, useState } from "react";
import LivreurTable from "./LivreurTable";
import Livreur from "@/models/Livreur";

const LivreurPage = () => {
  const [livreurs, setLivreurs] = useState<Livreur[]>([]);
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
      <LivreurTable
        livreurs={livreurs}
        setLivreurs={setLivreurs}
        limit={limit}
        setLimit={setLimit}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default LivreurPage;
