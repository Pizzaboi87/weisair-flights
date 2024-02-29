"use client";

import MyBookings from "@/components/my-bookings/MyBookings";
import AboutModal from "@/components/about-modal/AboutModal";
import UserBox from "@/components/user-box/UserBox";
import LoadingSpinner from "../../loading";
import axios from "axios";
import useSWR from "swr";
import { getUserBookings } from "@/libs/apis";
import { User } from "@/models/models";
import { signOut } from "next-auth/react";
import { useState } from "react";

const UserPage = (props: { params: { id: string } }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
    mutate: mutateUserData,
  } = useSWR("get/userData", fetchUserData);

  if (bookingError || userError) throw new Error("Cannot fetch user data.");
  if (bookingLoading || userLoading) return <LoadingSpinner />;

  if (userData && bookingData)
    return (
      <div className="container mx-auto px-2 lg:px-4 md:mt-10 py-10 2xl:py-[10rem]">
        <div className="flex flex-col w-full md:grid md:grid-cols-12 md:gap-10 gap-10 md:min-h-screen items-center">
          <UserBox
            userData={userData}
            signOutUser={signOutUser}
            setIsOpen={setIsOpen}
            reFetchUserData={mutateUserData}
          />
          <div className="flex flex-col bg-gradientlight dark:bg-gradientdark px-2 py-2 rounded-xl w-full md:col-span-7 lg:col-span-8 h-full">
            <h1 className="text-[2rem] font-bold ml-2">
              Hello {userData.name.split(" ")[0]}!
            </h1>
            <div className="shadow-inner shadow-black bg-filllight dark:bg-filldark px-4 py-6 h-full rounded-xl">
              <MyBookings bookingData={bookingData} />
            </div>
          </div>
        </div>
        <AboutModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          fetchUserData={mutateUserData}
          defaultAbout={userData.about}
        />
      </div>
    );
};

export default UserPage;
