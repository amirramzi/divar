"use client";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/store/slice/loginSlice";
import { clearUser, setLoading, setUser } from "@/store/slice/authSlice";
import { useEffect } from "react";
import callApi from "@/services/callApi";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function MyDivarLayout({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      dispatch(setLoading(true));
      try {
        const result = await callApi().get("/user/whoami");
        dispatch(setUser(result.data.mobile));
        if (!result.data.mobile) {
          router.push("/");
          dispatch(openLoginModal());
        }
        if (!result.data.isAdmin) {
          router.push("/my-divar/my-posts");
        }
      } catch (error) {
        dispatch(clearUser());
        if (error) {
          router.push("/");
          dispatch(openLoginModal());
        }
      } finally {
        dispatch(setLoading(false));
      }
    };
    getUser();
  }, []);

  return (
    <div className={inter.className}>
      {loading ? (
        <div className="w-screen h-screen text-center">Loading...</div>
      ) : (
        ""
      )}
      {user && !loading ? <Sidebar>{children}</Sidebar> : ""}
    </div>
  );
}
