import { Mail } from "lucide-react";
import { Textarea } from "../ui/textarea";
import img from "../../assets/annan.jpg";
import { BadgeButton, InputBox } from "./InputBadge";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/button";
import useMentorRegister from "@/hooks/useMentorRegister";

interface RegisterBodyProps {
  fromRegisterPage: boolean;
}

const RegisterBody: React.FC<RegisterBodyProps> = ({
  fromRegisterPage = true,
}) => {
  const {
    mentorRegisterDetails,
    isBadgeInputVisible,
    handleShowBadgeInput,
    handleCloseBadgeInput,
    handleSaveBadgeData,
    handleRemoveBadge,
    handleInputChange,
    handleCheckboxChange,
  } = useMentorRegister();

  return (
    <div
      className={`w-full ${
        fromRegisterPage ? "mx-auto pt-25 px-10 not-sm:px-3" : ""
      }`}
    >
      <div className="relative">
        <div className="w-full h-32 bg-muted rounded-lg" />
        <div className="px-10">
          <div className="relative flex items-end not-sm:items-center not-sm:flex-col not-sm:text-center -top-12">
            <div className="w-28 h-32 rounded-md overflow-hidden mr-4 not-sm:mr-0">
              <img
                src={img}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="not-sm:mt-4">
              <h1 className="text-2xl font-semibold whitespace-nowrap">
                Cristiano Ronaldo
              </h1>
              <div className="space-y-1 mb-4">
                <div className="flex justify-start not-sm:justify-center items-center opacity-70 gap-1.5">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{mentorRegisterDetails.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="sm:mx-10 not-sm:mx-0 pt-2 pb-4 px-4 rounded-md border-1">
            <h2 className="text-md font-semibold mb-2">Personal Information</h2>
            <div className="flex flex-wrap w-full space-y-3 not-sm:space-x-3 h-full">
              <div className="sm:w-1/2 not-sm:w-full sm:pr-2">
                <Label htmlFor="first-name" className="text-xs ml-3">
                  First Name
                </Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="Enter first name"
                  value={mentorRegisterDetails.firstName}
                  onChange={(e) => handleInputChange(e, "firstName")}
                  className="hover:bg-muted transition-colors duration-300 mt-1"
                />
              </div>
              <div className="sm:w-1/2 not-sm:w-full sm:pl-2">
                <Label htmlFor="last-name" className="text-xs ml-3">
                  Last Name
                </Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Enter last name"
                  value={mentorRegisterDetails.secondName}
                  onChange={(e) => handleInputChange(e, "secondName")}
                  className="hover:bg-muted transition-colors duration-300 mt-1"
                />
              </div>
              <div className="sm:w-1/2 not-sm:w-full sm:pr-2">
                <Label htmlFor="email" className="text-xs ml-3">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={mentorRegisterDetails.email}
                  readOnly
                  className="shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none cursor-not-allowed mt-1"
                />
              </div>
              <div className="sm:w-1/2 not-sm:w-full sm:pl-2">
                <Label htmlFor="phone" className="text-xs ml-3">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={mentorRegisterDetails.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                  className="hover:bg-muted transition-colors duration-300 mt-1"
                />
              </div>
              <div className="sm:w-1/2 not-sm:w-full sm:pr-2">
                <Label htmlFor="profession">Profession</Label>
                <Input
                  id="profession"
                  type="text"
                  placeholder="Enter profession"
                  value={mentorRegisterDetails.profession}
                  onChange={(e) => handleInputChange(e, "profession")}
                  className="hover:bg-muted transition-colors duration-300 mt-1"
                />
              </div>
            </div>
          </div>

          <div className="mx-10 not-sm:mx-0 pt-2 pb-4 px-4 rounded-md hover:bg-muted border-1 transition-colors duration-300">
            <h2 className="text-md font-semibold mb-2">About</h2>
            <Textarea
              className="p-0 max-h-40 resize-none border-none shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none custom-scrollbar"
              placeholder="Enter about section"
              value={mentorRegisterDetails.about}
              onChange={(e) => handleInputChange(e, "about")}
            />
          </div>
          <div className="flex not-sm:flex-wrap w-full space-y-3 space-x-3 h-full items-stretch">
            <div className="ml-10 not-sm:ml-0 pt-2 pb-4 px-4 rounded-md border sm:w-1/2 not-sm:w-full h-full">
              <h2 className="text-md font-semibold mb-2">Skills & Expertise</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {mentorRegisterDetails.skills.map(
                  (skill: string, index: number) => (
                    <Badge
                      content={skill}
                      key={index}
                      showCrossIcon={true}
                      onCrossClick={() => handleRemoveBadge(index, "skills")}
                    />
                  )
                )}
                {isBadgeInputVisible.forSkill ? (
                  <InputBox
                    onSave={(content) => handleSaveBadgeData(content, "skills")}
                    onClose={handleCloseBadgeInput}
                  />
                ) : (
                  <BadgeButton
                    onClick={() => handleShowBadgeInput("forSkill")}
                  />
                )}
              </div>
            </div>
            <div className="mr-10 not-sm:mr-0  pt-2 pb-4  px-4 rounded-md border sm:w-1/2 not-sm:w-full h-full">
              <h2 className="text-md font-semibold mb-2">Languages</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {mentorRegisterDetails.languages.map(
                  (language: string, index: number) => (
                    <Badge
                      content={language}
                      key={index}
                      showCrossIcon={true}
                      onCrossClick={() => handleRemoveBadge(index, "languages")}
                    />
                  )
                )}
                {isBadgeInputVisible.forLanguage ? (
                  <InputBox
                    onSave={(content) =>
                      handleSaveBadgeData(content, "languages")
                    }
                    onClose={handleCloseBadgeInput}
                  />
                ) : (
                  <BadgeButton
                    onClick={() => handleShowBadgeInput("forLanguage")}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="mx-10 not-sm:mx-0 pt-2 pb-4 px-4 rounded-md border-1"
            hidden={!fromRegisterPage}
          >
            <h2 className="text-md font-semibold mb-2">Terms and Conditions</h2>
            <div className="space-y-2 mt-4">
              <p className="text-xs opacity-70">
                By agreeing, you acknowledge that you have read and understood
                our terms.
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={mentorRegisterDetails.termsAndConditions}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "termsAndConditions")
                  }
                  className="cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm font-medium">
                  I agree to the Terms and Conditions
                </label>
              </div>
              <p className="text-xs opacity-70">
                Your data will be processed in accordance with our privacy
                policy.
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={mentorRegisterDetails.privacyAndPolicy}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(checked, "privacyAndPolicy")
                  }
                  className="cursor-pointer"
                />
                <label htmlFor="policy" className="text-sm font-medium">
                  I agree to the Privacy Policy
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 sm:px-10 not-sm:justify-center">
            <Button
              variant="outline"
              onClick={() =>
                console.log("mention details is", mentorRegisterDetails)
              }
              className="border-red-500 text-red-500 hover:text-red-600"
            >
              {fromRegisterPage ? "Discard and Cancel" : "Discard"}
            </Button>
            <Button
              onClick={() =>
                console.log("mention details is", mentorRegisterDetails)
              }
              className="bg-primary"
            >
              {fromRegisterPage ? "Save and Verify" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterBody;
