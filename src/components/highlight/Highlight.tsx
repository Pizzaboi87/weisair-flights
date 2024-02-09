import { Flight } from "@/app/models/flight";
import Image from "next/image";
import { FC } from "react";

type Props = {
  highlightOffer: Flight;
};

const Highlight: FC<Props> = ({ highlightOffer }) => {
  return (
    <section className="flex lg:flex-row flex-col px-4 py-10 mt-4 items-center gap-12 container mx-auto">
      <div className="sm:grid gap-8 grid-cols-1">
        <div className="rounded-xl overflow-hidden h-48 mb-4 md:mb-0">
          <Image
            src={highlightOffer.coverImage.url}
            alt={highlightOffer.programName}
            width={400}
            height={400}
            className="img scale-anim"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 h-48">
          {highlightOffer.images.splice(1, 2).map((image) => (
            <div key={image._key} className="rounded-xl overflow-hidden">
              <Image
                src={image.url}
                alt={image._key}
                width={400}
                height={400}
                className="img scale-anim"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="md:py-10 lg:w-2/3 text-leftmd:px-4">
        <h3 className="font-heading mb-1">Special Offer</h3>
        <p className="font-norml text-justify">{highlightOffer.description}</p>

        <div className="flex flex-col md:flex-row md:items-end justify-between mt-5">
          <div className="flex mb-3 md:mb-0 justify-center">
            <div className="flex md:gap-3 flex-col md:items-left items-center justify-center md:mr-4">
              <p className="text-[1.25rem] lg:text-xl lg:self-start">From</p>
              <p className="md:font-bold font-semibold flex text-[3rem] xl:text-5xl">
                {highlightOffer.price}€
              </p>
            </div>
          </div>
          <button className="btn-primary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default Highlight;
