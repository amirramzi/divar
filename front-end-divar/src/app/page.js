"use client";

import { NavbarHome } from "./components/navbar/NavbarHome";
import { Container } from "@mui/material";
import PostCol from "./components/shared/post/PostCol";
import Navigation from "./components/bottom-navigation/Navigation";


export default function Home() {


  return (
    <div className="h-screen lg:h-fit overflow-x-hidden">
      <NavbarHome />
      <Container maxWidth="xl" className="flex mt-10">
        <div className="w-1/4 hidden lg:block">dassdas</div>
        <PostCol />
      </Container>
      <Navigation />
    </div>
  );
}
