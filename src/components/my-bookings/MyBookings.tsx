import { BookingDetails } from "@/models/models";
import Image from "next/image";
import { FC } from "react";

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
    <span
      className={`${gridClass} lg:col-span-3 w-full lg:block flex justify-between`}
    >
      <p className="lg:hidden font-bold">{title}:</p>
      <p>{data}</p>
    </span>
  );
};

const MyBookings: FC<Props> = ({ bookingData }) => {
  const sortedBookings = [...bookingData].sort((a, b) => {
    const dateA = new Date(a.flightDate);
    const dateB = new Date(b.flightDate);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="flex flex-col">
      <div className="hidden lg:grid lg:grid-cols-12 text-center text-[1rem] mb-2">
        <p className="lg:col-span-1">Image</p>
        <p className="lg:col-span-3">Name</p>
        <p className="lg:col-span-2">Date</p>
        <p className="lg:col-span-2">Adults / Children</p>
        <p className="lg:col-span-2">Discount</p>
        <p className="lg:col-span-2">Price</p>
      </div>
      {sortedBookings.map((booking, index) => (
        <div
          key={index}
          className="bg-gradientlight dark:bg-gradientdark lg:rounded-full rounded-lg mb-8 w-full lg:grid lg:grid-cols-12 flex flex-col items-start lg:items-center text-center px-2 py-2 lg:px-0 lg:py-0"
        >
          <div className="lg:col-span-1 flex items-center lg:justify-start justify-between w-full p-1 mb-3 lg:mb-0">
            <p className="lg:hidden font-bold text-[1.75rem]">
              {booking.flightProgram.programName}
            </p>
            <div className="lg:h-[3.5rem] h-[5rem] lg:w-[3.5rem] w-[5rem] rounded-full overflow-hidden">
              <Image
                src={booking.flightProgram.coverImage.url}
                alt={booking.flightProgram.programName}
                width={400}
                height={400}
                className="img scale-anim"
              />
            </div>
          </div>

          <BookingDataLine
            data={booking.flightProgram.programName}
            title="Program Name"
            gridClass="lg:col-span-3"
          />

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
            data={`${booking.discount}%`}
            title="Discount"
            gridClass="lg:col-span-2"
          />

          <BookingDataLine
            data={`${booking.totalPrice}€`}
            title="Price"
            gridClass="lg:col-span-2"
          />
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
