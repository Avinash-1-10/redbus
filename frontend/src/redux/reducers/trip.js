import { FETCH_TRIPS_REQUEST, FETCH_TRIPS_SUCCESS, FETCH_TRIPS_FAILURE } from '../actionType';

const initialState = {
  trips: [],
  loading: false,
  error: null,
};

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRIPS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TRIPS_SUCCESS:
      return { ...state, loading: false, trips: action.payload };
    case FETCH_TRIPS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default tripsReducer;
