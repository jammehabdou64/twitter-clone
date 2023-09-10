import Image from "next/image";
import React from "react";
import {
  MdOutlineComment,
  MdOutlineFavoriteBorder,
  MdOutlineLeaderboard,
  MdOutlinePlayForWork,
  MdOutlineSync,
  MdOutlineVerified,
} from "react-icons/md";

const Post = () => {
  const name = "Abdou Jammeh";
  const userName = "Abdou423434";
  return (
    <div className="post w-full px-4  sm:px-5 mb-4 border-b border-r border-dark pb-3">
      <div className="flex gap-[6px] sm:gap-2">
        <div className="w-12 sm:w-14">
          <Image
            src={"/abdou.jpg"}
            alt="author-profile"
            width={70}
            height={70}
            className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
          />
        </div>
        <div>
          <div className="author flex items-center">
            <span className=" text-[15px] sm:text-base font-semibold">
              {name.length > 9 ? `${name.substring(0, 9)}...` : name}
            </span>{" "}
            <span className="mx-1">
              <MdOutlineVerified className="text-primary" />
            </span>
            <span className="text-sm sm:text-[15px] text-gray-500">
              {userName.length > 9
                ? `${userName.substring(0, 9)}...`
                : userName}
            </span>
            <span className=" text-[15px] sm:text-base font-normal sm:font-medium text-gray-500 ml-1">
              -12h
            </span>
          </div>
          <div className="descriptions text-[12.5px] sm:text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea eum aut
          </div>
          <div className="mt-4 w-full flex-1">
            <Image
              alt="post"
              src={"/car.jpeg"}
              width={400}
              height={300}
              className="w-full max-h-[270px] md:max-h-[410px] object-cover rounded-xl sm:rounded-2xl"
            />
          </div>
          <div className="post-reactions mt-3 py-1 flex items-center  justify-between">
            <div className="flex gap-2  items-center cursor-pointer ">
              <MdOutlineComment size={20} className="text-gray-600" />{" "}
              <span className="text-xs text-gray-600"> 2</span>
            </div>
            <div className="flex gap-2 items-center cursor-pointer  ">
              <MdOutlineSync size={20} className="text-gray-600" />{" "}
              <span className="text-xs text-gray-600"> 2</span>
            </div>
            <div className="flex gap-2 items-center cursor-pointer  ">
              <MdOutlineFavoriteBorder size={20} className="text-gray-600" />{" "}
              <span className="text-xs text-gray-600"> 2</span>
            </div>
            <div className="flex gap-2 items-center cursor-pointer  ">
              <MdOutlineLeaderboard size={20} className="text-gray-600" />
              <span className="text-xs text-gray-600"> 2</span>
            </div>
            <div className="flex gap-2 items-center cursor-pointer  ">
              <MdOutlinePlayForWork size={20} className="text-gray-600" />
              <span className="text-xs text-gray-600"> 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
