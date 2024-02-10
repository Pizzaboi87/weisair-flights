"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";

type Props = {
  flightTypeFilter: string;
  searchQuery: string;
  setFlightTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  flightTypeFilter,
  searchQuery,
  setFlightTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();

  const handleFlightTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFlightTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterClick = () => {
    router.push(
      `/flights?flightType=${flightTypeFilter}&searchQuery=${searchQuery}`
    );
  };

  return (
    <section className="bg-gradientlight dark:bg-gradientdark px-4 py-6">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="search-container">
          <label className="search-label">Flight Program</label>
          <div className="relative">
            <select
              className="search-input capitalize"
              value={flightTypeFilter}
              onChange={handleFlightTypeChange}
            >
              <option value="all">All</option>
              <option value="airplane">Airplane</option>
              <option value="helicopter">Helicopter</option>
              <option value="group">Group tour</option>
              <option value="wedding">Wedding Flight</option>
              <option value="romantic">Romantic Flight</option>
              <option value="balloon">Balloon</option>
            </select>
          </div>
        </div>

        <div className="search-container">
          <label className="search-label">Search</label>
          <input
            type="search"
            id="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="search-input placeholder:text-black"
          />
        </div>

        <button
          className="btn-secondary self-end w-full md:w-auto"
          type="button"
          onClick={handleFilterClick}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
