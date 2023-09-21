"use client";

import { utilisateurSimple } from "@/models/Utilisateur";
import { useCallback, useEffect, useState } from "react";
import UtilisateurTable from "./UtilisateurTable";
import { useAuth } from "@/contexts/AppContext";
import EditModal from "./EditModal";

const UtilisateurPage = () => {
  const [utilisateurs, setUtilisateurs] = useState<utilisateurSimple[]>([]);
  const [limit, setLimit] = useState(10);
  const [editUser, setEditUser] = useState<utilisateurSimple | undefined>(
    undefined
  );
  const { getToken } = useAuth();

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

    setUtilisateurs(data.data);
  }, [getToken]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      //TODO: fetch API
    }
  };

  return (
    <main className="p-4">
      <EditModal
        fetchUsers={fetchUsers}
        user={editUser}
        setUser={setEditUser}
      />
      <UtilisateurTable
        utilisateurs={utilisateurs}
        setUtilisateurs={setUtilisateurs}
        limit={limit}
        setLimit={setLimit}
        handleDelete={handleDelete}
        setEditUser={setEditUser}
      />
    </main>
  );
};

export default UtilisateurPage;
