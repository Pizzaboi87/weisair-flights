import { Flight } from "@/app/models/flight";
import Image from "next/image";
import { FC } from "react";

type Props = {
  highlightOffer: Flight;
};

const Highlight: FC<Props> = ({ highlightOffer }) => {
  return (
    <section className="flex md:flex-row flex-col px-4 py-10 items-center gap-12 container mx-auto">
      <div className="md:grid gap-8 grid-cols-1">
        <div className="rounded-xl overflow-hidden h-48 mb-4 md:mb-0">
          <Image
            src={highlightOffer.coverImage.url}
            alt={highlightOffer.programName}
            width={400}
            height={400}
            className="img scale-anim"
          />
        </div>
      </div>
    </section>
  );
};

export default Highlight;
