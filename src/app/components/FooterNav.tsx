import Link from "next/link";
import React from "react";
import {
  MdHome,
  MdMessage,
  MdOutlineNotifications,
  MdSearch,
} from "react-icons/md";

const FooterNav = () => {
  return (
    <footer className="sm:hidden w-full bg-black border-t-2 border-dark text-white  py-4 px-3 z-40 fixed bottom-0">
      <nav className="w-full ">
        <ul className="flex justify-around">
          <li>
            <Link href={"/"}>
              <MdHome size={25} />{" "}
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <MdSearch size={25} />{" "}
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <MdOutlineNotifications size={25} />{" "}
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <MdMessage size={25} />{" "}
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default FooterNav;
