"use client";

import { Image as ImageType } from "@/models/models";
import Image from "next/image";
import { FC, useState } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

type Props = {
  photos: ImageType[];
};

const FlightGallery: FC<Props> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlide = (isNext: boolean) => {
    isNext
      ? setCurrentIndex((prevIndex) =>
          prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        )
      : setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center">
      <div className="h-[40rem] md:w-[75%] self-center relative">
        <Image
          src={photos[currentIndex].url}
          alt={`photo-${photos[currentIndex]}`}
          width={800}
          height={800}
          className="img"
        />
        {photos.map((photo, index) => {
          const position =
            (index - currentIndex + photos.length - 1) % photos.length;
          const offset = position * 12;

          return (
            <div
              key={photo._key}
              className="hidden md:flex cursor-pointer scale-anim hover:z-10 absolute md:top-[70%] shadow-xl w-[11rem] h-[15rem] translate-x-4 border-1 border-gray-300 transition-all duration-700 rounded-lg bg-center bg-cover"
              style={{
                backgroundImage: `url(${photo.url})`,
                right: `-${offset}rem`,
              }}
              onClick={() => setCurrentIndex(index)}
            />
          );
        })}
      </div>
      <span className="flex gap-4 mt-4 text-[2rem]">
        <BsArrowLeftSquareFill
          className="cursor-pointer scale-anim"
          onClick={() => handleSlide(false)}
        />
        <BsArrowRightSquareFill
          className="cursor-pointer scale-anim"
          onClick={() => handleSlide(true)}
        />
      </span>
      <p className="mt-1">
        {currentIndex + 1} / {photos.length}
      </p>
    </div>
  );
};

export default FlightGallery;
