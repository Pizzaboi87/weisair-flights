"use client";

import { getStripe } from "@/libs/stripe";
import axios from "axios";
import { ChangeEvent, FC, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

type Props = {
  note: string;
  price: number;
  discount: number;
  seats: number;
  flightProgram: string;
  flightSlug: string;
};

const defaultForm = {
  date: new Date().toISOString().split("T")[0],
  adults: 0,
  children: 0,
};

const BookingBox: FC<Props> = ({
  note,
  price,
  discount,
  seats,
  flightProgram,
  flightSlug,
}) => {
  const [bookingForm, setBookingForm] = useState(defaultForm);
  const [isLoading, setIsLoading] = useState(false);
  const { date, adults, children } = bookingForm;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBookingForm({ ...bookingForm, [name]: value });
  };

  const handleSubmit = async () => {
    if (adults === 0) toast.error("Minimum one adult passanger is mandatory!");
    if (seats < Number(adults) + Number(children))
      toast.error("There's more passangers than seats!");

    const stripe = await getStripe();

    try {
      setIsLoading(true);
      const { data: stripeSession } = await axios.post("/api/stripe", {
        flightProgram,
        flightDate: date,
        flightSlug,
        adults,
        children,
        totalPrice:
          (adults * price + children * (price - 20)) * ((100 - discount) / 100),
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
  };

  return (
    <div className="sticky top-0 md:col-span-5 mt-10 md:mt-0 w-full h-fit bg-gradientlight dark:bg-gradientdark rounded-xl overflow-hidden">
      <div className="p-4 flex flex-col">
        <h2 className="font-bold text-[2rem]">Booking Details</h2>
        <p className="text-[1.1rem] text-justify mt-3">{note}</p>

        <div className="search-container mt-6">
          <label className="search-label">Flight Date</label>
          <input
            type="date"
            name="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
            className="search-input placeholder:text-black"
          />
        </div>

        <div className="flex justify-between gap-6">
          <div className="search-container mt-4">
            <label className="search-label">Adults</label>
            <input
              type="number"
              name="adults"
              min={1}
              value={adults}
              onChange={handleChange}
              className="search-input placeholder:text-black"
            />
          </div>
          <div className="search-container mt-4">
            <label className="search-label">Children</label>
            <input
              type="number"
              name="children"
              min={0}
              value={children}
              onChange={handleChange}
              className="search-input placeholder:text-black"
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

        <button
          className={`${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          } btn-booking w-full h-[4rem] mt-8 self-center flex items-center justify-center`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner otherClass="h-10 w-10" /> : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default BookingBox;
