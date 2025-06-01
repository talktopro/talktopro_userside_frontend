import ananthuMohan from "@/assets/team/ananthu.jpg";
import visnuPrem from "@/assets/team/vishnu.jpg";
import abhirajTR from "@/assets/team/abhiraj.jpg";
import ashin from "@/assets/team/ashin.jpg";
import abhinav from "@/assets/team/abhinav.jpg";
import sameen from "@/assets/team/sameen.jpg";
import { ROUTES } from "@/routes/routes";

export const teamMembers = [
   {
      id: 1,
      name: "Vishnu Prem",
      handle: "vishnuprem5152@gmail.com",
      role: "Founder & CEO | Visionary Leader of Talk to Pro",
      image: visnuPrem,
   },
   {
      id: 2,
      name: "Abhiraj T R",
      handle: "abhirajtr007@gmail.com",
      role: "Backend Developer | System Architect",
      image: abhirajTR,
   },
   {
      id: 6,
      name: "Sameen K A",
      handle: "sameensameen60@gmail.com",
      role: "Team Lead | Frontend Developer",
      image: sameen,
   },
   {
      id: 3,
      name: "Ashin Joy",
      handle: "ashinjoy.contact@gmail.com",
      role: "Backend Developer | Scalable System Architect",
      image: ashin,
   },
   {
      id: 4,
      name: "Ananthu Mohan",
      handle: "ananthumohan368@gmail.com",
      role: "Backend Developer | API Specialist",
      image: ananthuMohan,
   },
   {
      id: 5,
      name: "Abhinav M",
      handle: "abhinavmanoj200@gmail.com",
      role: "UI/UX Designer | Enthusiast",
      image: abhinav,
   },
];

export const Tags: string[] = [
   "#TalkToPro",
   "#Career",
   "#RightMentor",
   "#RightPath",
];
export const Policies: { field: string, userPath: string, mentorPath: string }[] = [
   { field: "Terms & Conditions", userPath: ROUTES.TERMS_AND_CONDITION, mentorPath: ROUTES.MENTOR.TERMS_AND_CONDITION },
   { field: "Privacy Policy", userPath: ROUTES.PRIVACY_AND_POLICY, mentorPath: ROUTES.MENTOR.PRIVACY_AND_POLICY },
   { field: "Refund Policy", userPath: ROUTES.REFUND_POLICY, mentorPath: ROUTES.MENTOR.REFUND_POLICY },
   { field: "Pricing Policy", userPath: ROUTES.PRICING_POLICY, mentorPath: ROUTES.MENTOR.PRICING_POLICY },
];

export const About: { field: string, userPath: string, mentorPath: string }[] = [
   { field: "Contact Us", userPath: ROUTES.CONTACT_US, mentorPath: ROUTES.MENTOR.CONTACT_US },
   { field: "About Us", userPath: ROUTES.ABOUT, mentorPath: ROUTES.MENTOR.ABOUT },
];