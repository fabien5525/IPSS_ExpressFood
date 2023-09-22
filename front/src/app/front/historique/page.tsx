"use client";

import { Paper, Skeleton } from "@mui/material";
import { use, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AppContext";
import { getPayload } from "@/libs/auth";
import { CommandeComplet } from "@/models/Commande";

interface HistoryPageProps {}

const HistoryPage = (props: HistoryPageProps) => {
  const [commandes, setCommandes] = useState<CommandeComplet[]>([]);
  const { getToken } = useAuth();

  const fetchOrders = useCallback(async () => {
    const token = getToken();

    if (!token) {
      return;
    }

    const { id } = getPayload(token);

    const res = await fetch(`/api/order/?user=${id}`, {
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

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <main className="py-4">
      <h1 className="text-2xl font-bold px-4 pb-2">Commandes</h1>
      <hr className="border-t-4 border-black" />
      <div className="px-4 pt-4">
        <h2 className="text-gray-500 font-bold">Mes commandes</h2>
        <div className="flex flex-col">
          {commandes.map((commande) => {
            return (
              <Paper
                key={commande.id}
                elevation={4}
                className="flex flex-col mt-4 p-4"
              >
                <div className="w-full text-start ">
                  <p className="font-bold">{`#${commande.id}`}</p>
                </div>
                <hr className="mb-2 border-t-2" />
                <div className="w-full flex flex-row justify-between">
                  <span>État:</span>
                  <span>{commande.etat}</span>
                </div>
                <div className="w-full text-end">
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
