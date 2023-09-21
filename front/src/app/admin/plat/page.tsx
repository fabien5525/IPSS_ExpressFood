"use client";

import { useCallback, useEffect, useState } from "react";
import PlatTable from "./PlatTable";
import Plat from "@/models/Plat";
import { useAuth } from "@/contexts/AppContext";
import AddModal from "./AddModal";
import EditModal from "./EditModal";

const PlatPage = () => {
  const [plats, setPlats] = useState<Plat[]>([]);
  const [limit, setLimit] = useState(10);
  const [openAddModaln, setOpenAddModal] = useState(false);
  const [editPlat, setEditPlat] = useState<Plat | undefined>(undefined);
  const { getToken } = useAuth();

  const fetchDishes = useCallback(async () => {
    const token = getToken();
    const res = await fetch(`/api/dish`, {
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

    setPlats(data.data);
  }, [getToken]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const handleDelete = async (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
      const token = getToken();
      const res = await fetch(`/api/dish/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Une erreur est survenue");
        return;
      }

      fetchDishes();
    }
  };

  return (
    <main className="p-4">
      <AddModal
        open={openAddModaln}
        setOpen={setOpenAddModal}
        fetchDishes={fetchDishes}
      />
      <EditModal
        plat={editPlat}
        setPlat={setEditPlat}
        fetchDishes={fetchDishes}
      />
      <PlatTable
        plats={plats}
        limit={limit}
        setLimit={setLimit}
        handleDelete={handleDelete}
        setOpenAddModal={setOpenAddModal}
        setEditPlat={setEditPlat}
      />
    </main>
  );
};

export default PlatPage;
