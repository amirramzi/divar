"use client";
import NavbarHome from "../navbar/NavbarHome";
import dynamic from "next/dynamic";
const Navigation = dynamic(() => import("../bottom-navigation/Navigation"), {
  ssr: false,
});
const NavProvider = ({ children }) => {
  return (
    <>
      <NavbarHome />
      {children}
      <Navigation />
    </>
  );
};

export default NavProvider;
