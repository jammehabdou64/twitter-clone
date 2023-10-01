"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [buttonDisable, setButtonDisalbe] = React.useState(false);

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0) {
      setButtonDisalbe(false);
    }
  }, [formData]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setButtonDisalbe(true);
      event.preventDefault();
      const { data } = await axios.post("/api/auth/login", formData);
      if (data.success) {
        return router.push("/");
      }
    } catch (error: any) {
      toast.error("Invalid credentials");
    } finally {
      setButtonDisalbe(false);
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className=" bg-primary-lighter w-full items-center h-screen flex justify-center">
      <div className="login-container text-white bg-black  w-[600px] rounded-xl">
        <div className="login-header items-center p-2 flex">
          <span className="py-1 px-1 hover:bg-dark cursor-pointer rounded-full">
            <MdClose size={23} />
          </span>{" "}
          <div className="flex-1 justify-center flex">
            <Image
              className="logo.png"
              src={"/logo.png"}
              alt="logo"
              width={50}
              height={50}
            />
          </div>
        </div>
        <form action="" className="w-[330px] py-4  mx-auto" onSubmit={submit}>
          <Toaster />
          <h1 className="font-black text-3xl">
            Sign in to <span>X</span>
          </h1>

          <div className="google_auth mt-2 pt-1">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border p-2 bg-white  border-gray-500 rounded-full"
            >
              <Image
                src={"/google.svg"}
                alt="google"
                width={50}
                height={50}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-800">
                Sign in with Google{" "}
              </span>
            </button>
          </div>
          <div className="apple_auth mt-4  pt-1">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border p-2  border-gray-500 bg-white rounded-full"
            >
              <Image
                src={"/apple.svg"}
                alt="google"
                width={50}
                height={50}
                className="w-4 h-4"
              />
              <span className=" font-bold text-gray-800">
                Sign in with Apple{" "}
              </span>
            </button>
          </div>

          <div className="py-2 text-center mt-4">
            <hr className="border-gray-500" />
            <div className="-mt-3 flex justify-center ">
              <p className="text-center w-9 text-s bg-black font-medium">or</p>
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Email "
              className="bg-inherit border border-gray-500 px-3 py-4 outline-none w-full rounded-xl"
              onChange={inputChangeHandler}
              name="email"
            />
            <input
              type="password"
              placeholder="Password "
              className="bg-inherit mt-3 border border-gray-500 px-3 py-4 outline-none w-full rounded-xl"
              onChange={inputChangeHandler}
              name="password"
            />
          </div>
          <div className="mt-5">
            <button
              disabled={buttonDisable}
              className="bg-white text-gray-900 font-bold py-2 px-4 rounded-full w-full "
            >
              Sign in
            </button>
          </div>
          <div className="mt-5">
            <button className=" border border-gray-500 font-bold py-2 px-4 rounded-full w-full ">
              Forgot password?
            </button>
          </div>
          <div className="text-gray-600 mt-7 pb-8">
            <p>
              Don't have an account?
              <Link href={"/register"} className="text-primary mx-1 ">
                sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
