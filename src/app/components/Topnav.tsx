import Image from "next/image";
import React from "react";

const Topnav = () => {
  return (
    <header className=" sm:hidden w-full bg-black py-2 px-4 fixed top-0 left-0 z-30 ">
      <nav className=" flex">
        <div className="profile">
          <Image
            src={"/abdou.jpg"}
            alt="profile"
            width={50}
            height={50}
            className="w-8 h-8 rounded-full object-container"
          />{" "}
        </div>
        <div className="logo flex-1 justify-center flex">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="w-9"
          />
        </div>
      </nav>
    </header>
  );
};

export default Topnav;
