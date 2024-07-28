"use client";

import callApi from "@/services/callApi";
import { clearUser, setUser, setLoading } from "@/store/slice/authSlice";
import { setCategory } from "@/store/slice/categorySlice";
import { setCity, setProvince } from "@/store/slice/provinceSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const getCategories = async (dispatch) => {
  //dispatch(setLoading(true));
  try {
    const result = await callApi().get("/category");
    dispatch(setCategory(result.data));
  } catch (error) {
    console.log(error);
  } finally {
    //dispatch(setLoading(false));
  }
};
export const getProvince = async (dispatch) => {
  //dispatch(setLoading(true));
  try {
    const result = await callApi().get("/province");
    dispatch(setProvince(result.data));
  } catch (error) {
    console.log(error);
  } finally {
    //dispatch(setLoading(false));
  }
};
export const getCity = async (dispatch) => {
  //dispatch(setLoading(true));
  try {
    const result = await callApi().get("/province/cities");
    dispatch(setCity(result.data));
  } catch (error) {
    console.log(error);
  } finally {
    //dispatch(setLoading(false));
  }
};

const NecessaryStateProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCategories(dispatch);
    getProvince(dispatch);
    getCity(dispatch);
  }, [dispatch]);
  return <>{children}</>;
};

export default NecessaryStateProvider;
