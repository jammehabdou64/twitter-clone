"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisalbe] = React.useState(true);

  useEffect(() => {
    if (
      formData.name.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length > 0
    ) {
      setButtonDisalbe(false);
    }
  }, [formData]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setButtonDisalbe(true);
      const { data } = await axios.post("/api/auth/register", formData);
      if (data.success) {
        return router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setButtonDisalbe(false);
    }
  };

  const InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
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
        <form action="" className="w-[400px] py-4  mx-auto" onSubmit={submit}>
          <div>
            <Toaster />
          </div>
          <h1 className="font-black text-3xl mb-2">Create your account</h1>

          <div>
            <input
              type="text"
              placeholder="Name "
              className="bg-inherit mt-4 border border-gray-500 px-3 py-4 outline-none w-full rounded-xl"
              name="name"
              onChange={InputChangeHandler}
            />
            <input
              type="email"
              placeholder="Email "
              className="bg-inherit border mt-3 border-gray-500 px-3 py-4 outline-none w-full rounded-xl"
              name="email"
              onChange={InputChangeHandler}
            />
            <input
              type="password"
              placeholder="Password "
              className="bg-inherit mt-3 border border-gray-500 px-3 py-4 outline-none w-full rounded-xl"
              name="password"
              onChange={InputChangeHandler}
            />
          </div>
          <div className="mt-5">
            <button
              disabled={buttonDisabled}
              className="bg-white text-gray-900 font-bold py-3 px-4 rounded-full w-full "
            >
              Sign in
            </button>
          </div>

          <div className="text-gray-600 mt-7 pb-8">
            <p>
              Already have an account{" "}
              <Link href={"/login"} className="text-primary ">
                login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
