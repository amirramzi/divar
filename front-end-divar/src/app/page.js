"use client";

import dynamic from "next/dynamic";
import { useIsLaptop } from "@/hooks/useMediaQuery";

const Navigation = dynamic(
  () =>
    import("./components/bottom-navigation/Navigation").then((module) => {
      return module.Navigation;
    }),
  { ssr: false }
);

const NavbarHome = dynamic(
  () =>
    import("./components/navbar/NavbarHome").then((module) => {
      return module.NavbarHome;
    }),
  { ssr: false }
);

export default function Home() {
  const isLaptop = useIsLaptop();

  return <>{/* <NavbarHome /> */}</>;
}
