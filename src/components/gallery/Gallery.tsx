import Image from "next/image";
import { FC } from "react";

type Props = {
  imghref: string;
  lg: boolean;
};

const ImageWrapper: FC<Props> = ({ imghref, lg }) => {
  return (
    <div className={`${lg ? "w-full" : "w-1/2"} p-1 md:p-2 h-48`}>
      <Image
        alt="gallery"
        className="img"
        src={imghref}
        width={400}
        height={400}
      />
    </div>
  );
};

const Gallery = () => {
  return (
    <div className="mx-auto container py-24 h-full">
      <div className="flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <ImageWrapper imghref="/images/romantic_02.webp" lg={false} />
          <ImageWrapper imghref="/images/heli_05.webp" lg={false} />
          <ImageWrapper imghref="/images/heli_in_02.webp" lg={true} />
        </div>

        <div className="flex w-1/2 flex-wrap">
          <ImageWrapper imghref="/images/arial_view_08.webp" lg={true} />
          <ImageWrapper imghref="/images/plane_03.webp" lg={false} />
          <ImageWrapper imghref="/images/balloon_guest_01.webp" lg={false} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
