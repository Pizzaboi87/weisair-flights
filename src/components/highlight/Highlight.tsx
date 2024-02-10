import { Flight } from "@/models/flight";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type Props = {
  highlightOffer: Flight;
};

const Highlight: FC<Props> = ({ highlightOffer }) => {
  return (
    <section className="flex lg:flex-row flex-col px-4 py-10 md:mt-20 items-center gap-12 container mx-auto">
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

      <div className="md:py-8 py-3 lg:w-2/3 text-left px-5 bg-gradientlight dark:bg-gradientdark rounded-xl">
        <h3 className="font-heading mb-1">Special Offer</h3>
        <p className="font-norml text-justify">{highlightOffer.description}</p>

        <div className="flex flex-col xl:flex-row xl:items-end justify-around mt-5">
          <span className="flex items-center md:gap-12 justify-around">
            <div className="w-[8rem] h-[4rem] rounded-xl relative">
              <div className="w-[3rem] h-[3rem] absolute right-0 top-2 bg-red-500 rotate-[45deg] rounded-md" />
              <div className="w-[8rem] h-[4rem] absolute right-4 bg-red-500 rounded-xl" />
              <div className="w-[1rem] h-[1rem] absolute right-2 top-6 rounded-full bg-white z-10" />
              <p className="text-[2.75rem] font-bold absolute right-9 text-white">
                -{highlightOffer.discount}%
              </p>
            </div>

            <div className="flex mb-0 justify-center">
              <div className="flex flex-col items-left justify-center">
                <p className="text-[1.25rem] lg:text-xl lg:self-start">From</p>
                <p className="md:font-bold font-semibold flex text-[3rem] xl:text-5xl -mt-4 xl:-mt-1">
                  {highlightOffer.price}€
                </p>
              </div>
            </div>
          </span>

          <Link
            href={`/flights/${highlightOffer.slug.current}`}
            className="btn-tertiary"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Highlight;
