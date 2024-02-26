"use client";

import Search from "../search/Search";
import { useState } from "react";

const PageSearch = () => {
  const [flightTypeFilter, setFlightTypeFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
