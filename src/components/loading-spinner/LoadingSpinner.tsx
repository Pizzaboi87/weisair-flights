import { FC } from "react";

type Props = {
  otherClass: string;
};

const LoadingSpinner: FC<Props> = ({ otherClass }) => {
  return (
    <div
      className={`${otherClass} border-4 border-solid rounded-full animate-spin duration-1200 ease-in-out infinite`}
      style={{ borderColor: "#14213d #14213d #fca311 #14213d" }}
    />
  );
};

export default LoadingSpinner;
