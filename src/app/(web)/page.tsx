import PageSearch from "@/components/page-search/PageSearch";
import NewsLetter from "@/components/newsletter/Newsletter";
import Highlight from "@/components/highlight/Highlight";
import Gallery from "@/components/gallery/Gallery";
import Hero from "@/components/hero/Hero";
import { getHighlightedProgram } from "@/libs/apis";

const Home = async () => {
  const highlightedFlight = await getHighlightedProgram();

  return (
    <div className="py-24 2xl:mt-[6rem]">
      <Hero />
      <PageSearch />
      <Highlight highlightOffer={highlightedFlight} />
      <Gallery />
      <NewsLetter />
    </div>
  );
};

export default Home;
