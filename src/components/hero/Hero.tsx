import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex px-4 items-center gap-12 container mx-auto">
      <div className="py-10 h-full">
        <h1 className="font-heading mb-6">Explore Our Modern Fleet</h1>
        <p className="text-textdark dark:text-textlight mb-12 max-w-lg font-normal">
          Elevate your senses and discover Hungary's enchanting beauty from the
          sky.
        </p>
        <button className="btn-primary">Get Started</button>

        <div className="flex justify-between mt-24">
          <div className="fleet-container">
            <p className="fleet-title">Airplanes</p>
            <p className="fleet-sub">6</p>
          </div>
          <div className="fleet-container">
            <p className="fleet-title">Helicopters</p>
            <p className="fleet-sub">7</p>
          </div>
          <div className="fleet-container">
            <p className="fleet-title">Balloons</p>
            <p className="fleet-sub">3</p>
          </div>
        </div>
      </div>

      <div className="md:grid hidden gap-8 grid-cols-1">
        <div className="rounded-2xl overflow-hidden h-54">
          <Image
            src="/images/balloon_04.webp"
            alt="hero-1"
            width={300}
            height={300}
            className="img scale-anim"
          />
        </div>

        <div className="grid grid-cols-2 gap-8 h-48">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/heli_03.webp"
              alt="hero-2"
              width={300}
              height={300}
              className="img scale-anim"
            />
          </div>

          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/plane_01.webp"
              alt="hero-3"
              width={300}
              height={300}
              className="img scale-anim"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
