import { combineReducers } from "redux";
import filterReducer from "./filter";
import ticketReducer from "./ticket";
import tripsReducer from "./trip";

const rootReducer = combineReducers({
  filter: filterReducer,
  ticket:ticketReducer,
  trips: tripsReducer
});

export default rootReducer;
