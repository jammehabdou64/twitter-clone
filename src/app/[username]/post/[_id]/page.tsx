"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ModalContext } from "@/app/context/ModalContext";
import Topnav from "@/app/components/Topnav";
import CommentModal from "@/app/components/CommentModal";
import Sidebar from "@/app/components/Sidebar";
import Widget from "@/app/components/Widget";
import FooterNav from "@/app/components/FooterNav";
import Post from "@/app/components/Post";
import Image from "next/image";
import { PostsContext } from "@/app/context/PostsContext";

type PostType = {
  _id: string;
  author: {} | any;
  text?: string;
  image?: string;
  description?: string;
  likes: Array<any>;
  comments: Array<any>;
};

export default function ShowPost({ params }: any) {
  const {
    state: { showModal },
  } = useContext(ModalContext);

  const [buttonDisable, setButtonDisable] = useState(true);
  const [formData, setFormData] = useState({
    comment: "",
  });

  const [post, setPost] = useState({} as PostType);

  const [loading, setLoading] = useState(true);

  const { dispatch } = useContext(PostsContext);

  useEffect(() => {
    const getPost = async (id: any) => {
      try {
        const { data } = await axios.put(`/api/posts`, { id });
        if (data.success) {
          setPost(data.message);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getPost(params?._id);
  }, [params]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setButtonDisable(false);
    return setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submit = async (postId: string) => {
    try {
      const { data } = await axios.post("/api/posts/comments", {
        comment: formData.comment,
        postId,
      });
      if (data.success) {
        setFormData({ ...formData, comment: "" });
        return dispatch({ type: "GET_ALL_POST", payload: data.message });
      }
    } catch (error: any) {
      console.log(error?.response);
    }
  };

  return (
    <>
      <main
        className={` ${
          showModal ? "overflow-hidden" : ""
        }  text-white  h-screen max-w-[90rem] lg:mx-auto flex font-blink relative top-0 "`}
      >
        {/* Mobile navigation */}
        <Topnav />
        {/* Comment modal */}

        <CommentModal />
        {/*  */}
        <Sidebar />
        <div className="flex flex-1  sm:px-0 w-full sm:w-[88%] md:w-[80%] mt-8 pt-10 sm:pt-4 sM:mt-5 relative top-0 h-full">
          <div className="w-full sm:px-0  overflow-hidden  lg:w-[61%] md:w-[80%] border-r border-l  relative h-screen border-dark sm:w-[97%] lg:max-w-[600px]  ">
            {loading ? (
              <div className="animate-ping text-xl w-full pt-4 flex mt-10 justify-center">
                loading
              </div>
            ) : (
              <Post post={post} />
            )}
            <div
              className={`${
                loading
                  ? "hidden"
                  : "flex items-center border-b px-4 py-2 border-dark"
              }`}
            >
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
                  className="bg-inherit outline-none py-3 text-gray-600 px-2"
                  name="comment"
                  value={formData.comment}
                  onChange={inputChangeHandler}
                />
              </div>
              <div>
                <button
                  onClick={() => submit(post?._id)}
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
          {/*  */}
          <Widget />
        </div>
      </main>
      <FooterNav />
    </>
  );
}
