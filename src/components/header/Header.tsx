"use client";

import ThemeContext from "@/context/themeContext";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaSignInAlt, FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
import { User } from "@/models/models";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  const switchTheme = () => {
    if (darkTheme) {
      setDarkTheme(false);
      localStorage.removeItem("app-theme");
    } else {
      setDarkTheme(true);
      localStorage.setItem("app-theme", "true");
    }
  };

  const fetchUserData = async () => {
    if (session?.user) {
      const { data } = await axios.get<User>("/api/users");
      return data;
    } else return;
  };

  const {
    data: userData,
    error: userError,
    mutate,
  } = useSWR("get/userData", fetchUserData);

  useEffect(() => {
    mutate();
  }, [session]);

  if (session?.user && userError) throw new Error("Cannot fetch user data.");

  return (
    <header className="py-10 2xl:pt-14 md:px-16 px-4 mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between relative bg-gradientlight dark:bg-gradientdark">
      <div className="custom-shape-divider-bottom-1707239478 hidden md:block">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-[32vh] dark:bg-gradientdark bg-gradientlight"
        >
          <path
            d="M1200 0L0 103.52 0 120 1200 120 1200 0z"
            className="dark:fill-bgdark fill-bglight"
          ></path>
        </svg>
      </div>

      <div className="flex items-center justify-between md:justify-normal w-full md:w-2/3 z-[2] md:mt-0 mt-4">
        <Link
          href="/"
          className="font-black dark:text-textlight text-textdark text-[2.2rem] rotate-[3deg]"
        >
          <div className="relative w-[10rem] h-[6rem] flex items-start justify-start">
            <Image
              src={"/images/logo.png"}
              width={400}
              height={400}
              alt="logo"
              className="absolute w-full h-auto hue-rotate-120 invert dark:invert-0"
            />
          </div>
        </Link>
        <ul className="flex items-center ml-5 dark:text-textlight text-textdark">
          <li className="items-center">
            {session?.user && userData ? (
              <Link href={`/users/${session.user.id}`}>
                <div className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden">
                  <Image
                    src={userData.avatar?.asset?.url ?? userData.image}
                    alt={session.user.name!}
                    width={40}
                    height={40}
                    className="scale-anim img"
                  />
                </div>
              </Link>
            ) : (
              <Link href="/auth">
                <FaSignInAlt className="cursor-pointer text-[2.5rem]" />
              </Link>
            )}
          </li>
          <li className="ml-2">
            {darkTheme ? (
              <FaSun
                className="cursor-pointer text-[2.5rem]"
                onClick={switchTheme}
              />
            ) : (
              <MdDarkMode
                className="cursor-pointer text-[2.5rem]"
                onClick={switchTheme}
              />
            )}
          </li>
        </ul>
      </div>
      <ul className="flex items-center justify-evenly w-full md:w-1/3 mt-4 pt-6 md:pt-0 z-[2]">
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
