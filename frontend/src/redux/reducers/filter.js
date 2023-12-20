import { CLEAR_FILTER, EDIT_FILTER } from "../actionType";

const initialState = {};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_FILTER:
      return { ...state, ...action.payload };
    case CLEAR_FILTER:
      return initialState;
    default:
      return state;
  }
};

export default filterReducer;
