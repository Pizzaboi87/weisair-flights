import LoadingSpinner from "@/app/(web)/loading";
import { GetReviewData } from "@/models/models";
import axios from "axios";
import { FC } from "react";
import useSWR from "swr";
import RatingStars from "../rating-stars/RatingStars";

type Props = {
  flightId: string;
};

const ReviewsBox: FC<Props> = ({ flightId }) => {
  const fetchAllReview = async () => {
    const { data } = await axios.get<GetReviewData[]>(
      `/api/flight-reviews/${flightId}`
    );
    const sortedReviews = [...data].sort((a, b) => {
      const dateA = new Date(a._createdAt);
      const dateB = new Date(b._createdAt);
      return dateB.getTime() - dateA.getTime();
    });

    return sortedReviews;
  };

  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useSWR(`/api/flight-reviews/${flightId}`, fetchAllReview);

  if (reviewsError || (typeof reviews === "undefined" && !reviewsIsLoading))
    throw new Error("Cannot fetch any review.");

  if (!reviews) return <LoadingSpinner />;

  return (
    <div className="w-full rounded-xl flex flex-col gap-6">
      {reviews.length ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className="py-2 px-6 flex flex-col rounded-xl bg-filllight dark:bg-filldark shadow-inner shadow-black"
          >
            <span className="text-[1.5rem] flex items-center justify-between border-b border-black border-1">
              <p className="font-bold">{review.user.name}</p>
              <RatingStars
                count={5}
                value={review.userRating}
                className="pointer-events-none flex"
                size={24}
              />
            </span>
            <p className="mt-4 text-[1.1rem]">
              &quot;{review.userReview}&quot;
            </p>
            <p className="text-[1rem] italic mt-4 self-end">
              {new Date(review._createdAt).toISOString().split("T")[0]}
            </p>
          </div>
        ))
      ) : (
        <div className="py-6 px-6 rounded-xl bg-filllight dark:bg-filldark shadow-inner shadow-black">
          <p>No reviews have been received yet.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsBox;
