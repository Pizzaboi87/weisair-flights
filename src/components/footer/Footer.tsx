"use client";

import Contacts from "../contacts/Contacts";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="dark:bg-filldark dark:text-textdark dark:bg-gradientdark bg-gradientlight relative 2xl:pt-6">
      <div className="custom-shape-divider-top-1706911286 hidden md:block">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-[20vh]"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="dark:fill-bgdark fill-bglight"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto md:px-4 px-12 md:pt-24 pt-8 text-textdark dark:text-textlight">
        <Link href="/" className="font-black text-[1.5rem]">
          2024 - WeisAIR®
        </Link>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between text-[1.2rem] mt-8 gap-8 md:gap-0">
          <Contacts isContactPage={false} />

          <div className="flex flex-col md:flex-1 md:flex-row w-full md:justify-between md:-ml-24">
            <div className="text-left">
              <p className="pt-2">Our Story</p>
              <p className="pt-2">Career</p>
              <p className="pt-2">Privacy Policy</p>
              <p className="pt-2">Terms and Conditions</p>
              <p className="pt-2">About</p>
            </div>

            <div className="text-left">
              <p className="pt-2">Our Fleet</p>
              <p className="pt-2">Gallery</p>
              <p className="pt-2">FAQ</p>
              <p className="pt-2">Other Services</p>
              <p className="pt-2">Flight Experiences</p>
            </div>
          </div>
        </div>
      </div>
      <Link
        href="https://github.com/pizzaboi87"
        target="_blank"
        className="flex items-center justify-center text-textdark dark:text-textlight mt-10 pb-4"
      >
        <FaGithub />
        <p className="ml-2">made by Pizzaboi87</p>
      </Link>
    </footer>
  );
};

export default Footer;
