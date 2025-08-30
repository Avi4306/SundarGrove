import { predictMangrove } from "../api";
import { PREDICT_START, PREDICT_SUCCESS, PREDICT_FAIL } from "../constants/actionTypes";

export const handlePrediction = (file) => async (dispatch) => {
  dispatch({ type: PREDICT_START });
  try {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await predictMangrove(formData);
    console.log("Prediction data from predict,js:", data); // Debugging line
    dispatch({ type: PREDICT_SUCCESS, payload: data });
    return data;
  } catch (err) {
    dispatch({
      type: PREDICT_FAIL,
      payload: err.response?.data?.message || err.message,
    });
    throw err;
  }
};