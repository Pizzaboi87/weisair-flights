import UserImage from "../user-image/UserImage";
import { ImExit } from "react-icons/im";
import { User } from "@/models/models";
import { FC } from "react";

type Props = {
  userData: User;
  signOutUser: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reFetchUserData: () => Promise<User | undefined>;
};

const UserBox: FC<Props> = ({
  userData,
  reFetchUserData,
  signOutUser,
  setIsOpen,
}) => {
  return (
    <div className="w-full md:col-span-5 lg:col-span-4 shadow-lg h-fit self-start md:sticky top-10 bg-gradientlight dark:bg-gradientdark rounded-lg px-6 py-4">
      <div className="md:w-32 w-36 md:h-32 h-36 mx-auto rounded-full overflow-hidden">
        <UserImage userData={userData} reFetchUserData={reFetchUserData} />
      </div>
      <div className="font-normal py-4 flex flex-col gap-3">
        <span>
          <h6 className="text-xl font-bold">About Me</h6>
          <p
            className="inline text-[1rem] cursor-pointer hover:underline"
            onClick={() => setIsOpen(true)}
          >
            {userData.about}
          </p>
        </span>

        <span>
          <h6 className="text-xl font-bold">Name</h6>
          <p className="text-[1rem]">{userData.name}</p>
        </span>

        <span>
          <h6 className="text-xl font-bold">Email address</h6>
          <p className="text-[1rem]">{userData.email}</p>
        </span>

        <span>
          <h6 className="text-xl font-bold">Registration Date</h6>
          <p className="text-[1rem]">{userData._createdAt.split("T")[0]}</p>
        </span>

        <span
          className="flex w-fit mx-auto p-1 items-center justify-center gap-2 cursor-pointer mt-4"
          onClick={signOutUser}
        >
          <p className="text-[1.5rem] lg:text-[1.3rem]">Sign Out</p>
          <ImExit className="lg:text-[1.5rem] text-[2.75rem]" />
        </span>
      </div>
    </div>
  );
};

export default UserBox;
