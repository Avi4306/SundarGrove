import { getTopUsers } from "../api/index";
import { TOP_USERS_START, TOP_USERS_SUCCESS, TOP_USERS_FAIL } from "../constants/actionTypes";


export const fetchTopUsers = () => async (dispatch) => {
  dispatch({ type: TOP_USERS_START });
  try {
    const { data } = await getTopUsers();
    dispatch({ type: TOP_USERS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: TOP_USERS_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};