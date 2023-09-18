import React, { createContext, useReducer } from "react";
import { ModalActionType, ModalType } from "../types";

// type PostType = {
//   _id: string;
//   author: {} | any;
//   text?: string;
//   image?: string;
//   description?: string;
//   likes: Array<any>;
//   comments: Array<any>;
// };

const initialState = {
  showModal: false,
  post: {},
};

export const ModalContext = createContext<{
  state: ModalType;
  dispatch: React.Dispatch<ModalActionType>;
}>({ state: initialState, dispatch: () => {} });

const reducer = (state: ModalType, action: ModalActionType) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        showModal: true,
        post: action.payload,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        showModal: false,
      };

    default:
      return state;
  }
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
