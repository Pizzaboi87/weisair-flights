"use client";

import { getUserBookings } from "@/libs/apis";
import { User } from "@/models/models";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import { ImExit } from "react-icons/im";
import { signOut } from "next-auth/react";
import MyBookings from "@/components/my-bookings/MyBookings";
import { useState } from "react";

const UserPage = (props: { params: { id: string } }) => {
  const {
    params: { id },
  } = props;
  const signOutUser = () => {
    signOut({ callbackUrl: "/" });
  };

  const {
    data: bookingData,
    error: bookingError,
    isLoading: bookingLoading,
  } = useSWR("get/userBookings", () => getUserBookings(id));

  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
    return data;
  };

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR("get/userData", fetchUserData);

  if (bookingError || userError) throw new Error("Cannot fetch user data.");
  if (bookingLoading || userLoading) return <LoadingSpinner />;

  if (userData && bookingData)
    return (
      <div className="container mx-auto px-2 lg:px-4 md:mt-10 py-10">
        <div className="flex flex-col w-full md:grid md:grid-cols-12 md:gap-10 gap-10 md:min-h-screen items-center">
          <div className="w-full md:col-span-5 lg:col-span-4 shadow-lg h-fit self-start md:sticky top-10 bg-gradientlight dark:bg-gradientdark rounded-lg px-6 py-4">
            <div className="md:w-32 w-36 md:h-32 h-36 mx-auto rounded-full overflow-hidden">
              <Image
                src={userData.image}
                alt="user_profileimage"
                width={400}
                height={400}
                className="img scale-anim"
              />
            </div>
            <div className="font-normal py-4 flex flex-col gap-3">
              <span>
                <h6 className="text-xl font-bold">About Me</h6>
                <p
                  className="text-[1rem] cursor-pointer"
                  //onClick={changeAbout}
                >
                  {userData.about ?? "I believe I can fly..."}
                </p>
              </span>

              <span>
                <h6 className="text-xl font-bold">Name</h6>
                <p className="text-[1rem]">{userData.name}</p>
              </span>

              <span>
                <h6 className="text-xl font-bold">Email address</h6>
                <p className="text-[1rem]">{userData.email}</p>
              </span>

              <span>
                <h6 className="text-xl font-bold">Registration Date</h6>
                <p className="text-[1rem]">
                  {userData._createdAt.split("T")[0]}
                </p>
              </span>

              <span
                className="flex w-fit mx-auto p-1 items-center justify-center gap-2 cursor-pointer mt-4"
                onClick={signOutUser}
              >
                <p className="text-[1.5rem] lg:text-[1.3rem]">Sign Out</p>
                <ImExit className="lg:text-[1.5rem] text-[2.75rem]" />
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-gradientlight dark:bg-gradientdark px-2 py-2 rounded-xl w-full md:col-span-7 lg:col-span-8 h-full">
            <h1 className="text-[2rem] font-bold ml-2">
              Hello {userData.name.split(" ")[0]}!
            </h1>
            <div className="shadow-inner shadow-black bg-filllight dark:bg-filldark px-4 py-6 h-full rounded-xl">
              <MyBookings bookingData={bookingData} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default UserPage;
