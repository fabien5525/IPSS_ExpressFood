"use client";

import { useCallback, useEffect, useState } from "react";
import CommandeTable from "./CommandeTable";
import { useAuth } from "@/contexts/AppContext";
import { utilisateurSimple } from "@/models/Utilisateur";
import EditModal from "./EditModal";
import { CommandeComplet } from "@/models/Commande";

const CommandePage = () => {
  const [commandes, setCommandes] = useState<CommandeComplet[]>([]);
  const [limit, setLimit] = useState(10);
  const [userThatCanBeLivreur, setUserThatCanBeLivreur] = useState<
    utilisateurSimple[]
  >([]);
  const [editCommande, setEditCommande] = useState<CommandeComplet | undefined>(
    undefined
  );
  const { getToken } = useAuth();

  const fetchCommandes = useCallback(async () => {
    const token = getToken();
    const res = await fetch(`/api/order/`, {
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

    setCommandes(data.data ?? []);
  }, [getToken]);

  const fetchUsers = useCallback(async () => {
    const token = getToken();
    const res = await fetch(`/api/user/?is_livreur=false`, {
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
    fetchCommandes();
    fetchUsers();
  }, [fetchCommandes, fetchUsers]);

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

      await fetchCommandes();
    }
  };

  return (
    <main className="p-4">
      <EditModal
        commande={editCommande}
        setCommande={setEditCommande}
        fetchCommandes={fetchCommandes}
        userThatCanBeLivreur={userThatCanBeLivreur}
      />
      <CommandeTable
        commandes={commandes}
        limit={limit}
        setLimit={setLimit}
        handleDelete={handleDelete}
        setEditCommande={setEditCommande}
      />
    </main>
  );
};

export default CommandePage;
