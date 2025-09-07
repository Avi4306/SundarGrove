import {jwtDecode} from "jwt-decode";
import { logout } from "../actions/user.js";

export const checkTokenExpiry = (token, dispatch) => {
  if (!token) return;

  try {
    const decoded = jwtDecode(token); // { exp: 1691234567, ... }
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // already expired
      dispatch(logout());
    } else {
      // schedule logout when token will expire
      const timeLeft = decoded.exp * 1000 - Date.now();
      setTimeout(() => {
        dispatch(logout());
      }, timeLeft);
    }
  } catch (err) {
    console.error("Invalid token:", err);
    dispatch(logout());
  }
};