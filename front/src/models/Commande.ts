export interface CommandeSimple {
    prix_total: number;
    etat: "Reçu" | "En cours de préparation" | "En cours de livraison" | "Livrée" | "Annulée";
    user: number;
    plats: number[];
}

export interface CommandeComplet extends CommandeSimple {
    id: number;
    userLivreur: number | null;
}
