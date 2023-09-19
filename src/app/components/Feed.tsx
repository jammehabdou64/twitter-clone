"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineEmojiEmotions,
  MdOutlineGifBox,
  MdOutlineImage,
  MdOutlineSchedule,
  MdOutlineLocationOn,
  MdSyncAlt,
} from "react-icons/md";
import Post from "./Post";
import axios from "axios";
import { PostsContext } from "../context/PostsContext";

const Feed = () => {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [formData, setFormData] = useState({
    text: "",
  });

  const {
    state: { posts, loading },
    dispatch,
  } = useContext(PostsContext);

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get("/api/posts");
      if (data.success) {
        dispatch({ type: "GET_ALL_POSTS", payload: data?.message });
      }
    };

    getPosts();
  }, []);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setButtonDisable(false);
    return setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submit = async () => {
    try {
      const { data } = await axios.post("/api/posts", formData);
      if (data.success) {
        setFormData({ ...formData, text: "" });
        return dispatch({ type: "SAVE_POST", payload: data.message });
      }
    } catch (error: any) {
      console.log(error?.response);
    }
  };

  return (
    <div className="w-full sm:px-0  overflow-hidden  lg:w-[61%] md:w-[80%] border-r border-l  relative h-fit border-dark sm:w-[97%] lg:max-w-[600px]  ">
      <h1 className=" hidden sm:block font-semibold text-xl px-4  pt-4 ml-1  border-dark">
        Home
      </h1>
      <div className="flex  justify-around mt-14 sm:mt-6 border-b   border-dark  sm:px-5 py-2">
        <div className="selected-feed relative top-0 left-0 hover:bg-dark">
          <h6 className="font-medium selected-feed-header">For you</h6>
        </div>
        <div className="following">
          <h6 className="following-header font-semibold text-gray-500">
            Following
          </h6>
        </div>
      </div>

      <div className="post-feed-container   border-dark   border-b ">
        <div className="  px-4 py-2">
          <div className="post-feed p-2 flex gap-2">
            <Image
              alt="profile"
              src={"/abdou.jpg"}
              width={60}
              height={60}
              className="sm:w-10 sm:h-10 w-7 object-center h-7 rounded-full"
            />
            <input
              placeholder="What is happening?!"
              className={`${
                buttonDisable ? "text-gray-500" : "text-white"
              } " bg-inherit text-lg sm:text-xl outline-none flex-1 py-2  "`}
              name="text"
              value={formData.text}
              onChange={inputChangeHandler}
            />
          </div>
          <div className="post-feed-text mb-4  border-gray-600 text-primary sm:pl-4 mx-7  text-sm font-bold">
            {/* <div className="py-3 flex items-center cursor-pointer gap-1">
              <FaGlobe />{" "}
              <span className="hover:w-[139px] hover:rounded-full px-1 hover:bg-primary-light">
                Everyone can reply
              </span>
            </div> */}
          </div>
          <div className="post-icons flex items-center justify-between sm:mx-3 py-[12px] pl-6 sm:pl-7">
            <div className="flex gap-2 ">
              <MdOutlineImage
                size={22}
                className="text-primary cursor-pointer opacity-50"
              />{" "}
              <MdOutlineGifBox
                size={22}
                className="text-primary cursor-pointer opacity-50"
              />
              <MdSyncAlt
                size={22}
                className="text-primary cursor-pointer opacity-50"
              />
              <MdOutlineEmojiEmotions
                size={22}
                className="text-primary cursor-pointer opacity-50"
              />
              <MdOutlineSchedule
                size={22}
                className="text-primary cursor-pointer opacity-50"
              />{" "}
              <MdOutlineLocationOn
                size={22}
                className="text-primary cursor-pointer opacity-50"
              />
            </div>
            <div className="">
              <button
                onClick={submit}
                disabled={buttonDisable}
                className={`${
                  buttonDisable ? "opacity-30" : ""
                }  " px-2 sm:px-4 py-1 rounded-full bg-primary focus:outline-none"`}
              >
                post
              </button>
            </div>
          </div>
        </div>
      </div>
      <h4 className="text-primary py-3 cursor-pointer  hover:bg-gray-950 border-b  border-dark text-center">
        Show 100 Tweets
      </h4>

      <div className="sm:hidden py-6  px-[30px] border-b   border-dark">
        <h1 className="balance font-black text-[26px] leading-tight">
          You may be missing out on ads revenue sharing!
        </h1>

        <p className="text-gray-500 mt-2">
          if eligable, you must subscribe to X Premium to receive a share of ads
          revenue
        </p>

        <p className="mt-5 text-gray-500">Sing up to X Premium to get access</p>
        <div className="button mt-4">
          <button className="bg-white px-6 py-3 text-black font-semibold rounded-full">
            Subscribe Today
          </button>
        </div>
      </div>

      <div className="post-container w-full sm:px-0   sm:max-w-full  mt-4  border-dark">
        {loading ? (
          <div className="animate-ping text-xl w-full flex mt-10 justify-center">
            loading
          </div>
        ) : (
          posts.map((post, index) => <Post post={post} key={index} />)
        )}
      </div>

      <div className="h-10"></div>
    </div>
  );
};

export default Feed;
