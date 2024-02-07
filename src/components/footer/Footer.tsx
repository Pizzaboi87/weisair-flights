"use client";

import Link from "next/link";
import { FaGithub, FaMobileAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="dark:bg-filldark dark:text-textdark dark:bg-gradientdark bg-gradientlight relative">
      <div className="custom-shape-divider-top-1706911286">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-[30vh]"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="dark:fill-bgdark fill-bglight"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto px-4 pt-24 text-textdark dark:text-textlight">
        <Link href="/" className="font-black text-[1.2rem]">
          2024 - WeisAIR®
        </Link>
        <h4 className="font-semibold text-[2rem] pt-4 pb-2">Contact</h4>
        <div className="flex flex-wrap gap-16 items-center justify-between text-[1.2rem]">
          <div className="flex-1">
            <span className="flex gap-2 pt-2 items-center">
              <FaMapLocationDot />
              <p>1026 Budapest, Széchenyi street 4.</p>
            </span>
            <span className="flex gap-2 pt-2 items-center">
              <FaMobileAlt />
              <p>+36 70 225 2256</p>
            </span>
            <span className="flex gap-2 pt-2 items-center">
              <MdOutlineAlternateEmail />
              <p>contact@weisair.hu</p>
            </span>
          </div>

          <div className="flex-1 md:text-left">
            <p className="pt-2">Our Story</p>
            <p className="pt-2">Career</p>
            <p className="pt-2">Privacy Policy</p>
            <p className="pt-2">Terms and Conditions</p>
            <p className="pt-2">About</p>
          </div>

          <div className="flex-1 md:text-left">
            <p className="pt-2">Our Fleet</p>
            <p className="pt-2">Gallery</p>
            <p className="pt-2">FAQ</p>
            <p className="pt-2">Other Services</p>
            <p className="pt-2">Flight Experiences</p>
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
