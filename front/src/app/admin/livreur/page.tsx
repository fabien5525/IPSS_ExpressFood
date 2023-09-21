"use client";

import { useCallback, useEffect, useState } from "react";
import LivreurTable from "./LivreurTable";
import Livreur from "@/models/Livreur";
import { useAuth } from "@/contexts/AppContext";
import AddModal from "./AddModal";

const LivreurPage = () => {
  const [livreurs, setLivreurs] = useState<Livreur[]>([]);
  const [limit, setLimit] = useState(10);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { getToken } = useAuth();

  const fetchLivreurs = useCallback(async () => {
    const token = getToken();
    const res = await fetch(`/api/deliveryman/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();

    setLivreurs(data.data ?? []);
  }, [getToken]);

  useEffect(() => {
    fetchLivreurs();
  }, [fetchLivreurs]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      const token = getToken();
      const res = await fetch(`/api/deliveryman/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        return;
      }

      await fetchLivreurs();
    }
  };

  return (
    <main className="p-4">
      <AddModal
        open={openAddModal}
        setOpen={setOpenAddModal}
        fetchLivreurs={fetchLivreurs}
      />
      <LivreurTable
        livreurs={livreurs}
        limit={limit}
        setLimit={setLimit}
        handleDelete={handleDelete}
        setOpenAddModal={setOpenAddModal}
      />
    </main>
  );
};

export default LivreurPage;
