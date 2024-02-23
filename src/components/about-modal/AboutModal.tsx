"use client";

import { ChangeEvent, FC, useState } from "react";
import ModalWrapper from "../modal-wrapper/ModalWrapper";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import { User } from "@/models/models";

type Props = {
  isOpen: boolean;
  defaultAbout: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUserData: () => Promise<User | undefined>;
};

const AboutModal: FC<Props> = ({
  isOpen,
  defaultAbout,
  setIsOpen,
  fetchUserData,
}) => {
  const [aboutText, setAboutText] = useState(defaultAbout);
  const [isLoading, setIsLoading] = useState(false);

  const updateAbout = async () => {
    const regex = /^[a-zA-Z0-9 ,.;:?!'\-()/@&$€"_]+$/;

    if (!aboutText.trim().length) {
      return toast.error("Please fill out the form");
    } else if (!regex.test(aboutText)) {
      return toast.error(
        "Please write valid English text with latin characters only."
      );
    } else {
      setIsLoading(true);

      try {
        const { data } = await axios.post("/api/users", {
          aboutMe: aboutText,
        });
        if (data) {
          toast.success("Change Submitted!");
          fetchUserData();
        }
      } catch (error) {
        console.log("Error while updating About Me", error);
        toast.error("Unable to update About Me");
      } finally {
        setIsLoading(false);
        setIsOpen(false);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAboutText(event.target.value);
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <form className="flex flex-col space-y-4 min-h-[10rem] w-full mb-10">
        <h1 className="font-subheading mx-auto">About Me</h1>
        <div className={`${aboutText ? "filled" : ""} container-style`}>
          <textarea
            rows={5}
            value={aboutText}
            onChange={handleChange}
            className="lightinput dark:darkinput outline-none w-full py-6 px-2"
          />
          <label className="label-style">About Me</label>
        </div>
      </form>
      {isLoading ? (
        <LoadingSpinner otherClass="h-10 w-10 mt-3" />
      ) : (
        <span className="flex items-center justify-evenly w-full mt-3">
          <button className="btn-quaternary" onClick={updateAbout}>
            Save
          </button>
          <button className="btn-quaternary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </span>
      )}
    </ModalWrapper>
  );
};

export default AboutModal;
