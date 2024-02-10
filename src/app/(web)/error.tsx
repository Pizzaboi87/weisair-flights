"use client";

import { FC } from "react";
import { BiSolidError } from "react-icons/bi";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Error: FC<Props> = ({ error, reset }) => {
  return (
    <div className="container mx-auto h-[30rem] flex flex-col items-center justify-center">
      <span className="flex items-center gap-2 md:text-[3rem] text-[1.5rem] font-bold text-red-500">
        <BiSolidError />
        <h2>Something went wrong</h2>
        <BiSolidError />
      </span>
      <p className="md:text-[1.5rem] text-[1rem] text-textdark dark:text-textlight">
        Error: {error.message}
      </p>
      <button onClick={() => reset()} className="btn-primary mt-4">
        Try Again
      </button>
    </div>
  );
};

export default Error;
