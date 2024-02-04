"use client";

import ThemeContext from "@/context/themeContext";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const defaultForm = {
  name: "",
  email: "",
  password: "",
};

const Auth = () => {
  const { darkTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState(defaultForm);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setFormData(defaultForm);
    }
  };

  const { name, email, password } = formData;

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
              type="text"
              name="name"
              value={name}
              required
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
              min={6}
              onChange={handleInputChange}
              className={inputStyle}
            />
            <label className={labelStyle}>Your password</label>
          </div>
          <button className="w-full dark:bg-gradientlight bg-gradientdark text-textlight dark:text-textdark focus:outline-none font-medium rounded-lg text-xl px-5 py-2.5 text-center shadow-xl">
            Sign Up
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
