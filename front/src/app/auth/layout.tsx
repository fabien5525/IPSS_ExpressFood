"use client";

import HomeLayout from "@/app/AppLayout";
import { useAuth } from "@/contexts/AppContext";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const { getRoles } = useAuth();
  const router = useRouter();

  if (getRoles.length > 0) {
    const roles = getRoles();
    if (roles.includes("admin")) {
      router.push("/admin/utilisateur");
    } else {
      router.push("/front/accueil");
    }
  }

  return (
    <html lang="fr">
      <body>
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
};

export default AuthLayout;
