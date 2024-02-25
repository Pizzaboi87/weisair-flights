"use client";

import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

const defaultSubscriber = {
  email: "",
  userName: "",
};

const NewsLetter = () => {
  const [subscriber, setSubscriber] = useState(defaultSubscriber);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSubscriber((prevSubscriber) => ({ ...prevSubscriber, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (subscriber.email && subscriber.userName) {
      try {
        const { data } = await axios.post("/api/newsletter", {
          newAddress: subscriber.email,
          userName: subscriber.userName,
        });
        if (data) toast.success("Subscribed to newsletter!");
      } catch (error) {
        console.log("Error while adding email address", error);
      } finally {
        setSubscriber(defaultSubscriber);
      }
    }
  };

  return (
    <section className="container mx-auto px-4 md:mt-16">
      <form className="bg-gradientlight dark:bg-gradientdark text-textdark dark:text-textlight px-4 rounded-xl md:rounded-xl flex flex-col justify-center items-center py-6 md:py-24">
        <p className="md:font-semibold text-lg md:text-xl text-center mb-3">
          Be the first to learn about our monthly offers!
        </p>
        <p className="md:font-semibold font-medium text-2xl md:text-3xl lg:text-5xl text-center">
          Sign Up for Our Newsletter
        </p>

        <div className="flex-col justify-center w-full md:flex-row flex pt-12">
          <input
            type="text"
            name="userName"
            value={subscriber.userName}
            onChange={handleChange}
            placeholder="Your name"
            className="bg-white text-textdark md:h-[4rem] h-[3.5rem] mb-2 md:mb-0 rounded-xl pl-6 md:mr-5 md:w-[30rem] placeholder:text-textdark focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={subscriber.email}
            onChange={handleChange}
            placeholder="Your email address"
            className="bg-white text-textdark md:h-[4rem] h-[3.5rem] mb-2 md:mb-0 rounded-xl pl-6 md:mr-5 md:w-[30rem] placeholder:text-textdark focus:outline-none"
          />
          <button className="btn-tertiary" onClick={handleSubmit}>
            Subscribe
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewsLetter;
