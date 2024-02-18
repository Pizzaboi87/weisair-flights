import { BookingDetails } from "@/models/models";
import { FC } from "react";

type Props = {
  bookingData: BookingDetails[];
};

const MyBookings: FC<Props> = ({ bookingData }) => {
  return (
    <div className="shadow-inner shadow-black bg-filllight dark:bg-filldark px-4 py-6 h-full rounded-xl">
      {bookingData.map((booking, index) => (
        <p key={index}>{booking.flightProgram.programName}</p>
      ))}
    </div>
  );
};

export default MyBookings;
