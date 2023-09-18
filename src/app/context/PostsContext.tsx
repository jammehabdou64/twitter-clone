import React, { createContext, useReducer } from "react";
import { PostStateType, PostActionType } from "../types";

const initialState = {
  posts: [],
};

export const PostsContext = createContext<{
  state: PostStateType;
  dispatch: React.Dispatch<PostActionType>;
}>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: PostStateType, action: PostActionType) => {
  switch (action.type) {
    case "GET_ALL_POSTS":
      return {
        ...state,
        posts: [...action.payload],
      };

    case "SAVE_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    default:
      return state;
  }
};

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PostsContext.Provider value={{ state, dispatch }}>
      {children}
    </PostsContext.Provider>
  );
};
