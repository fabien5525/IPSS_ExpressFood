"use client";

import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Link from "next/link";
import AppDrawer from "./AppDrawer";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  const [openDrawer, setOpenDrawer] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (window && window.location.pathname.startsWith("/front/")) {
      setIsConnected(true);
    }
  }, []);

  return (
    <>
      <AppDrawer open={openDrawer} setOpen={setOpenDrawer} />
      {!isConnected && (
        <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md min-h-[8dvh]">
          <IconButton onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <span>
              Express <b>Food</b> 🍔
            </span>
          </Link>
          <Link href="/front/accueil">
            <IconButton>
              <AccountCircleRoundedIcon className="text-white bg-black rounded-full" />
            </IconButton>
          </Link>
          <button className="bg-black text-white px-2 py-1 rounded-full">
            Inscription
          </button>
        </nav>
      )}
      {children}
    </>
  );
};

export default AppLayout;
