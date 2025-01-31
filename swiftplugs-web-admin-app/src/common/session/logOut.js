// import { batch } from "react-redux";
import { unstable_batchedUpdates } from "react-dom"
import { store } from "../../store";
import authBaseApi from "../request/authBaseApi";
import unauthBaseApi from "../request/unauthBaseApi";
import { removeAccessToken } from "./cookies";
import { AUTH } from "../../RouteConstants";

const logOut = () => {
  sessionStorage.clear();
  localStorage.clear();
  unstable_batchedUpdates(() => {
    store.dispatch(authBaseApi.util.resetApiState());
    store.dispatch(unauthBaseApi.util.resetApiState());
  });
  removeAccessToken();
  window.location.hash = `#${AUTH.SIGNIN}`;
};

export default logOut;
