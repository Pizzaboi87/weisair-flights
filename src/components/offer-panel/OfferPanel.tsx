import DiscountTag from "../discount-tag/DiscountTag";
import Link from "next/link";
import { FC } from "react";
import { Flight } from "@/models/flight";

type Props = {
  flight: Flight;
  isSpecial: boolean;
};

const OfferPanel: FC<Props> = ({ flight, isSpecial }) => {
  const { programName, description, discount, price, slug } = flight;

  return (
    <div
      className={`${
        !isSpecial ? "md:min-h-[26rem] justify-evenly relative pt-14" : ""
      } flex flex-col md:py-9 py-3 lg:w-2/3 text-left px-5 bg-gradientlight dark:bg-gradientdark rounded-xl`}
    >
      {!isSpecial && discount > 0 ? (
        <div className="absolute -top-2 right-2">
          <DiscountTag discount={discount} isMirrored={true} />
        </div>
      ) : null}
      <h3 className="font-heading mb-1">{programName}</h3>
      <p className="font-norml text-justify">{description}</p>

      {isSpecial && (
        <div className="flex flex-col xl:flex-row xl:items-end justify-around mt-5">
          <span className="flex items-center md:gap-12 justify-around">
            <DiscountTag discount={discount} isMirrored={false} />

            <div className="flex mb-0 justify-center">
              <div className="flex flex-col items-left justify-center">
                <p className="text-[1.25rem] lg:text-xl lg:self-start">From</p>
                <p className="md:font-bold font-semibold flex text-[3rem] xl:text-5xl -mt-4 xl:-mt-1">
                  {price}€
                </p>
              </div>
            </div>
          </span>

          <Link href={`/flights/${slug.current}`} className="btn-tertiary">
            Learn More
          </Link>
        </div>
      )}
    </div>
  );
};

export default OfferPanel;
