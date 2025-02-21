import { useState } from "react";
import { IMentorRegisterDetails } from "@/interfaces/mentor";

interface IbadgeVisibility {
  forSkill: boolean;
  forLanguage: boolean;
}

type IshowBadgeInput = "forSkill" | "forLanguage";
type BadgeType = "skills" | "languages";

const useMentorRegister = () => {
  const [mentorRegisterDetails, setMentorRegisterDetails] =
    useState<IMentorRegisterDetails>({
      firstName: "",
      secondName: "",
      phone: "",
      profession: "",
      about: "",
      email: "suuuiiiiiiiiiiiii@gmail.com",
      languages: [],
      skills: [],
      privacyAndPolicy: false,
      termsAndConditions: false,
    });

  const [isBadgeInputVisible, setIsBadgeInputVisible] =
    useState<IbadgeVisibility>({
      forSkill: false,
      forLanguage: false,
    });

  const handleShowBadgeInput = (type: IshowBadgeInput) => {
    setIsBadgeInputVisible((prev) => ({ ...prev, [type]: true }));
  };

  const handleSaveBadgeData = (content: string, type: BadgeType): void => {
    if (content.trim() !== "") {
      setMentorRegisterDetails((prev) => ({
        ...prev,
        [type]: [...prev[type], content],
      }));
    }
    setIsBadgeInputVisible({ forSkill: false, forLanguage: false });
  };

  const handleCloseBadgeInput = (): void => {
    setIsBadgeInputVisible({ forSkill: false, forLanguage: false });
  };

  const handleRemoveBadge = (index: number, type: BadgeType): void => {
    setMentorRegisterDetails((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof IMentorRegisterDetails
  ): void => {
    setMentorRegisterDetails((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleCheckboxChange = (
    checked: boolean | "indeterminate",
    field: "privacyAndPolicy" | "termsAndConditions"
  ): void => {
    setMentorRegisterDetails((prev) => ({
      ...prev,
      [field]: checked as boolean,
    }));
  };

  return {
    mentorRegisterDetails,
    isBadgeInputVisible,
    handleShowBadgeInput,
    handleSaveBadgeData,
    handleCloseBadgeInput,
    handleRemoveBadge,
    handleInputChange,
    handleCheckboxChange,
  };
};

export default useMentorRegister;
