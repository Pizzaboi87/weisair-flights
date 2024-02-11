"use client";

import { Image as ImageType } from "@/models/flight";
import Image from "next/image";
import { FC, useState } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

type Props = {
  photos: ImageType[];
};

const FlightGallery: FC<Props> = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setShowModal(true);
  };

  const handleSlide = (isNext: boolean) => {
    isNext
      ? setCurrentPhotoIndex((prevIndex) =>
          prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        )
      : setCurrentPhotoIndex((prevIndex) =>
          prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
  };

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 relative gap-5 px-3">
        <div className="h-[25rem] relative rounded-xl overflow-hidden">
          <div className="hidden md:flex justify-center items-center w-full h-full">
            <Image
              src={photos[0].url}
              alt={`Flight Photo ${currentPhotoIndex + 1}`}
              width={600}
              height={600}
              className="img scale-anim cursor-pointer"
              onClick={openModal.bind(this, 0)}
            />
          </div>
          <div className="md:hidden flex justify-center items-center w-full h-full">
            <Image
              src={photos[currentPhotoIndex].url}
              alt={`Flight Photo ${currentPhotoIndex + 1}`}
              width={400}
              height={400}
              className="img"
              onClick={openModal.bind(this, 0)}
            />
          </div>
        </div>
        <div className="md:hidden flex justify-between items-center">
          <div className="flex space-x-2 text-[2.25rem]">
            <BsArrowLeftSquareFill onClick={() => handleSlide(false)} />
            <BsArrowRightSquareFill onClick={() => handleSlide(true)} />
          </div>
          <span className="text-[1.75rem]">
            {currentPhotoIndex + 1} / {photos.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlightGallery;
