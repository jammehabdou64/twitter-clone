import React, { createContext, useReducer } from "react";
import { PostStateType, PostActionType } from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: true,
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
        loading: false,
      };

    case "SAVE_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };

    case "SHOW_POST":
      return {
        ...state,
        post: state.posts.filter((post) => post._id === action.payload, 0)[0],
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
