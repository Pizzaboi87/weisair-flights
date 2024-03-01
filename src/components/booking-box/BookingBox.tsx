"use client";

import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { ChangeEvent, FC, useState } from "react";
import { getAllBookings } from "@/libs/apis";
import { useSession } from "next-auth/react";
import { getStripe } from "@/libs/stripe";

type Props = {
  note: string;
  price: number;
  discount: number;
  seats: number;
  flightProgram: string;
  flightSlug: string;
  flightType: string;
  flightTypeId: string;
};

interface Form {
  date: string;
  adults: number;
  children: number;
}

const defaultForm = {
  date: new Date().toISOString().split("T")[0],
  adults: 1,
  children: 0,
};

const BookingBox: FC<Props> = ({
  note,
  price,
  discount,
  seats,
  flightProgram,
  flightTypeId,
  flightSlug,
  flightType,
}) => {
  const [bookingForm, setBookingForm] = useState<Form>(defaultForm);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { date, adults, children } = bookingForm;

  const { data: session } = useSession();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBookingForm({ ...bookingForm, [name]: value });
  };

  const handleSubmit = async () => {
    if (new Date(date) < new Date()) {
      toast.error("Only a future date can be selected.");
      return;
    }

    const allBookings = await getAllBookings();

    const occupied = allBookings.filter((booking) => {
      return (
        booking.flightDate === date &&
        booking.flightType.slug.current === flightType
      );
    });

    if (
      occupied.length &&
      occupied[0].flightType.quantity < occupied.length + 1
    )
      toast.error("This aircraft is no longer available for the selected day.");
    else if (seats < Number(adults) + Number(children))
      toast.error("There's more passangers than seats!");
    else {
      const stripe = await getStripe();

      try {
        setIsLoading(true);
        const { data: stripeSession } = await axios.post("/api/stripe", {
          flightProgram: flightProgram,
          flightDate: date,
          flightTypeId: flightTypeId,
          flightSlug: flightSlug,
          adults: adults,
          children: children,
          totalPrice:
            (adults * price + children * (price - 20)) *
            ((100 - discount) / 100),
          discount: discount,
        });

        if (stripe) {
          const result = await stripe.redirectToCheckout({
            sessionId: stripeSession.id,
          });

          if (result.error) {
            setIsLoading(false);
            toast.error("Payment Failed.");
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error: ", error);
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="sticky top-0 md:col-span-5 mt-10 md:mt-0 w-full h-fit bg-gradientlight dark:bg-gradientdark rounded-xl overflow-hidden">
      <div className="p-4 flex flex-col">
        <h2 className="font-bold text-[2rem]">Booking Details</h2>
        <p className="text-[1.1rem] text-justify mt-3">{note}</p>

        <div className="container-booking mt-6">
          <label className="search-label">Flight Date</label>
          <input
            type="date"
            name="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            className="search-input"
          />
        </div>

        <div className="flex justify-between gap-6">
          <div className="container-booking mt-4">
            <label className="search-label">Adults</label>
            <input
              type="number"
              name="adults"
              min={1}
              value={adults}
              onChange={handleChange}
              className="search-input"
            />
          </div>
          <div className="container-booking mt-4">
            <label className="search-label">Children</label>
            <input
              type="number"
              name="children"
              min={0}
              value={children}
              onChange={handleChange}
              className="search-input"
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <p className="flex justify-between">
            <span className="font-bold">Adults:</span> {adults * price}€
          </p>
          <p className="flex justify-between">
            <span className="font-bold">Children:</span>{" "}
            {children * (price - 20)}€
          </p>
          {discount ? (
            <p className="flex justify-between">
              <span className="font-bold">Discount:</span> -{discount}%
            </p>
          ) : null}
          <hr className="border-textdark dark:border-textlight border-[0.05rem]" />
          <p className="flex justify-between">
            <span className="font-bold">Final Price:</span>
            {(adults * price + children * (price - 20)) *
              ((100 - discount) / 100)}
            €
          </p>
        </div>
        {session?.user ? (
          <button
            className={`${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            } btn-booking w-[90%] h-[4rem] mt-8 self-center flex items-center justify-center`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner otherClass="h-10 w-10" /> : "Book Now"}
          </button>
        ) : (
          <Link
            href="/auth"
            className="btn-booking w-[90%] h-[4rem] mt-8 self-center flex items-center justify-center"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default BookingBox;
