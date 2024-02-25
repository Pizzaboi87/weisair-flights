"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

const defaultSubscriber = {
  email: "",
  userName: "",
};

const NewsLetter = () => {
  const [subscriber, setSubscriber] = useState(defaultSubscriber);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSubscriber((prevSubscriber) => ({ ...prevSubscriber, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userNameRegex = /^[a-zA-Z-' ]*$/;

    if (
      !subscriber.email.match(emailRegex) ||
      !subscriber.userName.match(userNameRegex)
    ) {
      toast.error("Incorrect name or email address");
    } else {
      setIsLoading(true);
      try {
        const { data } = await axios.post("/api/newsletter", {
          newAddress: subscriber.email,
          userName: subscriber.userName,
        });
        if (data) {
          if (data.results[0].operation == "create")
            toast.success("Subscribed to newsletter!");
          else toast.error("You have already subscribed with this email!");
        }
      } catch (error) {
        console.log("Error while adding email address", error);
        toast.error("Subscription was not successful.");
      } finally {
        setIsLoading(false);
        setSubscriber(defaultSubscriber);
      }
    }
  };

  return (
    <section className="container mx-auto px-4 md:mt-16">
      <form className="bg-gradientlight dark:bg-gradientdark text-textdark dark:text-textlight px-4 rounded-xl md:rounded-xl flex flex-col justify-center items-center py-6 md:py-16">
        <p className="md:font-semibold text-lg md:text-xl text-center mb-3">
          Be the first to learn about our monthly offers!
        </p>
        <p className="md:font-semibold font-medium text-2xl md:text-3xl lg:text-5xl text-center">
          Sign Up for Our Newsletter
        </p>

        <div className="flex-col xl:flex-row justify-center items-center w-full flex pt-12 gap-4">
          <div
            className={`${
              subscriber.userName ? "filled" : ""
            } container-style w-full md:w-[75%]`}
          >
            <input
              type="text"
              name="userName"
              value={subscriber.userName}
              onChange={handleChange}
              className="lightinput dark:darkinput outline-none w-full pt-5 pb-3 px-2 text-textdark rounded-xl pl-6"
            />
            <label className="label-style">Your name</label>
          </div>

          <div
            className={`${
              subscriber.email ? "filled" : ""
            } container-style w-full md:w-[75%]`}
          >
            <input
              type="email"
              name="email"
              value={subscriber.email}
              onChange={handleChange}
              className="lightinput dark:darkinput outline-none w-full pt-5 pb-3 px-2 text-textdark rounded-xl pl-6"
            />
            <label className="label-style">Your email</label>
          </div>

          <button
            className="btn-tertiary w-full md:w-[20rem] flex justify-center"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <LoadingSpinner otherClass="w-[1.5rem] h-[1.5rem] md:w-[1.75rem] md:h-[1.75rem]" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewsLetter;
