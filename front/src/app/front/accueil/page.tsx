"use client";

import { Paper, Skeleton, TextField } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

interface Plat {
  id: number;
  dujour: boolean;
  dessert: boolean;
  prix: number;
  ingredients: any[];
  nom: string;
  image: string | undefined;
}

const platsExample = [
  {
    id: 1,
    dujour: true,
    dessert: false,
    prix: 10,
    ingredients: ["poulet", "riz", "sauce"],
    nom: "Poulet riz sauce",
    image: undefined,
  },
];

const AccueilPage = () => {
  const [plats, setPlats] = useState<Plat[]>(platsExample);
  const [filter, setFilter] = useState("");

  return (
    <main className="p-2 min-h-[100dvh]">
      <div className="pb-2">
        <p className="text-xs">Livrer maintenant</p>
        <p className="text-xs font-bold">Address...</p>
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
