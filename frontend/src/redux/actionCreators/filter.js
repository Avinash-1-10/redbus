import {
  ADD_FILTER,
  CLEAR_FILTER,
  EDIT_FILTER,
  REMOVE_FILTER,
} from "../actionType";

const addFilter = (filter) => {
  return {
    type: ADD_FILTER,
    payload: filter,
  };
};

const removeFiltre = () => {
  return {
    type: REMOVE_FILTER,
  };
};

const editFilter = (filter) => {
  return {
    type: EDIT_FILTER,
    payload:filter
  };
};

const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
};

export { addFilter, removeFiltre, editFilter, clearFilter };
