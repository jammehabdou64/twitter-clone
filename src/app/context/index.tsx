"use client";
import React from "react";
import { UserProvider } from "./UserContext";
import { PostProvider } from "./PostsContext";
import { ModalProvider } from "./ModalContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        if (data.success) {
          console.log(data);
          dispatch({ type: "GET_AUTH", payload: data.message });
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getAuth();
  }, []);
  return (
    <UserProvider>
      <PostProvider>
        <ModalProvider>{children}</ModalProvider>
      </PostProvider>
    </UserProvider>
  );
};

export default Providers;
