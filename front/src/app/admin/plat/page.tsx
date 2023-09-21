"use client";

import { useCallback, useEffect, useState } from "react";
import PlatTable from "./PlatTable";
import Plat from "@/models/Plat";
import { useAuth } from "@/contexts/AppContext";
import AddModal from "./AddModal";

const PlatPage = () => {
  const [plats, setPlats] = useState<Plat[]>([]);
  const [limit, setLimit] = useState(10);
  const [openAddModaln, setOpenAddModal] = useState(false);
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

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
      //TODO: fetch API
    }
  };

  return (
    <main className="p-4">
      <AddModal open={openAddModaln} setOpen={setOpenAddModal} fetchDishes={fetchDishes} />
      <PlatTable
        plats={plats}
        setPlats={setPlats}
        limit={limit}
        setLimit={setLimit}
        handleDelete={handleDelete}
        setOpenAddModal={setOpenAddModal}
      />
    </main>
  );
};

export default PlatPage;
