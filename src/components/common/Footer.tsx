import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { About, Policies, Tags } from "@/constants/footerData";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  return (
    <footer className="border-t-1 mt-10 not-sm:mb-10">
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex flex-wrap justify-around">

          <div className="space-y-4 sm:mx-10 not-sm:mx-4 mt-10">
            <h3 className="font-medium text-center">Policies</h3>
            <ul className="space-y-3 text-center">
              {Policies.map((item: { field: string, userPath: string, mentorPath: string }, index: number) => (
                <li key={index} onClick={() => navigate(pathName.startsWith("/mentor") ? item.mentorPath : item.userPath)}>
                  <a className="text-muted-foreground hover:text-foreground text-sm cursor-pointer">
                    {item.field}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:mx-10 not-sm:mx-4 mt-10">
            <h3 className="font-medium text-center">Tags</h3>
            <ul className="space-y-3 text-center">
              {Tags.map((item: string, index: number) => (
                <li key={index}>
                  <a className="text-muted-foreground hover:text-foreground text-sm cursor-default">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:mx-10 not-sm:mx-4 mt-10">
            <h3 className="font-medium text-center">About</h3>
            <ul className="space-y-3 flex flex-col text-center">
              {About.map((item: { field: string, userPath: string, mentorPath: string }, index: number) => (
                <li key={index} onClick={() => navigate(pathName.startsWith("/mentor") ? item.mentorPath : item.userPath)}>
                  <a className="text-muted-foreground hover:text-foreground text-sm cursor-pointer">
                    {item.field}
                  </a>
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
            <Link to="https://x.com/VishnuPrem_" target="_blank" rel="noopener noreferrer">
              <FaTwitter
                size={19}
                className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
              />
            </Link>
            <Link
              to="https://www.instagram.com/talktopro.in?utm_source=ig_web_button_share_sheet&igsh=eGN1Ym9rbjB1dzJk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram
                size={20}
                className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
              />
            </Link>
            <FaFacebookF
              size={18}
              className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
            />
            <Link to="https://www.youtube.com/@TalkToPro" target="_blank" rel="noopener noreferrer">
              <FaYoutube
                size={20}
                className="cursor-pointer hover:text-purple-500 transition-colors duration-300"
              />
            </Link>
          </div>
          <p className="text-xs text-center mt-2">
            Version 1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
