"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../providers/Redux.provider";
import { store } from "../store";
import { SnackbarProvider } from "notistack";
import AuthProvider from "@/providers/Auth.Provider";
import { NavbarHome } from "./components/navbar/NavbarHome";
import NecessaryStateProvider from "@/providers/NecessaryState.provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <ReduxProvider store={store}>
          <AuthProvider>
            <NecessaryStateProvider>
              <SnackbarProvider maxSnack={1}>{children}</SnackbarProvider>
            </NecessaryStateProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
