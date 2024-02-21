"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import RatingStars from "../rating-stars/RatingStars";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

type Props = {
  programId: string;
  bookingId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultRating = {
  rating: 0,
  review: "",
};

const RatingModal: FC<Props> = ({
  programId,
  bookingId,
  isOpen,
  setIsOpen,
}) => {
  const [userRating, setUserRating] = useState(defaultRating);
  const [isLoading, setIsLoading] = useState(false);

  const setBackDefault = () => {
    setUserRating(defaultRating);
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.value = "";
    }
  };

  useEffect(() => {
    if (isOpen) {
      setBackDefault();
    }
  }, [isOpen, bookingId]);

  const handleReview = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserRating((prevRating) => ({
      ...prevRating,
      review: event.target.value,
    }));
  };

  const handleRating = (value: number) => {
    setUserRating((prevRating) => ({ ...prevRating, rating: value }));
  };

  const submitRating = async () => {
    const regex = /^[a-zA-Z0-9 ,.;:?!'\-()/@&$€"_]+$/;

    if (!userRating.rating || !userRating.review.trim().length) {
      return toast.error("Please fill out the form");
    } else if (!regex.test(userRating.review)) {
      return toast.error(
        "Please write valid English text with latin characters only."
      );
    } else {
      setIsLoading(true);
      try {
        const { data } = await axios.post("/api/users", {
          flightProgram: programId,
          flightBooking: bookingId,
          userReview: userRating.review,
          userRating: userRating.rating,
        });
        if (data) {
          toast.success("Review Submitted!");
        }
      } catch (error) {
        console.log("Error while saving review", error);
        toast.error("The review has not been saved");
      } finally {
        setIsLoading(false);
        setIsOpen(false);
        setBackDefault();
      }
    }
  };

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
            value={userRating.rating}
            edit={true}
            onChange={(value) => handleRating(value)}
            className="flex"
          />
          <div className="container-booking mt-3 md:min-w-[25rem]">
            <label className="text-sm">Your Review</label>
            <textarea
              rows={5}
              className="search-input placeholder:text-black"
              onChange={handleReview}
            />
          </div>
          {isLoading ? (
            <LoadingSpinner otherClass="h-10 w-10 mt-3" />
          ) : (
            <span className="flex items-center justify-evenly w-full mt-3">
              <button className="btn-quaternary" onClick={submitRating}>
                Save
              </button>
              <button
                className="btn-quaternary"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                Cancel
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
