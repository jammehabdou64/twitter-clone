"use client";
import React from "react";
import { UserProvider } from "./UserContext";
import { PostProvider } from "./PostsContext";
import { ModalProvider } from "./ModalContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <PostProvider>
        <ModalProvider>{children}</ModalProvider>
      </PostProvider>
    </UserProvider>
  );
};

export default Providers;
