import Image from "next/image";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-start h-screen 2xl:pt-20">
    <Image
      src={"/images/airplane.gif"}
      alt="loading..."
      width={400}
      height={400}
      className="pt-16 -ml-2 md:ml-0"
    />
    <p className="font-semibold text-[2rem] text-center -mt-12 md:ml-6">
      loading...
    </p>
  </div>
);

export default LoadingSpinner;
