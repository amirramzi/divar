import axios from "axios";
import ErrorHandler from "@/utils/ErrorHandler";

const callApi = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      return config;
    },
    (err) => {
      throw err;
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      const res = err?.response;
      if (res) {
        if (res.status === 422) {
          throw new ErrorHandler(res.data.errors);
        }
      }

      throw err;
    }
  );

  return axiosInstance;
};

export default callApi;
