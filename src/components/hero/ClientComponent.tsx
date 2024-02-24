"use client";

import { FC } from "react";
import CountUpNumber from "../count-up-number/CountUpNumber";

type Props = {
  heading: React.ReactNode;
  images: React.ReactNode;
};

const ClientComponent: FC<Props> = (props) => {
  const { heading, images } = props;

  return (
    <section className="flex px-4 items-center justify-center xl:gap-20 gap-12 md:container mx-auto">
      <div className="h-full">
        {heading}

        <div className="flex justify-between mt-16">
          <div className="fleet-container">
            <p className="fleet-title">Airplanes</p>
            <CountUpNumber duration={1000} endValue={14} />
          </div>
          <div className="fleet-container">
            <p className="fleet-title">Helicopters</p>
            <CountUpNumber duration={1000} endValue={8} />
          </div>
          <div className="fleet-container">
            <p className="fleet-title">Balloons</p>
            <CountUpNumber duration={1000} endValue={12} />
          </div>
        </div>
      </div>

      {images}
    </section>
  );
};

export default ClientComponent;
