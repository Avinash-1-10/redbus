import { ADD_TICKET, REMOVE_TICKET } from "../actionType";

const initialState = {};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TICKET:
      return { ...state, ...action.payload };
    case REMOVE_TICKET:
      return initialState;
    default:
      return state;
  }
};

export default ticketReducer;
