"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineComment,
  MdOutlineFavoriteBorder,
  MdFavorite,
  MdOutlineLeaderboard,
  MdOutlinePlayForWork,
  MdOutlineSync,
  MdOutlineVerified,
} from "react-icons/md";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { PostsContext } from "../context/PostsContext";
import { ModalContext } from "../context/ModalContext";

type PostType = {
  _id: string;
  author: {} | any;
  text?: string;
  image?: string;
  description?: string;
  likes: Array<any>;
  comments: Array<any>;
};

const Post = ({ post }: { post: PostType }) => {
  const {
    state: { user },
  } = useContext(UserContext);

  const modal = useContext(ModalContext);

  const postState = useContext(PostsContext);
  const [like, setLike] = useState(false);
  const numsOfComment = post.comments.length;
  const [numsOfLikes, setNumOfLike] = useState(0);

  const auth: any = user;

  useEffect(() => {
    if (post.likes.length <= 0) {
      setLike(false);
      return setNumOfLike(post.likes.length);
    }

    const index = post?.likes.findIndex((like) => like?.user?.id === auth?._id);
    console.log(index);
    if (index > -1 || like) {
      console.log(post.likes);
      setLike(true);
      return setNumOfLike(post.likes.length);
    }
  }, [post]);

  const submit = async (postId: string, likeType: string) => {
    try {
      if (likeType === "like") {
        setNumOfLike((prev) => prev + 1);
        setLike(true);
      }
      if (likeType !== "like") {
        setNumOfLike((prev) => prev - 1);
        setLike(false);
      }
      const { data } = await axios.patch("/api/posts/like", { postId, auth });
      if (data.success) {
        return postState.dispatch({
          type: "GET_ALL_POSTS",
          payload: data.message,
        });
      }
    } catch (error) {}
  };

  return (
    <div className="post w-full px-4  sm:px-5 mb-4 border-b  border-dark pb-3">
      <div className="flex gap-[6px] sm:gap-2">
        <div className="w-10 sm:w-14 md:w-10">
          <Image
            src={"/abdou.jpg"}
            alt="author-profile"
            width={70}
            height={70}
            className="w-8 h-8  rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="author flex items-center">
            <span className=" text-[15px] sm:text-base font-semibold">
              {post?.author?.name.length > 15
                ? `${post?.author?.name.substring(0, 15)}...`
                : post?.author?.name}
            </span>{" "}
            <span className="mx-1">
              <MdOutlineVerified className="text-primary" />
            </span>
            <span className="text-sm sm:text-[15px] text-gray-500">
              {post?.author?.username.length > 15
                ? `${post?.author?.username.substring(0, 15)}...`
                : post?.author?.username}
            </span>
            <span className=" text-[15px] sm:text-base font-normal sm:font-medium text-gray-500 ml-1">
              -12h
            </span>
          </div>
          <div className="descriptions text-[12.5px] sm:text-sm">
            {post?.description}
          </div>
          <div className="mt-4 w-full flex-1">
            {post.image ? (
              <Image
                alt="post"
                src={"/car.jpeg"}
                width={400}
                height={300}
                className="w-full max-h-[270px] md:max-h-[410px] object-cover rounded-xl sm:rounded-2xl"
              />
            ) : (
              <div>{post.text}</div>
            )}
          </div>
          <div className="post-reactions mt-3 py-1 flex items-center  justify-between">
            <div className="flex gap-2  items-center cursor-pointer ">
              <MdOutlineComment
                size={20}
                className="text-gray-600"
                onClick={() =>
                  modal.dispatch({ type: "OPEN_MODAL", payload: post })
                }
              />{" "}
              <span className="text-xs text-gray-600">
                {numsOfComment > 0 ? numsOfComment : ""}
              </span>
            </div>
            <div className="flex gap-2 items-center cursor-pointer  ">
              <MdOutlineSync size={20} className="text-gray-600" />{" "}
              <span className="text-xs text-gray-600"> 2</span>
            </div>
            <div className="flex gap-2 items-center cursor-pointer  ">
              {like ? (
                <MdFavorite
                  size={20}
                  className="text-pink-700"
                  onClick={() => submit(post?._id, "unlike")}
                />
              ) : (
                <MdOutlineFavoriteBorder
                  size={20}
                  className="text-gray-600 "
                  onClick={() => submit(post?._id, "like")}
                />
              )}

              <span className="text-xs text-gray-600">
                {" "}
                {numsOfLikes > 0 ? numsOfLikes : ""}
              </span>
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
