"use client";

import RatingStars from "../rating-stars/RatingStars";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import { ChangeEvent, FC, useEffect, useState } from "react";

type Props = {
  programId: string;
  bookingId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Form {
  rating: number;
  review: string;
}

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
  const [userRating, setUserRating] = useState<Form>(defaultRating);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setBackDefault = () => {
    setUserRating(defaultRating);
    const textarea = document.getElementById("review") as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = "";
    }
  };

  const getRatingIfExists = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/api/review", {
        params: { flightBooking: bookingId },
      });
      if (data !== null) {
        setUserRating({ rating: data.userRating, review: data.userReview });
        const textarea = document.querySelector("textarea");
        if (textarea) {
          textarea.value = data.userReview;
        }
      }
    } catch (error) {
      console.error("Error fetching review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) getRatingIfExists();
    else setBackDefault();
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
        const { data } = await axios.post("/api/review", {
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
    <ModalWrapper isOpen={isOpen}>
      <h1 className="font-subheading mb-3">Rate Your Flight!</h1>
      <RatingStars
        count={5}
        value={userRating.rating}
        edit={true}
        onChange={(value) => handleRating(value)}
        className="flex"
      />

      <div
        className={`${
          userRating.review ? "filled" : ""
        } container-style relative mt-3 w-full md:min-w-[25rem]`}
      >
        <textarea
          rows={5}
          id="review"
          onChange={handleReview}
          className="lightinput dark:darkinput outline-none w-full py-6 px-2"
        />
        <label className="label-style">Your Review</label>
      </div>

      {isLoading ? (
        <LoadingSpinner otherClass="h-10 w-10 mt-3" />
      ) : (
        <span className="flex items-center justify-evenly w-full mt-3">
          <button
            className="btn-quaternary"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            Cancel
          </button>
          <button className="btn-quaternary px-2" onClick={submitRating}>
            Save
          </button>
        </span>
      )}
    </ModalWrapper>
  );
};

export default RatingModal;
