"use client";

import { SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/system";

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

export default AppDrawer;
