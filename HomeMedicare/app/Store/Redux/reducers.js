// reducers.js

import {
  ADD_FOLLOWUP,
  UPDATE_FOLLOWUP,
  GET_FOLLOWUPS_FROM_ASYNC_STORAGE,
  SET_FOLLOWUPS_FROM_SERVER,
  ADD_FOLLOWUPS_TO_SERVER,
} from "./actions";
import { combineReducers } from "redux";

const followupsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FOLLOWUP:
      return [...state, action.payload];
    case UPDATE_FOLLOWUP:
      return state.map((followup) =>
        followup.id === action.payload.id ? action.payload : followup
      );
    case SET_FOLLOWUPS_FROM_SERVER:
      return action.payload;
    default:
      return state;
  }
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case GET_FOLLOWUPS_FROM_ASYNC_STORAGE:
    case ADD_FOLLOWUPS_TO_SERVER:
      return true;
    case SET_FOLLOWUPS_FROM_SERVER:
      return false;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  followups: followupsReducer,
  loading: loadingReducer,
});

export default rootReducer;
