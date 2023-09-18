"use client";

import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import { ReactNode, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

interface AppDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AppDrawer = (props: AppDrawerProps) => {
  const { open, setOpen } = props;
  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        className="flex flex-col items-center h-[100dvh] mx-4"
      >
        <p className="m-8">
          Express <b>Food</b>
        </p>
        <button className="bg-black text-white px-6 py-4 w-full rounded mb-4">
          Inscripton
        </button>
        <button className="bg-gray-100 text-black px-6 py-4 w-full rounded mb-4">
          Connexion
        </button>
      </Box>
    </SwipeableDrawer>
  );
};

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const { children } = props;

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <AppDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <nav className="flex items-center justify-between p-4 bg-gray-100 shadow-md min-h-[8dvh]">
        <IconButton onClick={() => setOpenDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <span>
          Express <b>Food</b> 🍔
        </span>
        <IconButton>
          <AccountCircleRoundedIcon className="text-white bg-black rounded-full" />
        </IconButton>
        <button className="bg-black text-white px-2 py-1 rounded-full">
          Inscription
        </button>
      </nav>
      {children}
    </>
  );
};

export default AppLayout;
