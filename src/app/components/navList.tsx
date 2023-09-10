import {
  MdHome,
  MdOutlineList,
  MdOutlineMessage,
  MdOutlineMore,
  MdOutlineNotifications,
  MdOutlinePeople,
  MdOutlinePerson,
  MdSearch,
} from "react-icons/md";
export const navLists = [
  {
    name: "Home",
    path: "/",
    Icon: MdHome,
    image: false,
  },
  {
    name: "Explore",
    path: "/",
    Icon: MdSearch,
    image: false,
  },
  {
    name: "Notifications",
    path: "/",
    Icon: MdOutlineNotifications,
    image: false,
  },
  {
    name: "Messages",
    path: "/",
    Icon: MdOutlineMessage,
    image: false,
  },
  {
    name: "Lists",
    path: "/",
    Icon: MdOutlineList,
    image: false,
  },
  {
    name: "Community",
    path: "/",
    Icon: MdOutlinePeople,
    image: false,
  },
  {
    name: "Verified",
    path: "/",
    Icon: false,
    image: "/logo.png",
  },
  {
    name: "Profile",
    path: "/",
    Icon: MdOutlinePerson,
    image: false,
  },
  {
    name: "More",
    path: "/",
    Icon: MdOutlineMore,
    image: false,
  },
];
