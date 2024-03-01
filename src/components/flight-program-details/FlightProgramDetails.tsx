import DetailButton from "../detail-button/DetailButton";
import BookingBox from "../booking-box/BookingBox";
import ReviewsBox from "../reviews-box/ReviewsBox";
import { Flight } from "@/models/models";
import { FC } from "react";

type Props = {
  flight: Flight;
};

const FlightProgramDetails: FC<Props> = ({ flight }) => {
  return (
    <div className="container mx-auto flex flex-col items-center md:my-20 mb-10">
      <div className="md:grid md:grid-cols-12 gap-12 px-3">
        <div className="md:col-span-7 w-full bg-gradientlight dark:bg-gradientdark p-2 rounded-xl">
          <h2 className="font-bold text-[2rem] ml-2">Flight Details</h2>
          <div className="w-fit h-fit rounded-xl shadow-inner shadow-black px-4 py-6 bg-filllight dark:bg-filldark">
            <div className="flex flex-wrap mb-11 mt-8 gap-3 items-center justify-center">
              {flight.offeredAmenities.map((amenity) => (
                <DetailButton
                  key={amenity._key}
                  detailIcon={amenity.icon}
                  detailText={amenity.amenity}
                />
              ))}
              <DetailButton
                detailIcon="fa-stopwatch"
                detailText={`${flight.programLength} min`}
              />
              <DetailButton
                detailIcon="fa-user-group"
                detailText={`max ${flight.seats} person`}
              />
            </div>
            <div className="text-justify text-[1.1rem] dark:text-bglight">
              {flight.generalKnowledge
                .split("**")
                .map((segment, index, array) => {
                  if (index % 2 === 0) {
                    return (
                      <p key={index} className="font-bold mt-4">
                        {segment}
                        {index !== array.length - 1 && <br />}
                      </p>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {segment}
                        {index !== array.length - 1 && <br />}
                      </p>
                    );
                  }
                })}
            </div>
          </div>

          <h2 className="font-bold text-[2rem] ml-2 mt-10">Customer Reviews</h2>
          <ReviewsBox flightId={flight._id} />
        </div>

        <BookingBox
          note={flight.specialNote}
          price={flight.price}
          discount={flight.discount}
          seats={flight.seats}
          flightProgram={flight.programName}
          flightSlug={flight.slug.current}
          flightType={flight.type.slug.current}
          flightTypeId={flight.type._id}
        />
      </div>
    </div>
  );
};

export default FlightProgramDetails;
