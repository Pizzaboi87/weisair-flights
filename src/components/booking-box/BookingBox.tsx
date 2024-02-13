"use client";

import { ChangeEvent, FC, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  note: string;
  price: number;
  discount: number;
  seats: number;
};

const defaultForm = {
  date: new Date().toISOString().split("T")[0],
  adults: 0,
  children: 0,
};

const BookingBox: FC<Props> = ({ note, price, discount, seats }) => {
  const [bookingForm, setBookingForm] = useState(defaultForm);
  const { date, adults, children } = bookingForm;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBookingForm({ ...bookingForm, [name]: value });
  };

  const handleSubmit = () => {
    if (adults === 0) toast.error("Minimum one adult passanger is mandatory!");
    if (seats < Number(adults) + Number(children))
      toast.error("There's more passangers than seats!");
    else toast.success("Everything is fine.");
  };

  return (
    <div className="sticky top-0 md:col-span-5 mt-10 md:mt-0 w-full h-fit bg-gradientlight dark:bg-gradientdark rounded-xl">
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
          className="btn-tertiary mt-8 self-center"
          onClick={handleSubmit}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookingBox;
