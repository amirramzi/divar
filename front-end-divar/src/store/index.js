import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/categorySlice";
import provinceReducer from "./slice/provinceSlice";
import loginReducer from "./slice/loginSlice";
import authReducer from "./slice/authSlice";
import createPostReducer from "./slice/createPostSlice";
import phoneTimeoutMiddleware from "./middleware/phoneTimeoutMiddleware";
import saveToLocalStorage, {
  loadFromLocalStorage,
} from "./middleware/saveToLocalStorage";

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    province: provinceReducer,
    login: loginReducer,
    auth: authReducer,
    createPost: createPostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(phoneTimeoutMiddleware, saveToLocalStorage),
  preloadedState: {
    createPost: preloadedState,
  },
});
