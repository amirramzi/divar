import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setCategory } from "@/store/slice/categorySlice";

const useFetchCategories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await axios.get("http://localhost:3000/category");
        dispatch(setCategory(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, [dispatch]);
};

export default useFetchCategories;
