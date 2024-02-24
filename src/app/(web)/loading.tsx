import Image from "next/image";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-start h-screen 2xl:pt-20">
    {/*<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" />*/}
    <Image
      src={"/images/airplane.gif"}
      alt="loading..."
      width={400}
      height={400}
      className="pt-16"
    />
    <p className="font-semibold text-[2rem] text-center -mt-12 ml-6">
      loading...
    </p>
  </div>
);

export default LoadingSpinner;
