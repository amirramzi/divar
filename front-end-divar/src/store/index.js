import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/categorySlice";
import provinceReducer from "./slice/provinceSlice";
import loginReducer from "./slice/loginSlice";
import authReducer from "./slice/authSlice";
import createPostReducer from "./slice/create-post-slice/createPostSlice";
import addressCreatePostReducer from "./slice/create-post-slice/addressCreatePostSlice";
import usersReducer from "./slice/usersSlice";
import categoryAdminReducer from "./slice/CategoryAdminSlice";
import postReducer from "./slice/postSlice";
import navigationCategoryReducer from "./slice/navigationCategory";
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
    addressCreatePost: addressCreatePostReducer,
    users: usersReducer,
    categoryAdmin: categoryAdminReducer,
    post: postReducer,
    navigationCategory: navigationCategoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(phoneTimeoutMiddleware, saveToLocalStorage),
  preloadedState: {
    createPost: preloadedState,
  },
});
