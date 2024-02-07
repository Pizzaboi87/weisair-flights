import Gallery from "@/components/gallery/Gallery";
import Hero from "@/components/hero/Hero";
import PageSearch from "@/components/page-search/PageSearch";

const Home = () => {
  return (
    <div className="py-24">
      <Hero />
      <PageSearch />
      <Gallery />
    </div>
  );
};

export default Home;
