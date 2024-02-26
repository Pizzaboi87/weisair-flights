"use client";

import { ChangeEvent, useState } from "react";

const defaultForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {};

  return (
    <div className="contact row-span-2 md:col-span-2">
      <div className="wrapper py-4 px-6">
        <h1 className="font-subheading mb-4">Write Us A Message!</h1>
        <form className="flex flex-col gap-8 w-full">
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
              autoComplete="off"
              onChange={handleChange}
              className="lightinput dark:darkinput textarea-style"
            />
            <label className="label-style">Your message</label>
          </div>
          <button className="btn-quaternary self-start">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
