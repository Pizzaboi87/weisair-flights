"use client";

import Image from "next/image";
import { Image as ImageType } from "@/models/models";
import { FC } from "react";

type Props = {
  url: string;
  alt: string;
  images: ImageType[];
};

const OfferGallery: FC<Props> = ({ url, alt, images }) => {
  return (
    <div className="sm:grid gap-8 grid-cols-1">
      <div className="rounded-xl overflow-hidden h-48 mb-4 md:mb-0">
        <Image
          src={url}
          alt={alt}
          width={400}
          height={400}
          className="img scale-anim"
        />
      </div>
      <div className="grid grid-cols-2 gap-8 h-48">
        {images.slice(1, 3).map((image) => (
          <div key={image.asset._id} className="rounded-xl overflow-hidden">
            <Image
              src={image.asset.url}
              alt={image.asset._id}
              width={400}
              height={400}
              className="img scale-anim"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferGallery;
