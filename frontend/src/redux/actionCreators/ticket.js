import { ADD_TICKET, REMOVE_TICKET } from "../actionType";

const addTicket = (ticketInfo) => {
  return {
    type: ADD_TICKET,
    payload: ticketInfo,
  };
};

const removeTicket = () => {
  return {
    type: REMOVE_TICKET,
  };
};

export { addTicket, removeTicket };
