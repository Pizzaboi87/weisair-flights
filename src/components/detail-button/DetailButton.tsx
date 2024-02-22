import { FC } from "react";

type Props = {
  detailIcon: string;
  detailText: string;
};

const DetailButton: FC<Props> = ({ detailIcon, detailText }) => {
  return (
    <span className="w-[6rem] md:w-[7rem] lg:w-[7.5rem] h-[6rem] md:h-[7rem] lg:h-[7.5rem] text-center px-1 bg-gradientgold dark:bg-gradientgrey shadow-sm shadow-textdark text-textdark rounded-lg flex flex-col items-center justify-center">
      <i className={`fa-solid ${detailIcon} text-[2.5rem]`} />
      <p className="mt-4 text-[0.85rem] lg:text-[1.1rem]">{detailText}</p>
    </span>
  );
};

export default DetailButton;
