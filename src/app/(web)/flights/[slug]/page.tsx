"use client";

import { getFlightProgramDetails } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import FlightGallery from "@/components/flight-gallery/FlightGallery";
import OfferGallery from "@/components/offer-gallery/OfferGallery";
import OfferPanel from "@/components/offer-panel/OfferPanel";
import FlightProgramDetails from "@/components/flight-program-details/FlightProgramDetails";

const FlightDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const fetchFlight = async () => getFlightProgramDetails(slug);

  const {
    data: flight,
    error,
    isLoading,
  } = useSWR("/api/flights", fetchFlight);

  if (error || (typeof flight === "undefined" && !isLoading))
    throw new Error("Cannot fetch any data.");

  if (!flight) return <LoadingSpinner />;

  return (
    <div className="md:my-24 my-12 2xl:mt-[10rem]">
      <div className="flex lg:flex-row flex-col px-4 py-10 md:mt-20 items-center gap-12 container mx-auto">
        <OfferGallery
          url={flight.coverImage.file.asset.url}
          alt={flight.programName}
          images={flight.images}
        />
        <OfferPanel isSpecial={false} flight={flight} />
      </div>
      <FlightProgramDetails flight={flight} />
      <FlightGallery photos={flight.images} />
    </div>
  );
};

export default FlightDetails;
