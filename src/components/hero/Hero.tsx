import ClientComponent from "./ClientComponent";
import { heading, images } from "./ServerComponent";

const Hero = () => {
  return <ClientComponent heading={heading} images={images} />;
};

export default Hero;
