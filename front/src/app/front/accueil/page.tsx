"use client";

import { Paper, Skeleton, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AppContext";

interface Plat {
  id: number;
  dujour: boolean;
  dessert: boolean;
  prix: number;
  ingredients: any[];
  nom: string;
  image: string | undefined;
}

const AccueilPage = () => {
  const [plats, setPlats] = useState<Plat[]>([]);
  const [filter, setFilter] = useState("");
  const { user, getToken } = useAuth(); 

  const fetchDishes = useCallback(async () => {
    const token = getToken();
    const res = await fetch(`/api/dish`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!res.ok) {
      return;
    }

    const data = await res.json();

    setPlats(data.data ?? []);
  }, [getToken]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes])

  return (
    <main className="p-2 min-h-[100dvh]">
      <div className="pb-2">
        <p className="text-xs">Livrer maintenant</p>
        <p className="text-xs font-bold">{user?.adresse}</p>
      </div>
      <input
        type="text"
        placeholder="Rechercher un plat"
        className="w-full bg-gray-200 rounded-full border-none px-4 py-2 mb-4"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value ?? "");
        }}
      ></input>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plats.map((plat) => {
          return (
            <Paper
              elevation={4}
              key={plat.id}
              className="flex justify-between flex-col p-4"
            >
              {plat.image ? (
                <Image
                  className="rounded-lg w-full"
                  width={320}
                  height={180}
                  src={plat.image}
                  alt={plat.nom}
                />
              ) : (
                <Skeleton variant="rounded" width={320} height={180} />
              )}
              <div className="flex flex-row justify-between pt-2">
                <span className="font-bold text-bold">{plat.nom}</span>
                <span>{plat.prix}€</span>
              </div>
            </Paper>
          );
        })}
      </div>
    </main>
  );
};

export default AccueilPage;
