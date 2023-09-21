"use client";

import { useCallback, useEffect, useState } from "react";
import LivreurTable from "./LivreurTable";
import Livreur from "@/models/Livreur";
import { useAuth } from "@/contexts/AppContext";
import AddModal from "./AddModal";
import { utilisateurSimple } from "@/models/Utilisateur";
import EditModal from "./EditModal";

const LivreurPage = () => {
  const [livreurs, setLivreurs] = useState<Livreur[]>([]);
  const [limit, setLimit] = useState(10);
  const [userThatCanBeLivreur, setUserThatCanBeLivreur] = useState<
    utilisateurSimple[]
  >([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editLivreur, setEditLivreur] = useState<Livreur | undefined>(
    undefined
  );
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

  const fetchUsers = useCallback(async () => {
    const token = getToken();
    const res = await fetch(`/api/user/`, {
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

    setUserThatCanBeLivreur(data.data);
  }, [getToken]);

  useEffect(() => {
    fetchLivreurs();
    fetchUsers();
  }, [fetchLivreurs, fetchUsers]);

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
        userThatCanBeLivreur={userThatCanBeLivreur}
      />
      <EditModal
        livreur={editLivreur}
        setLivreur={setEditLivreur}
        fetchLivreurs={fetchLivreurs}
        userThatCanBeLivreur={userThatCanBeLivreur}
      />
      <LivreurTable
        livreurs={livreurs}
        limit={limit}
        setLimit={setLimit}
        handleDelete={handleDelete}
        setOpenAddModal={setOpenAddModal}
        setEditLivreur={setEditLivreur}
      />
    </main>
  );
};

export default LivreurPage;
