import { Flight } from "@/models/flight";
import { FC } from "react";

type Props = {
  flight: Flight;
};

const FlightProgramDetails: FC<Props> = ({ flight }) => {
  return (
    <div className="container mx-auto md:my-20 my-10">
      <div className="md:grid md:grid-cols-12 gap-10 px-3">
        <div className="md:col-span-7 md:w-full bg-gradientlight dark:bg-gradientdark px-4 rounded-xl py-4">
          <h2 className="font-bold text-[2rem]">Flight Details</h2>
          <div className="flex my-11 gap-3 items-center justify-center md:justify-start">
            {flight.offeredAmenities.map((amenity) => (
              <div
                key={amenity._key}
                className="w-[7rem] md:w-[8rem] h-[7rem] md:h-[8rem] text-center px-2 md:px-1 bg-filllight shadow-sm shadow-textdark text-textdark rounded-lg flex flex-col items-center justify-center"
              >
                <i className={`fa-solid ${amenity.icon} text-[2.5rem]`} />
                <p className="mt-4">{amenity.amenity}</p>
              </div>
            ))}
          </div>
          <div className="text-justify text-[1.1rem]">
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
      </div>
    </div>
  );
};

export default FlightProgramDetails;
