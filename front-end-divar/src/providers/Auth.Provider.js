"use client";

import callApi from "@/services/callApi";
import {
  clearUser,
  setUser,
  setLoading,
  setIsAdmin,
} from "@/store/slice/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const getUser = async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const result = await callApi().get("/user/whoami");
    dispatch(setIsAdmin(result.data.isAdmin));
    dispatch(setUser(result.data.mobile));
  } catch (error) {
    dispatch(clearUser());
  } finally {
    dispatch(setLoading(false));
  }
};

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);
  return <>{children}</>;
};

export default AuthProvider;
