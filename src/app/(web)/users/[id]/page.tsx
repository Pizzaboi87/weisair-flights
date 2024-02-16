"use client";

import { getUserBookings } from "@/libs/apis";
import { User } from "@/models/models";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";
import LoadingSpinner from "../../loading";

const UserPage = (props: { params: { id: string } }) => {
  const {
    params: { id },
  } = props;

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
      <div className="container mx-auto px-2 md:px-4 md:mt-10 py-10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-gradientlight dark:bg-gradientdark rounded-lg px-6 py-4">
            <div className="md:w-32 w-36 md:h-32 h-36 mx-auto mb-5 rounded-full overflow-hidden">
              <Image
                src={userData.image}
                alt="user_profileimage"
                width={400}
                height={400}
                className="img scale-anim"
              />
            </div>
            <div className="font-normal py-4 text-left">
              <h6 className="text-xl font-bold">About Me</h6>
              <p className="text-[1rem]">{userData.about ?? ""}</p>
            </div>
            <div className="font-normal text-left">
              <h6 className="text-xl font-bold">{userData.name}</h6>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UserPage;
