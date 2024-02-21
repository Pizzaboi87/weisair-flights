"use client";

import { FC, useState } from "react";
import RatingStars from "../rating-stars/RatingStars";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RatingModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const [rating, setRating] = useState(0);

  return (
    <div
      className={`${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed z-[98] top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.8)] transition-all duration-500`}
    >
      <div className="absolute md:w-fit w-screen md:h-fit h-[80%] m-auto z-[99] inset-0 flex items-center justify-center shadow-xl bg-gradientlight dark:bg-gradientdark px-2 py-2 rounded-xl">
        <div className="shadow-inner w-full h-full shadow-black bg-filllight dark:bg-filldark px-4 py-6 rounded-xl flex flex-col items-center justify-center md:min-w-[30rem]">
          <h1 className="font-subheading mb-3">Rate Your Flight!</h1>
          <RatingStars
            count={5}
            value={rating}
            edit={true}
            onChange={(value) => setRating(value)}
            className="flex"
          />
          <div className="container-booking mt-3 md:min-w-[25rem]">
            <label className="text-sm">Your Review</label>
            <textarea
              rows={5}
              className="search-input placeholder:text-black"
            />
          </div>
          <span className="flex items-center justify-evenly w-full mt-3">
            <button className="btn-quaternary">Save</button>
            <button
              className="btn-quaternary"
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
