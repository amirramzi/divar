"use client";

import { Container } from "@mui/material";
import PostCol from "./components/shared/post/PostCol";
import SidebarHome from "./components/shared/SidebarHome";
import NavProvider from "./components/shared/NavProvider";
export default function Home() {
  return (
    <div className="h-screen lg:h-fit overflow-x-hidden relative">
      <NavProvider>
        <Container maxWidth="xl" className="flex justify-center pt-20">
          <SidebarHome />
          <PostCol />
        </Container>
      </NavProvider>
    </div>
  );
}
