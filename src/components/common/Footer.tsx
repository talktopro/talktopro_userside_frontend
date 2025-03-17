import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { teamMembers, About, Learning, Products } from "@/constants/footerData";

const Footer = () => {
  return (
    <footer className="border-t-1 mt-10 not-sm:mb-10">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex flex-wrap justify-around">
          <div className="space-y-4 sm:mx-10 not-sm:mx-4 mt-10">
            <h3 className="font-medium">Product</h3>
            <ul className="space-y-3">
              {Products.map((item: string, index: number) => (
                <li key={index}>
                  <a className="text-muted-foreground hover:text-foreground text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:mx-10 not-sm:mx-4 mt-10">
            <h3 className="font-medium">Learning</h3>
            <ul className="space-y-3">
              {Learning.map((item: string, index: number) => (
                <li key={index}>
                  <a className="text-muted-foreground hover:text-foreground text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:mx-10 not-sm:mx-4 mt-10">
            <h3 className="font-medium">About</h3>
            <ul className="space-y-3 flex flex-col items-start">
              {About.map((item: string, index: number) => (
                <li key={index}>
                  <a className="text-muted-foreground hover:text-foreground text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 mx-10 mt-10 relative">
            <h3 className="font-medium text-center">Team</h3>
            <ul className="grid grid-cols-6 md:grid-cols-3 gap-3">
              {teamMembers.map((member) => (
                <li key={member.id} className="relative">
                  <HoverCard>
                    <HoverCardTrigger>
                      <Avatar>
                        <AvatarImage src={member.image} />
                      </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent style={{ width: "auto" }}>
                      <div className="flex items-start">
                        <Avatar>
                          <AvatarImage src={member.image} />
                        </Avatar>
                        <div className="ml-3">
                          <h4 className="font-bold text-sm">{member.name}</h4>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {member.handle}
                          </p>
                        </div>
                      </div>
                      <p className="my-2 text-sm">{member.role}</p>
                    </HoverCardContent>
                  </HoverCard>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="opacity-80 p-10 flex justify-center items-center">
        <div>
          <p className="text-sm text-center">
            Copyright &copy; {new Date().getFullYear()} All rights reserved by{" "}
            <span className="font-semibold whitespace-nowrap">Talk to pro</span>
          </p>
          <div className="flex gap-3 justify-center items-center mt-4">
            <IoLogoWhatsapp
              size={20}
              className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
            />
            <AiFillInstagram
              size={20}
              className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
            />
            <FaFacebookF
              size={18}
              className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
            />
            <FaYoutube
              size={20}
              className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
