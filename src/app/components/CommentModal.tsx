import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import {
  MdClose,
  MdOutlineEmojiEmotions,
  MdOutlineGifBox,
  MdOutlineImage,
  MdOutlineLocationOn,
  MdOutlineSchedule,
  MdOutlineVerified,
  MdSyncAlt,
} from "react-icons/md";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const CommentModal = () => {
  const {
    state: { post, showModal },
    dispatch,
  } = useContext(ModalContext);

  const {
    state: { user },
  } = useContext(UserContext);

  const author: any = user;

  const [buttonDisable, setButtonDisable] = useState(true);
  const [formData, setFormData] = useState({
    comment: "",
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setButtonDisable(false);
    return setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submit = async () => {
    try {
      const { data } = await axios.post("/api/posts/commmets", formData);
      if (data.success) {
        setFormData({ ...formData, comment: "" });
        // return dispatch({ type: "SAVE_POST", payload: data.message });
        return;
      }
    } catch (error: any) {
      console.log(error?.response);
    }
  };

  return (
    <div
      className={`${
        showModal
          ? "block absolute  top-0 w-full bg-primary-light p-2 z-40 h-screen"
          : "hidden"
      }`}
    >
      <div className="bg-black rounded-xl px-5 mt-2 w-fit max-w-[600px] h-fit mx-auto">
        <div className=" w-full flex mt-2 mb-6 py-2 items-center justify-between ">
          <MdClose
            className="cursor-pointer"
            size={22}
            onClick={() => dispatch({ type: "CLOSE_MODAL", payload: {} })}
          />{" "}
          <Link href={"/"} className="text-primary">
            Draft
          </Link>
        </div>
        {Object.keys(post).length > 0 ? (
          <div className="post-card">
            <div className="flex gap-[6px] sm:gap-2 ">
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

                  <p className="text-gray-700 mt-4">
                    Replying to{" "}
                    <span className="text-primary">
                      @{post.author?.username}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="flex items-center mt-4 pb-5">
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
            <input
              type="text"
              placeholder="Post your reply"
              className="bg-inherit outline-none py-5 text-gray-600 px-2"
              name="comment"
              value={formData.comment}
              onChange={inputChangeHandler}
            />
          </div>
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
              reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
