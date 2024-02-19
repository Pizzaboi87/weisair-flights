import { BookingDetails } from "@/models/models";
import Image from "next/image";
import { FC } from "react";

type Props = {
  bookingData: BookingDetails[];
};

/*
adults
children
discount
flightDate
flightProgram / coverImage, programName
totalPrice

*/

const MyBookings: FC<Props> = ({ bookingData }) => {
  return (
    <div className="grid grid-cols-11 gap-10">
      <div className="flex col-span-11 justify-evenly">
        <p className="bg-blue-300">Image</p>
        <p>Name</p>
        <p>Date</p>
        <p>Adults</p>
        <p>Children</p>
        <p>Discount</p>
        <p>Price</p>
      </div>
      {bookingData.map((booking, index) => (
        <div
          key={index}
          className="bg-red-500 col-span-11 grid grid-cols-11 items-center"
        >
          <div className="col-span-1 bg-green-400 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={booking.flightProgram.coverImage.url}
                alt={booking.flightProgram.programName}
                width={400}
                height={400}
                className="img scale-anim"
              />
            </div>
          </div>
          <p className="col-span-3 bg-blue-400 pl-2">
            {booking.flightProgram.programName}
          </p>
          <p className="col-span-2 bg-green-400 text-center">
            {booking.flightDate}
          </p>
          <p className="col-span-1 bg-blue-400 text-center">{booking.adults}</p>
          <p className="col-span-1 bg-green-400 text-center">
            {booking.children}
          </p>
          <p className="col-span-1 bg-blue-400 text-center">
            {booking.discount}%
          </p>
          <p className="col-span-2 bg-green-400 text-center">
            {booking.totalPrice}€
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
