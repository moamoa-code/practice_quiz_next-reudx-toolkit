
import {
  AnyAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

import users from './userSlice';
import info from "./infoSlice";
import quiz from "./quizSlice";

export const reducer = (state:any, action:AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      users: {
        users: [...action.payload.users.users, ...state.users.users]
      }
  }
  return nextState;
  }
  return combineReducers({
    users,
    info,
    quiz,
  })(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

export const wrapper = createWrapper(makeStore, { debug: true });