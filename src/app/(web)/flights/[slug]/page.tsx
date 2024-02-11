"use client";

import FlightGallery from "@/components/flight-gallery/FlightGallery";
import { getFlightProgramDetails } from "@/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";

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
    <div className="md:my-24 my-12">
      <FlightGallery photos={flight.images} />
    </div>
  );
};

export default FlightDetails;
