"use client";

import ThemeContext from "@/context/themeContext";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";

const defaultForm = {
  name: "",
  email: "",
  password: "",
};

const Auth = () => {
  const { darkTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState(defaultForm);
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password } = formData;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("Success, please sign-in!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
      setIsLoading(false);
    } finally {
      setFormData(defaultForm);
      setIsLoading(false);
    }
  };

  const inputStyle = `${
    darkTheme ? "darkinput" : "lightinput"
  } h-16 rounded-md border-none p-4 pb-0 text-base leading-2 outline-none shadow-none transition-all duration-200 ease-in-out shadow-lg`;
  const containerStyle = "input-container flex flex-col relative";
  const labelStyle =
    "absolute pointer-events-none transform translate-y-6 scale-120 transform-origin-top-left transition-transform duration-200 ease-in-out text-blue-500 text-sm leading-4 left-4";

  return (
    <section className="container mx-auto relative z-[2]">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[85%] md:w-[70%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-textlight">
            Create an account
          </h1>
          <p className="dark:text-textlight">OR</p>
          <span className="inline-flex items-center dark:text-textlight">
            <AiFillGithub className="mr-3 text-4xl cursor-pointer" />
            |
            <FcGoogle className="ml-3 text-4xl cursor-pointer" />
          </span>
        </div>

        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div className={`${containerStyle} ${name ? "filled" : ""}`}>
            <input
              //avoid autocomplete
              type="search"
              name="name"
              value={name}
              required
              autoComplete="off"
              onChange={handleInputChange}
              className={inputStyle}
            />
            <label className={labelStyle}>Your name</label>
          </div>
          <div className={`${containerStyle} ${email ? "filled" : ""}`}>
            <input
              type="email"
              name="email"
              value={email}
              required
              autoComplete="off"
              onChange={handleInputChange}
              className={inputStyle}
            />
            <label className={labelStyle}>Your email</label>
          </div>
          <div className={`${containerStyle} ${password ? "filled" : ""}`}>
            <input
              type="password"
              name="password"
              value={password}
              required
              //avoid autocomplete
              autoComplete="new-password"
              min={6}
              onChange={handleInputChange}
              className={inputStyle}
            />
            <label className={labelStyle}>Your password</label>
          </div>
          <button className="w-full min-h-[3rem] dark:bg-gradientlight bg-gradientdark text-textlight dark:text-textdark focus:outline-none font-medium rounded-lg px-5 text-center shadow-xl">
            {isLoading ? (
              <Icon
                icon="eos-icons:bubble-loading"
                className="text-[2rem] mx-auto"
              />
            ) : (
              <p className="text-[1.5rem]">Sign-up</p>
            )}
          </button>
          <button className="underline mx-auto block text-md dark:text-textlight">
            login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
