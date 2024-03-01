import { MdOutlineAlternateEmail } from "react-icons/md";
import { FC } from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaMobileAlt,
} from "react-icons/fa";
import {
  FaMapLocationDot,
  FaSquareXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

type Props = {
  isContactPage: boolean;
};

const Contacts: FC<Props> = ({ isContactPage }) => {
  return (
    <div
      className={`${
        isContactPage ? "self-center" : "self-start w-full md:w-auto mt-3"
      } flex flex-col md:flex-1 gap-4`}
    >
      <span className="flex gap-2 items-center">
        <FaMapLocationDot className="text-[1.25rem]" />
        <p>1026 Budapest, Pasaréti 129.</p>
      </span>
      <span className="flex gap-2 items-center">
        <FaMobileAlt className="text-[1.25rem]" />
        <p>+36 70 225 2256</p>
      </span>
      <span className="flex gap-2 items-center">
        <MdOutlineAlternateEmail className="text-[1.25rem]" />
        <p>contact@weisair.hu</p>
      </span>
      <span
        className={`${
          isContactPage
            ? "justify-between self-center w-full"
            : "gap-4 justify-between md:justify-start"
        } flex text-[2.3rem]`}
      >
        <div className="contact-icon">
          <FaFacebookSquare />
        </div>
        <div className="contact-icon">
          <FaSquareXTwitter />
        </div>
        <div className="contact-icon">
          <FaLinkedin />
        </div>
        <div className="contact-icon">
          <FaInstagramSquare />
        </div>
      </span>
    </div>
  );
};

export default Contacts;
