
import axios from "axios";
import {
  FETCH_TRIPS_REQUEST,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILURE,
} from "../actionType";

export const fetchTrips = () => async (dispatch, getState) => {
  dispatch({ type: FETCH_TRIPS_REQUEST });

  try {
    const filter = getState().filter;
    console.log(filter, "filter from redux thunk")
    const response = await axios.get("http://localhost:4000/api/trips", {
      params: filter,
    });

    const data = response.data;
    dispatch({ type: FETCH_TRIPS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TRIPS_FAILURE, payload: error.message });
  }
};
