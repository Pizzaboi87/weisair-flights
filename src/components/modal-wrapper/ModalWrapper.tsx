import { FC } from "react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

const ModalWrapper: FC<Props> = ({ isOpen, children }) => {
  return (
    <div
      className={`${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } fixed z-[98] top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.8)] transition-all duration-500`}
    >
      <div className="fixed md:w-fit w-[95%] md:h-fit h-[80%] m-auto z-[99] inset-0 flex items-center justify-center shadow-xl bg-gradientlight dark:bg-gradientdark px-2 py-2 rounded-xl">
        <div className="shadow-inner w-full h-full shadow-black bg-filllight dark:bg-filldark px-4 py-6 rounded-xl flex flex-col items-center justify-center md:min-w-[30rem]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
