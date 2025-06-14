import { ChevronRight } from "lucide-react";
import sample from "@/assets/avatar/user.png";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { Mentor } from "@/types/user";

interface MentorCardProps {
  mentor: Mentor;
}

const MobileMentorCard = ({ mentor }: MentorCardProps) => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  return (
    <div className="w-[calc(100%-1rem)] flex-shrink-0 mx-2 overflow-hidden ">
      <Link
        to={`${ROUTES.PROFESSIONALS.DETAILS(mentor._id)}`}
        className="block h-full bg-muted rounded-lg shadow-lg relative group cursor-pointer overflow-hidden transition-all duration-300 hover:drop-shadow-xl aspect-[3.5/4]"
      >
        <img
          src={
            mentor.profileImg
              ? `https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${mentor.profileImg}`
              : sample
          }
          alt="Profile"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transition-all duration-300 group-hover:from-black/80 group-hover:via-black/40">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-lg sm:text-xl font-semibold text-white line-clamp-1"
                title={`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}
              >
                {`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}
              </h2>
              <p
                className="text-gray-200 line-clamp-1 capitalize text-sm sm:text-base"
                title={mentor.mentorDetails.profession}
              >
                {mentor.mentorDetails.profession}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MobileMentorCard;