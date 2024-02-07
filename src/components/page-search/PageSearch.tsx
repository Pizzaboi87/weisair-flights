"use client";

import { useState } from "react";
import Search from "../search/Search";

const PageSearch = () => {
  const [flightTypeFilter, setFlightTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mt-24">
      <Search
        flightTypeFilter={flightTypeFilter}
        searchQuery={searchQuery}
        setFlightTypeFilter={setFlightTypeFilter}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default PageSearch;
