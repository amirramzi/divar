"use client";

import dynamic from "next/dynamic";
import { useIsLaptop } from "@/hooks/useMediaQuery";
import PostCard from "./components/shared/post/PostCard";
import { useEffect } from "react";
import callApi from "@/services/callApi";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "@/store/slice/postSlice";
import { NavbarHome } from "./components/navbar/NavbarHome";
import { Container } from "@mui/material";
import PostCol from "./components/shared/post/PostCol";

// const Navigation = dynamic(
//   () =>
//     import("./components/bottom-navigation/Navigation").then((module) => {
//       return module.Navigation;
//     }),
//   { ssr: false }
// );

// const NavbarHome = dynamic(
//   () =>
//     import("./components/navbar/NavbarHome").then((module) => {
//       return module.NavbarHome;
//     }),
//   { ssr: false }
// );

export default function Home() {
  const isLaptop = useIsLaptop();

  return (
    <>
      <NavbarHome />
      <Container maxWidth="xl" className="flex mt-10">
        <div className="w-1/4 hidden lg:block">dassdas</div>
        <PostCol />
      </Container>
    </>
  );
}
