import HomeLayout from "@/components/AppLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <html lang="fr">
      <body>
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
};

export default AuthLayout;
