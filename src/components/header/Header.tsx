"use client";

import ThemeContext from "@/context/themeContext";
import Link from "next/link";
import { useContext } from "react";
import { FaSignInAlt, FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const switchTheme = () => {
    if (darkTheme) {
      setDarkTheme(false);
      localStorage.removeItem("app-theme");
    } else {
      setDarkTheme(true);
      localStorage.setItem("app-theme", "true");
    }
  };

  return (
    <header className="py-10 px-16 mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between relative bg-red-200">
      <div className="custom-shape-divider-top-1706909798">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="flex items-center w-full md:2/3">
        <Link
          href="/"
          className="font-black text-tertiary-dark text-[2.2rem] mt-1"
        >
          WeisAIR
        </Link>
        <ul className="flex items-center ml-5">
          <li className="items-center">
            <Link href="/auth">
              <FaSignInAlt className="cursor-pointer text-[2rem]" />
            </Link>
          </li>
          <li className="ml-2">
            {darkTheme ? (
              <FaSun
                className="cursor-pointer text-[2rem]"
                onClick={switchTheme}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer text-[2rem]"
                onClick={switchTheme}
              />
            )}
          </li>
        </ul>
      </div>
      <ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
        <li className="hover:-translate-y-2 duration-500 transition-all text-[1.5rem]">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all text-[1.5rem]">
          <Link href="/flights">Flights</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all text-[1.5rem]">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
