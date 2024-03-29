"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import LoadingSpinner from "@/components/loading-spinner/LoadingSpinner";
import toast from "react-hot-toast";
import Head from "next/head";
import { AiFillGithub } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdAlternateEmail } from "react-icons/md";

interface Form {
  name: string;
  email: string;
  password: string;
}

const defaultForm = {
  name: "",
  email: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState<Form>(defaultForm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { name, email, password } = formData;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const textRegex = /^[a-zA-Z0-9 ,.;:?!'\-+()/@&$€"_]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%_&*-]).{8,}$/;

    if (!textRegex.test(name)) {
      toast.error("Please use latin characters only in your name");
      setIsLoading(false);
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Please write a valid email address");
      setIsLoading(false);
      return;
    } else if (!passwordRegex.test(password)) {
      toast.error(
        "Password is minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      setIsLoading(false);
      return;
    } else {
      try {
        const user = await signUp({
          ...formData,
          avatar: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: "image-d26040832b67ae4abd37719a322f67339e0cb430-512x512-webp",
            },
          },
          about: "I believe I can fly...",
        });
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
    }
  };

  return (
    <section className="container mx-auto relative z-[2] 2xl:mt-[8rem]">
      <Head>
        <link rel="icon" href="/faviconwa.ico" />
      </Head>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[90%] md:w-[50%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-between">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-textlight">
            Create an account
          </h1>
          <p className="dark:text-textlight">OR</p>
          <span className="inline-flex items-center dark:text-textlight">
            <AiFillGithub onClick={loginHandler} className="mr-3 login-icon" />
            |
            <BsDiscord
              onClick={loginHandler}
              className="ml-3 mr-3 login-icon"
            />
            |
            <MdAlternateEmail
              onClick={loginHandler}
              className="ml-3 login-icon"
            />
          </span>
        </div>

        <form className="space-y-4 md:space-y-7" onSubmit={handleSubmit}>
          <div className={`${name ? "filled" : ""} container-style`}>
            <input
              //avoid autocomplete
              type="search"
              name="name"
              value={name}
              required
              autoComplete="off"
              onChange={handleInputChange}
              className="lightinput dark:darkinput input-style"
            />
            <label className="label-style">Your name</label>
          </div>
          <div className={`${email ? "filled" : ""} container-style`}>
            <input
              type="email"
              name="email"
              value={email}
              required
              autoComplete="off"
              onChange={handleInputChange}
              className="lightinput dark:darkinput input-style"
            />
            <label className="label-style">Your email</label>
          </div>
          <div className={`${password ? "filled" : ""} container-style`}>
            <input
              type="password"
              name="password"
              value={password}
              required
              //avoid autocomplete
              autoComplete="new-password"
              min={6}
              onChange={handleInputChange}
              className="lightinput dark:darkinput input-style"
            />
            <label className="label-style">Your password</label>
          </div>
          <button className="w-full min-h-[3rem] dark:border-textlight dark:border dark:bg-gradientdark bg-gradientlight dark:text-textlight text-textdark hover:shadow-xl shadow-black hover:-translate-y-2 transition-all duration-700 focus:outline-none font-medium rounded-lg px-5 text-center">
            {isLoading ? (
              <LoadingSpinner otherClass="h-10 w-10 mx-auto" />
            ) : (
              <p className="text-[1.5rem]">Sign-up</p>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
