"use client";

import { FC } from "react";

type Props = {
  discount: number;
  isMirrored: boolean;
};

const DiscountTag: FC<Props> = ({ discount, isMirrored }) => {
  return (
    <div className="w-[8rem] h-[4rem] rounded-xl relative">
      <div
        className={`${
          isMirrored ? "left-0" : "right-0"
        } w-[3rem] h-[3rem] absolute top-2 bg-red-500 rotate-[45deg] rounded-md`}
      />
      <div
        className={`${
          isMirrored ? "left-4" : "right-4"
        } w-[8rem] h-[4rem] absolute bg-red-500 rounded-xl`}
      />
      <div
        className={`${
          isMirrored ? "left-2" : "right-2"
        } w-[1rem] h-[1rem] absolute top-6 rounded-full bg-white z-10`}
      />
      <p
        className={`${
          isMirrored ? "left-9" : "right-9"
        } text-[2.75rem] font-bold absolute text-white`}
      >
        -{discount}%
      </p>
    </div>
  );
};

export default DiscountTag;
