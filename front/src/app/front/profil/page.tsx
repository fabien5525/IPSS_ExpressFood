"use client";

import { useAuth } from "@/contexts/AppContext";
import { Skeleton } from "@mui/material";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <main>
      <div className="p-4 flex flex-row justify-between">
        <p className="text-lg font-bold">
          {user?.nom} {user?.prenom}
        </p>
        <Skeleton variant="circular" width={64} height={64} />
      </div>
      <div className="p-4">
        <p className="text-2xl font-bold">Information sur le compte</p>
        <div className="flex flex-col">
          <div className="py-4">
            <p>Nom</p>
            <p className="text-gray-500">
              {user?.prenom} {user?.nom}
            </p>
          </div>
          <hr />
          <div className="py-4">
            <p>Téléphone</p>
            <p className="text-gray-500">{user?.tel}</p>
          </div>
          <hr />
          <div className="py-4">
            <p>Adresse e-mail</p>
            <p className="text-gray-500">{user?.mail}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
