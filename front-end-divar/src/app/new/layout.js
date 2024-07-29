"use client";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "@/store/slice/loginSlice";
import { clearUser, setLoading, setUser } from "@/store/slice/authSlice";
import { useEffect } from "react";
import callApi from "@/services/callApi";
import { setCategoryParent } from "@/store/slice/create-post-slice/createPostSlice";

const inter = Inter({ subsets: ["latin"] });

export default function NewPostLayout({ children }) {
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
      } catch (error) {
        dispatch(clearUser());
        router.push("/");
        dispatch(openLoginModal());
      } finally {
        dispatch(setLoading(false));
      }
    };
    getUser();
  }, [dispatch, router]);

  useEffect(() => {
    const createPostCategory = async () => {
      try {
        const result = await callApi().get("/post/new");
        dispatch(setCategoryParent(result?.data?.categories));
      } catch (error) {
        console.log(error);
      }
    };
    createPostCategory();
  }, [dispatch]);

  return (
    <div className={inter.className}>
      {loading ? (
        <div className="w-screen h-screen text-center">Loading...</div>
      ) : (
        user && <div>{children}</div>
      )}
    </div>
  );
}
