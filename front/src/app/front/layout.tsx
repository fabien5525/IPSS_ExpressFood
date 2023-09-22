"use client";

import { AppBar, IconButton, Toolbar } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";

interface FrontLayoutProps {
  children: ReactNode;
}

export type pages = "home" | "history" | "account";
export type pagesTranslated = "accueil" | "historique" | "profil";

const translatePage = (page: pages): pagesTranslated => {
  switch (page) {
    case "home":
      return "accueil";
    case "history":
      return "historique";
    case "account":
      return "profil";
  }
};

const unTransaltePage = (page: pagesTranslated): pages => {
  switch (page) {
    case "accueil":
      return "home";
    case "historique":
      return "history";
    case "profil":
      return "account";
  }
};

const FrontLayout = ({ children }: FrontLayoutProps) => {
  const [page, setPage] = useState<pages>("home");
  const router = useRouter();

  const handleChangePage = (page: pages) => {
    setPage(page);
    const translatedPage = translatePage(page);

    if (window && window.location.pathname !== `/front/${translatedPage}`) {
      router.push(`/front/${translatedPage}`);
    }
  };

  // useEffect(() => {
  //   if (window && window.location.pathname.startsWith("/front/")) {
  //     const pathname = window.location.pathname.replace(
  //       "/front/",
  //       ""
  //     ) as pagesTranslated;

  //     const _page = unTransaltePage(pathname);

  //     setPage(_page);
  //   }
  // }, [setPage, page]);

  const menuStyle = "w-full text-center h-[56px] pt-2 ";

  return (
    <>
      {children}
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "auto", bottom: 0 }}
        className="bg-gray-100 shadow-md text-black"
      >
        <Toolbar className=" p-0">
          <div
            className={`${menuStyle} ${page === "home" && "bg-gray-300"} `}
            onClick={() => handleChangePage("home")}
          >
            <IconButton color="inherit">
              <HomeIcon />
            </IconButton>
          </div>
          <div
            className={`${menuStyle} ${page === "history" && "bg-gray-300"}`}
            onClick={() => handleChangePage("history")}
          >
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
          </div>
          <div
            className={`${menuStyle} ${page === "account" && "bg-gray-300"}`}
            onClick={() => handleChangePage("account")}
          >
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default FrontLayout;
