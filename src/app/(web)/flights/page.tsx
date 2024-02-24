"use client";

import FlightCard from "@/components/flight-card/FlightCard";
import Search from "@/components/search/Search";
import { getFlightProgram } from "@/libs/apis";
import { Flight } from "@/models/models";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Flights = () => {
  const [flightTypeFilter, setFlightTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery");
    const flightType = searchParams.get("flightType");

    if (flightType) setFlightTypeFilter(flightType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, [searchParams]);

  const { data: flightProgramData, error: flightProgramError } = useSWR(
    "get/flightPrograms",
    getFlightProgram
  );

  if (flightProgramError) throw new Error("Cannot fetch any data.");

  const filterFlights = (flights: Flight[]) => {
    return flights.filter((flight) => {
      if (
        flightTypeFilter &&
        flightTypeFilter.toLowerCase() !== "all" &&
        flight.type.slug.current.toLowerCase() !==
          flightTypeFilter.toLowerCase()
      ) {
        return false;
      }

      if (
        searchQuery &&
        !flight.programName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredFlights = filterFlights(
    Array.isArray(flightProgramData) ? flightProgramData : []
  );

  return (
    <div className="md:mt-20 2xl:mt-[10rem]">
      <h1 className="font-subheading text-center mb-2 pt-10 pb-5">
        Search Flight Programs
      </h1>

      <Search
        flightTypeFilter={flightTypeFilter}
        searchQuery={searchQuery}
        setFlightTypeFilter={setFlightTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex mt-20 justify-evenly lg:gap-12 flex-wrap container mx-auto">
        {filteredFlights.map((flight) => (
          <FlightCard key={flight._id} flight={flight} />
        ))}
      </div>
    </div>
  );
};

export default Flights;
