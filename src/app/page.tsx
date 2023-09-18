"use client";
import FooterNav from "./components/FooterNav";
import Widget from "./components/Widget";
import Sidebar from "./components/Sidebar";
import Topnav from "./components/Topnav";
import Feed from "./components/Feed";
import { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import CommentModal from "./components/CommentModal";

export default function Home() {
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const getAuth = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        if (data.success) {
          dispatch({ type: "GET_AUTH", payload: data.message });
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getAuth();
  }, []);
  return (
    <>
      <main className=" text-white    h-screen max-w-[90rem] lg:mx-auto flex font-blink relative top-0 ">
        {/* Mobile navigation */}
        <Topnav />
        {/* Comment modal */}

        <CommentModal />
        {/*  */}
        <Sidebar />
        <div className="flex flex-1  sm:px-0 w-full sm:w-[88%] md:w-[80%]  relative top-0 h-full">
          <Feed />
          <Widget />
        </div>
      </main>
      <FooterNav />
    </>
  );
}
