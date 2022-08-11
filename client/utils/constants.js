import store from "store";

export const BACKEND_URL = "http://localhost:8080/api";

export const GetJWTToken = () => {
  return store.getState().user.user.token;
};
