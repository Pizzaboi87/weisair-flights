import toast from "react-hot-toast";
import { User } from "@/models/models";
import { ChangeEvent, FC, useRef, useState } from "react";
import { RiImageEditFill } from "react-icons/ri";
import axios from "axios";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

type Props = {
  userData: User;
  reFetchUserData: () => Promise<User | undefined>;
};

const UserImage: FC<Props> = ({ userData, reFetchUserData }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeImage = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const extension = file?.name.split(".").pop();
    const validExtensions = ["jpg", "jpeg", "png", "webp", "bmp", "svg"];

    if (file && validExtensions.some((ext) => extension?.includes(ext))) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("userImage", file);

        const { data } = await axios.post("/api/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (data) reFetchUserData();
        toast.success("Profile image updated successfully");
      } catch (error) {
        console.log("Error during image update: ", error);
        toast.error("Image update was not successful");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please select a vaild image");
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div
        className="profilecontainer w-full h-full rounded-full bg-center bg-cover overflow-hidden"
        style={{
          backgroundImage: `url(${
            userData.avatar?.asset?.url ?? userData.image
          })`,
        }}
      >
        <div className="changeimage w-full h-full bg-[#ffffffbb] rounded-full flex items-center justify-center">
          {isLoading ? (
            <LoadingSpinner otherClass="w-[3rem] h-[3rem]" />
          ) : (
            <RiImageEditFill
              className="text-[3rem] cursor-pointer text-textdark"
              onClick={handleChangeImage}
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserImage;
