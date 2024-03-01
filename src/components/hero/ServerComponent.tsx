import Image from "next/image";
import Link from "next/link";

export const heading = (
  <>
    <h1 className="font-heading mb-6 xl:-mt-12 ml-2 md:ml-0">
      Explore Our Fleet
    </h1>
    <p className="text-textdark dark:text-textlight mb-8 max-w-lg font-normal ml-2 md:ml-0">
      Elevate your senses and discover the enchanting beauty of Hungary, from
      the sky.
    </p>
    <Link href="/flights" className="btn-primary ml-2 md:ml-0">
      Get Started
    </Link>
  </>
);

export const images = (
  <div className="md:grid hidden gap-8 grid-cols-1">
    <div className="rounded-2xl overflow-hidden h-54">
      <Image
        src="/images/balloon_04.webp"
        alt="hero-1"
        width={600}
        height={600}
        className="img scale-anim"
      />
    </div>

    <div className="grid grid-cols-2 gap-8 h-48">
      <div className="rounded-2xl overflow-hidden">
        <Image
          src="/images/heli_03.webp"
          alt="hero-2"
          width={400}
          height={400}
          className="img scale-anim"
        />
      </div>

      <div className="rounded-2xl overflow-hidden">
        <Image
          src="/images/plane_01.webp"
          alt="hero-3"
          width={400}
          height={400}
          className="img scale-anim"
        />
      </div>
    </div>
  </div>
);
