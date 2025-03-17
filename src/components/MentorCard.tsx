import { ChevronRight } from "lucide-react";
import sample from "../assets/sampleProfessionalImage.jpg";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export interface Mentor {
  _id: string;
  uname: string;
  email: string;
  phone: number;
  isMentor: boolean;
  mentor_application_status: string;
  __v: number;
  refreshToken: string;
  mentorDetails: MentorDetails;
}

export interface MentorDetails {
  first_name: string;
  last_name: string;
  profession: string;
  about: string;
  skills: string[];
  languages: string[];
  _id: string;
}

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  return (
    <Link
      to={`${ROUTES.PROFESSIONALS.DETAILS(mentor._id)}`}
      state={{ mentor }}
      className="max-w-[280px] min-w-[280px] h-fit rounded-lg bg-white shadow-lg relative group cursor-pointer overflow-hidden transition-all duration-600 hover:drop-shadow-xl hover:bg-black/10"
    >
      <img src={sample} alt="Profile" className="w-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transition-all duration-300 group-hover:from-black/80 group-hover:via-black/40">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white line-clamp-1">{`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}</h2>
            <p className="text-gray-200 line-clamp-1">
              {mentor.mentorDetails.profession}
            </p>
            <div className="flex items-center mt-1">
              <svg
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L14.8 8.5L22 9.3L17 14.2L18.5 21.4L12 18L5.5 21.4L7 14.2L2 9.3L9.2 8.5L12 2Z" />
              </svg>
              <span className="ml-1 text-white">4.5</span>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;
