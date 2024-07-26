const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  if (typeof window !== "undefined") {
    const state = store.getState().createPost;
    const now = new Date();
    const item = {
      value: state,
      expiry: now.getTime() + 15 * 60 * 1000, // 15 minutes expiry
    };
    localStorage.setItem("createPostState", JSON.stringify(item));
  }
  return result;
};

export const loadFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return undefined;
  }
  try {
    const itemStr = localStorage.getItem("createPostState");
    if (!itemStr) {
      return undefined;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage.removeItem("createPostState");
      return undefined;
    }
    return item.value;
  } catch (e) {
    console.warn("Could not load state from local storage", e);
    return undefined;
  }
};

export default saveToLocalStorage;
