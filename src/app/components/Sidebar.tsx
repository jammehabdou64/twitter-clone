"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { navLists } from "./navList";
import Link from "next/link";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import LogoutModal from "./LogoutModal";
import { MdCreate } from "react-icons/md";

const Sidebar = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);
  const auth: any = user;

  const [loading, setLoading] = useState(true);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        if (data.success) {
          dispatch({ type: "SET_AUTH", payload: data.message });
          return setLoading(false);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    getAuth();
  }, []);

  return (
    <header
      className=" hidden
     sm:block sm:w-[12%] md:w-[200px] lg:w-[300px]  relative top-0"
    >
      <div
        className=" hidden
        sm:block fixed top-0 w-[12%] md:w-[200px] lg:w-[300px]  overflow-y-scroll sm:pr-3 md:pr-5 lg:px-0
       overflow-x-hidden lg:pl-0 lg:overflow-hidden h-screen  "
      >
        {loading ? (
          ""
        ) : (
          <nav className="md:pl-0 -mr-2 ">
            <div className="logo pr-2 lg:pl-5 xl:pl-8 mt-1 flex justify-end lg:justify-start">
              <Image src={"/logo.png"} alt="logo" width={52} height={50} />
            </div>
            <ul className="mt-3 ">
              {navLists.map(({ name, path, image, Icon }, index) => (
                <li key={index} className="lg:px-7   mr-auto">
                  <Link
                    href={path}
                    className="flex justify-end lg:justify-start  lg:px-1 xl:px-3 py-[9px] lg:hover:bg-dark  lg:hover:rounded-full l lg:items-center"
                  >
                    {image ? (
                      <Image
                        src={`${image}`}
                        width={40}
                        height={38}
                        alt="verified"
                        className="sm:mr-3 md:mr-5 lg:mr-3 "
                      />
                    ) : (
                      <Icon size={30} className=" md:mr-5 mr-3  " />
                    )}
                    <span className="font-normal text-xl hidden lg:block">
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className=" flex justify-end lg:justify-start sm:mr-0 md:ml-0 md:px-5 my-3 sm:px-2 lg:px-9">
              <button className="  bg-primary text-white p-3 items-center flex lg:block lg:p-[15px] lg:w-full rounded-full">
                <span className="hidden lg:inline-block">post</span>
                <span className="inline-block lg:hidden">
                  <MdCreate />
                </span>
              </button>
            </div>
            <div
              onClick={() => setModal((prev) => !prev)}
              className="flex cursor-pointer relative top-0 right-0 left-0 mt-5 lg:ml-3 pt-2 justify-end py-[10px] gap-2 sm:px-3 md:px-5 mr-3 sm:mr-0 lg:justify-start"
            >
              <Image
                src={"/abdou.jpg"}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full w-8 h-8 md:h-10 md:w-10"
              />
              <div className="hidden lg:block">
                <p>{auth.name}</p>
                <p className="text-sm text-gray-500">@{auth?.username}</p>
              </div>
              <div className={`${showModal ? "block" : "hidden"}`}>
                <LogoutModal auth={auth} />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Sidebar;
