import { Flight } from "@/models/models";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { AiFillEuroCircle } from "react-icons/ai";
import { FaClock } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

type Props = {
  flight: Flight;
};

const FlightCard: FC<Props> = ({ flight }) => {
  return (
    <div className="sm:rounded-xl lg:w-[24rem] sm:w-[22rem] w-full mb-10 mx-auto md:mx-0 overflow-hidden md:shadow-sm shadow-textdark">
      <div className="h-[16rem] overflow-hidden">
        <Image
          src={flight.coverImage.asset.url}
          alt={flight.programName}
          height={400}
          width={400}
          className="img scale-anim"
        />
      </div>

      <div className="p-4 bg-gradientlight dark:bg-gradientdark flex flex-col">
        <div className="flex flex-col justify-between font-semibold">
          <p className="text-center text-[1.5rem]">{flight.programName}</p>
        </div>

        <p className="text-justify text-[1rem] mt-3">
          {flight.description.slice(0, 175)}...
        </p>

        <div className="flex items-end justify-between py-4">
          <span className="flex items-center justify-center text-[1.75rem] gap-1">
            <FaClock />
            <p>{flight.programLength}'</p>
          </span>

          <span className="flex items-center justify-center text-[1.75rem] gap-1">
            <FaPerson />
            <p>{flight.seats}</p>
          </span>

          <span className="flex items-center justify-center text-[1.75rem] gap-1">
            <AiFillEuroCircle />
            <p>{flight.price}€</p>
          </span>
        </div>

        <Link
          href={`/flights/${flight.slug.current}`}
          className="btn-tertiary btn-fit"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default FlightCard;
