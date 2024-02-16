"use client";

import { getUserBookings } from "@/libs/apis";
import useSWR from "swr";

const UserPage = (props: { params: { id: string } }) => {
  const {
    params: { id },
  } = props;

  const { data, error, isLoading } = useSWR("get/userBookings", () =>
    getUserBookings(id)
  );

  return <div className="">UserPage</div>;
};

export default UserPage;
