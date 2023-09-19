"use client";

import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Link from "next/link";
import AppDrawer from "./AppDrawer";
import { useRouter } from "next/navigation";

interface AppLayoutProps {
  children: ReactNode;
}

const HomeLayout = (props: AppLayoutProps) => {
  const { children } = props;

  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <AppDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md min-h-[8dvh]">
        <IconButton onClick={() => setOpenDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <span>
            Express <b>Food</b>
          </span>
        </Link>
        <Link href="/front/accueil">
          <IconButton>
            <AccountCircleRoundedIcon className="text-white bg-black rounded-full" />
          </IconButton>
        </Link>
        <button
          className="bg-black text-white px-2 py-1 rounded-full"
          onClick={() => {
            router.push("/auth/inscription");
          }}
        >
          Inscription
        </button>
      </nav>
      {children}
    </>
  );
};

export default HomeLayout;
