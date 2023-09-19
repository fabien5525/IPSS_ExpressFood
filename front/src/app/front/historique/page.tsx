"use client";

import { Paper, Skeleton } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

interface commande {
  id: string;
  id_plat: number;
  nb_plat: number;
  prix_total: number;
  image: undefined | string;
}

const commandesExample = [
  {
    id: "1",
    id_plat: 1,
    nb_plat: 1,
    prix_total: 10,
    image: undefined,
  },
];

interface HistoryPageProps {}

const HistoryPage = (props: HistoryPageProps) => {
  const [commandes, setCommandes] = useState<commande[]>(commandesExample);

  return (
    <main className="py-4">
      <h1 className="text-2xl font-bold px-4 pb-2">Commandes</h1>
      <hr className="border-t-4 border-black" />
      <div className="px-4 pt-4">
        <h2 className="text-gray-500 font-bold">Mes commandes</h2>
        <div className="flex flex-col">
          {commandes.map((commande) => {
            return (
              <Paper key={commande.id} elevation={4} className="flex flex-row mt-4">
                <div className="w-24 p-4">
                  {commande.image ? (
                    <Image
                      className="rounded-full w-full"
                      width={64}
                      height={64}
                      src={commande.image}
                      alt=""
                    />
                  ) : (
                    <Skeleton
                      className="w-full"
                      variant="circular"
                      width={64}
                      height={64}
                    />
                  )}
                </div>
                <div className="w-full text-end p-4">
                  <p>{commande.prix_total}€</p>
                </div>
              </Paper>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HistoryPage;
