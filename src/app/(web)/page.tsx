import Gallery from "@/components/gallery/Gallery";
import Hero from "@/components/hero/Hero";
import NewsLetter from "@/components/newsletter/Newsletter";
import PageSearch from "@/components/page-search/PageSearch";

const Home = () => {
  return (
    <div className="py-24">
      <Hero />
      <PageSearch />
      <Gallery />
      <NewsLetter />
    </div>
  );
};

export default Home;
