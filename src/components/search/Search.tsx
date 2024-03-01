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
    <section className="bg-gradientlight dark:bg-gradientdark px-4 py-6 2xl:mb-[10rem]">
      <div className="container mx-auto flex gap-4 flex-wrap justify-between items-center">
        <div className="search-container">
          <label className="search-label">Aircraft Type</label>
          <div className="relative">
            <select
              className="search-input capitalize"
              value={flightTypeFilter}
              onChange={handleFlightTypeChange}
            >
              <option value="all">All</option>
              <option value="airplane">Airplane Adventure</option>
              <option value="helicopter">Rotary-wing Revelry</option>
              <option value="group-plane">Group Get-Together</option>
              <option value="balloon">Balloon Bliss</option>
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
            className="search-input"
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
