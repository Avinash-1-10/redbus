import { ADD_TICKET, REMOVE_TICKET } from "../actionType";

const addTicket = (ticket) => {
  return {
    type: ADD_TICKET,
    payload: ticket,
  };
};

const removeTicket = () => {
  return {
    type: REMOVE_TICKET,
  };
};

export { addTicket, removeTicket };
