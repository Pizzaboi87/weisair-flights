import { FC, useEffect, useState } from "react";

type Props = {
  endValue: number;
  duration: number;
};

const CountUpNumber: FC<Props> = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const updateCount = (timeStamp: number) => {
      if (!startTime) startTime = timeStamp;
      const progress = timeStamp - startTime;

      if (progress < duration) {
        setCount(Math.min(endValue, (progress / duration) * endValue));
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, duration]);

  return <p className="fleet-sub">{Math.round(count)}</p>;
};

export default CountUpNumber;
