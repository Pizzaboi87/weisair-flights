"use client";

import RatingModal from "../rating-modal/RatingModal";
import Image from "next/image";
import Link from "next/link";
import { BookingDetails } from "@/models/models";
import { FC, useState } from "react";

type Props = {
  bookingData: BookingDetails[];
};

type LineProps = {
  data: string;
  title: string;
  gridClass: string;
};

const BookingDataLine: FC<LineProps> = ({ data, title, gridClass }) => {
  return (
    <span className={`${gridClass} w-full lg:block flex justify-between`}>
      <p className="lg:hidden font-bold">{title}:</p>
      <p>{data}</p>
    </span>
  );
};

const MyBookings: FC<Props> = ({ bookingData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");
  const [flightId, setFlightId] = useState<string>("");

  const sortedBookings = [...bookingData].sort((a, b) => {
    const dateA = new Date(a.flightDate);
    const dateB = new Date(b.flightDate);
    return dateB.getTime() - dateA.getTime();
  });

  const openRatingModal = (booking: string, flight: string) => {
    setIsOpen((isOpen) => !isOpen);
    setBookingId(booking);
    setFlightId(flight);
  };

  return (
    <div className="flex flex-col">
      <div className="hidden lg:grid lg:grid-cols-12 text-center text-[1rem] mb-2">
        <p className="lg:col-span-1">Image</p>
        <p className="lg:col-span-3">Name</p>
        <p className="lg:col-span-2">Date</p>
        <p className="lg:col-span-2">Adults / Children</p>
        <p className="lg:col-span-2">Price</p>
        <p className="lg:col-span-2">Rating</p>
      </div>
      {sortedBookings.length ? (
        sortedBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gradientlight dark:bg-gradientdark lg:rounded-full rounded-lg mb-8 w-full lg:grid lg:grid-cols-12 flex flex-col items-start lg:items-center text-center px-2 py-2 lg:px-0 lg:py-0"
          >
            <div className="lg:col-span-1 flex items-center lg:justify-start justify-between w-full p-1 mb-3 lg:mb-0">
              <Link
                href={`/flights/${booking.flightProgram.slug.current}`}
                className="lg:hidden font-bold text-[1.75rem]"
              >
                {booking.flightProgram.programName}
              </Link>
              <div className="lg:h-[3.5rem] h-[5rem] lg:w-[3.5rem] w-[5rem] rounded-full overflow-hidden">
                <Image
                  src={booking.flightProgram.coverImage.asset.url}
                  alt={booking.flightProgram.programName}
                  width={400}
                  height={400}
                  className="img scale-anim"
                />
              </div>
            </div>

            <span className="lg:col-span-3 w-full lg:block flex justify-between">
              <p className="lg:hidden font-bold">Program Name:</p>
              <Link
                href={`/flights/${booking.flightProgram.slug.current}`}
                className="font-bold"
              >
                {booking.flightProgram.programName}
              </Link>
            </span>

            <BookingDataLine
              data={booking.flightDate}
              title="Flight Date"
              gridClass="lg:col-span-2"
            />

            <BookingDataLine
              data={`${booking.adults} / ${booking.children}`}
              title="Adults / Children"
              gridClass="lg:col-span-2"
            />

            <BookingDataLine
              data={`${booking.totalPrice}€`}
              title="Price"
              gridClass="lg:col-span-2"
            />

            <span className="lg:col-span-2 w-full">
              <p
                className="inline hover:font-bold cursor-pointer"
                onClick={() =>
                  openRatingModal(booking._id, booking.flightProgram._id)
                }
              >
                Rating
              </p>
            </span>
          </div>
        ))
      ) : (
        <p className="text-center md:mt-[15rem] text-[1.5rem]">
          You don&rsquo;t have any bookings yet
        </p>
      )}
      <RatingModal
        programId={flightId}
        bookingId={bookingId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default MyBookings;
