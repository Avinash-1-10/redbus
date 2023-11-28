import { ADD_TRIPS, CLEAR_TRIPS } from "../actionType";

const addTrips = (trips) => {
  return {
    type: ADD_TRIPS,
    payload: trips,
  };
};

const clearTrips = () => {
  return {
    type: CLEAR_TRIPS,
  };
};

export { addTrips, clearTrips };
