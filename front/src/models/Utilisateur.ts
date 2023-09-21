import { JWTPayload } from "jose";

export default interface Utilisateur extends JWTPayload {
    nom: string;
    prenom: string;
    photo: string | undefined;
    telephone: string;
    email: string;
    adresse: string;
  }
  