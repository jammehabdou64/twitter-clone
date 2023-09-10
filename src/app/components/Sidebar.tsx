import Image from "next/image";
import React from "react";
import { navLists } from "./navList";
import Link from "next/link";

const Sidebar = () => {
  return (
    <header
      className=" hidden
     sm:block sm:w-[12%] md:w-[22%]  relative top-0"
    >
      <div
        className=" hidden
        sm:block fixed top-0 w-[12%] md:w-[22%] xl:w-[20%] overflow-y-scroll sm:pr-3 md:pr-5 lg:px-0
       overflow-x-hidden lg:pl-0 lg:overflow-hidden lg:border-r h-screen border-dark "
      >
        <nav className="md:pl-0 -mr-2 ">
          <div className="logo pr-2 lg:pl-5 xl:pl-8 mt-1 flex justify-end lg:justify-start">
            <Image src={"/logo.png"} alt="logo" width={52} height={50} />
          </div>
          <ul className="mt-3 ">
            {navLists.map(({ name, path, image, Icon }, index) => (
              <li key={index} className="lg:px-7   mr-auto">
                <Link
                  href={path}
                  className="flex justify-end lg:justify-start  lg:px-1 xl:px-3 py-[9px] hover:bg-dark hover:rounded-full w-full lg:items-center"
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
                    <Icon size={30} className=" md:mr-5 mr-3" />
                  )}
                  <span className="font-normal text-xl hidden lg:block">
                    {name}
                  </span>
                </Link>
              </li>
            ))}
            <li className=" flex justify-end lg:justify-start sm:mr-0 md:ml-0 md:px-5 my-3 sm:px-2 lg:px-7">
              <button className="bg-primary text-white p-1 lg:p-[15px] lg:w-full rounded-full">
                post
              </button>
            </li>
            <li className="flex lg:absolute lg:bottom-0 justify-end py-[10px] gap-2 sm:px-3 md:px-5 mr-3 sm:mr-0 lg:justify-start">
              <Image
                src={"/abdou.jpg"}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full w-8 h-8 md:h-10 md:w-10"
              />
              <div className="hidden lg:block">
                <p>Abdou</p>
                <p className="text-sm text-gray-500">@Abdou53540000</p>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Sidebar;
