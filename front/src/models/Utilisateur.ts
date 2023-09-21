interface UtilisateurComplet {
  id: number;
  last_login: string | null;
  is_superuser: boolean;
  first_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  nom: string;
  prenom: string;
  adresse: string;
  mail: string;
  photo: string;
  tel: string;
  username: string;
  roles: number[];
}

interface utilisateurSimple {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  mail: string;
  photo: string | null;
  tel: string;
}

export type { UtilisateurComplet, utilisateurSimple};
