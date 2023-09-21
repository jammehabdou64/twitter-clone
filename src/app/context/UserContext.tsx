import React, { createContext, useReducer } from "react";
import { UserActionType, UserStateType } from "../types";

const initialState = {
  user: {},
};

export const UserContext = createContext<{
  state: UserStateType;
  dispatch: React.Dispatch<UserActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: UserStateType, action: UserActionType) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
