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

type CommentType = {
  user?: any;
  text?: string;
};

const Comments = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="flex gap-1 sm:gap-2 w-full px-3  sm:px-5 mb-4 border-b  border-dark pb-3">
      <div className="w-10 sm:w-14 md:w-10">
        <Image
          src={"/abdou.jpg"}
          alt="author-profile"
          width={70}
          height={70}
          className="sm:w-8 sm:h-8 h-7 w-7 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="author flex items-center">
          <span className=" text-[15px] sm:text-base font-medium sm:font-semibold">
            {comment?.user?.name?.length > 12
              ? `${comment?.user?.name.substring(0, 12)}...`
              : comment?.user?.name}
          </span>{" "}
          <span className="mx-1">
            <MdOutlineVerified className="text-primary" />
          </span>
          <span className="text-sm sm:text-[15px] text-gray-500">
            {comment?.user?.username?.length > 12
              ? `${comment?.user?.username?.substring(0, 12)}...`
              : comment?.user?.username}
          </span>
          <span className=" text-[15px] sm:text-base font-normal sm:font-medium text-gray-500 ml-1">
            -12h
          </span>
        </div>
        <div className="mt-4 w-full flex-1">{comment?.text}</div>
        <div className="post-reactions mt-3 py-1 flex items-center  justify-between">
          <div className="flex gap-2  items-center cursor-pointer ">
            <MdOutlineComment size={20} className="text-gray-600" />{" "}
            <span className="text-xs text-gray-600">2</span>
          </div>
          <div className="flex gap-2 items-center cursor-pointer  ">
            <MdOutlineSync size={20} className="text-gray-600" />{" "}
            <span className="text-xs text-gray-600"> 2</span>
          </div>
          <div className="flex gap-2 items-center cursor-pointer  ">
            <MdOutlineFavoriteBorder size={20} className="text-gray-600 " />

            <span className="text-xs text-gray-600">2</span>
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
  );
};

export default Comments;
