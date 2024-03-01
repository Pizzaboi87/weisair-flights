"use client";

import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
}

const defaultForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState<FormValues>(defaultForm);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: string[] = [];

    const textRegex = /^[a-zA-Z0-9 ,.;:?!'\-+()/@&$€"_]+$/;
    const messageRegex = /^[a-zA-Z0-9 ,.;:?!'\-+()/@&$€"_]+$/m;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9 +]+$/;

    if (!form.message.trim().length || !messageRegex.test(form.message)) {
      errors.push("Please write a message with latin characters only");
    }
    if (!textRegex.test(form.firstName) || !textRegex.test(form.lastName)) {
      errors.push("Please use latin characters only");
    }
    if (!phoneRegex.test(form.phone)) {
      errors.push("Please write a valid phone number");
    }
    if (!emailRegex.test(form.email)) {
      errors.push("Please write a valid email address");
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE as string,
        event.currentTarget,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
        }
      );
      toast.success("Message was sent");
    } catch (error) {
      toast.error("Message was not sent, try again later");
      console.log("Email error: ", error);
    } finally {
      setIsLoading(false);
      setForm(defaultForm);
    }
  };

  return (
    <div className="contact row-span-2 md:col-span-2">
      <div className="wrapper py-4 px-6">
        <h1 className="font-subheading mb-4">Write Us A Message!</h1>
        <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
          <span className="flex flex-col md:flex-row gap-8 w-full">
            <div
              className={`${
                form.firstName ? "filled" : ""
              } container-style w-full`}
            >
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                required
                autoComplete="off"
                onChange={handleChange}
                className="lightinput dark:darkinput input-style"
              />
              <label className="label-style">Your forename</label>
            </div>
            <div
              className={`${
                form.lastName ? "filled" : ""
              } container-style w-full`}
            >
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                required
                autoComplete="off"
                onChange={handleChange}
                className="lightinput dark:darkinput input-style"
              />
              <label className="label-style">Your surname</label>
            </div>
          </span>

          <span className="flex flex-col md:flex-row gap-8">
            <div
              className={`${form.phone ? "filled" : ""} container-style w-full`}
            >
              <input
                type="phone"
                name="phone"
                value={form.phone}
                required
                autoComplete="off"
                onChange={handleChange}
                className="lightinput dark:darkinput input-style"
              />
              <label className="label-style">Your phone number</label>
            </div>
            <div
              className={`${form.email ? "filled" : ""} container-style w-full`}
            >
              <input
                type="email"
                name="email"
                value={form.email}
                required
                autoComplete="off"
                onChange={handleChange}
                className="lightinput dark:darkinput input-style"
              />
              <label className="label-style">Your email address</label>
            </div>
          </span>

          <div className={`${form.message ? "filled" : ""} container-style`}>
            <textarea
              name="message"
              value={form.message}
              required
              autoComplete="off"
              onChange={handleChange}
              className="lightinput dark:darkinput textarea-style"
            />
            <label className="label-style">Your message</label>
          </div>
          <button className="btn-quaternary w-full md:w-[20rem] flex justify-center">
            {isLoading ? (
              <LoadingSpinner otherClass="w-[1.88rem] h-[1.88rem]" />
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
