"use client";

import FlightCard from "@/components/flight-card/FlightCard";
import Search from "@/components/search/Search";
import { getFlightProgram } from "@/libs/apis";
import { Flight } from "@/models/flight";
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

  const fetchData = async () => {
    return getFlightProgram();
  };

  const { data, error, isLoading } = useSWR("get/flightPrograms", fetchData);

  if (error || (typeof data === "undefined" && !isLoading))
    throw new Error("Cannot fetch any data.");

  const filterFlights = (flights: Flight[]) => {
    return flights.filter((flight) => {
      if (
        flightTypeFilter &&
        flightTypeFilter.toLowerCase() !== "all" &&
        flight.type.toLowerCase() !== flightTypeFilter.toLowerCase()
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

  const filteredFlights = filterFlights(data || []);

  console.log(filteredFlights);

  return (
    <div className="md:mt-20">
      <h1 className="font-subheading text-center mb-2 pt-10 pb-5">
        Search Flight Programs
      </h1>

      <Search
        flightTypeFilter={flightTypeFilter}
        searchQuery={searchQuery}
        setFlightTypeFilter={setFlightTypeFilter}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex mt-20 justify-between flex-wrap container mx-auto">
        {filteredFlights.map((flight) => (
          <FlightCard key={flight._id} flight={flight} />
        ))}
      </div>
    </div>
  );
};

export default Flights;
