import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
};

export default AuthLayout;
