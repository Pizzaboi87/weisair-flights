import { Flight } from "@/models/models";
import { FC } from "react";
import OfferGallery from "../offer-gallery/OfferGallery";
import OfferPanel from "../offer-panel/OfferPanel";

type Props = {
  highlightOffer: Flight;
};

const Highlight: FC<Props> = ({ highlightOffer }) => {
  return (
    <section className="flex lg:flex-row flex-col px-4 py-10 md:mt-20 items-center gap-12 container mx-auto">
      <OfferGallery
        url={highlightOffer.coverImage.asset.url}
        alt={highlightOffer.programName}
        images={highlightOffer.images}
      />

      <OfferPanel flight={highlightOffer} isSpecial={true} />
    </section>
  );
};

export default Highlight;
