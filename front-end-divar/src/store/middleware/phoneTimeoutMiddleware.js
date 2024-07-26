import { setPhone } from "../slice/loginSlice";

const phoneTimeoutMiddleware = (store) => (next) => (action) => {
  if (action.type === setPhone.type) {
    const result = next(action);
    setTimeout(() => {
      store.dispatch(setPhone(null));
    }, 1000 * 30);
    return result;
  }
  return next(action);
};

export default phoneTimeoutMiddleware;
