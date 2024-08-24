"use client";

import callApi from "@/services/callApi";
import { setCategory } from "@/store/slice/categorySlice";
import { setProvince } from "@/store/slice/provinceSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const getCategories = async (dispatch) => {
  try {
    const result = await callApi().get("/category");
    dispatch(setCategory(result.data));
  } catch (error) {
    console.log(error);
  }
};
export const getProvince = async (dispatch) => {
  try {
    const result = await callApi().get("/province");
    dispatch(setProvince(result.data));
  } catch (error) {
    console.log(error);
  }
};

const NecessaryStateProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories(dispatch);
    getProvince(dispatch);
  }, [dispatch]);
  return <>{children}</>;
};

export default NecessaryStateProvider;
