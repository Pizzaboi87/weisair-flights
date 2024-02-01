import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

const Header = () => {
  return (
    <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
      <div className="flex items-center w-full md:2/3">
        <Link href="/" className="font-black text-[#3032a3] text-[2.2rem] mt-1">
          WeisAIR
        </Link>
        <ul className="flex items-center ml-5">
          <li className="items-center">
            <Link href="/auth">
              <FaSignInAlt className="cursor-pointer text-[2rem]" />
            </Link>
          </li>
          <li className="ml-2">
            <MdDarkMode className="cursor-pointer text-[2rem]" />
          </li>
        </ul>
      </div>
      <ul className="flex items-center justify-between w-full md:w-1/3 mt-4">
        <li className="hover:-translate-y-2 duration-500 transition-all text-[1.5rem]">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all text-[1.5rem]">
          <Link href="/flights">Flights</Link>
        </li>
        <li className="hover:-translate-y-2 duration-500 transition-all text-[1.5rem]">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
