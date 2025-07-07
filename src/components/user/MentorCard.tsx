import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { Mentor } from "@/types/user";
import { useState } from "react";
import SkeletonCards from "../common/skeletons/Cards";

interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard = ({ mentor }: MentorCardProps) => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const [imgLoaded, setImgLoaded] = useState(false);

  const realImgSrc = `https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${mentor.profileImg}`;

  return (
    <Link to={`${ROUTES.PROFESSIONALS.DETAILS(mentor._id)}`}>
      <div className="h-fit border p-2 rounded-lg cursor-pointer overflow-hidden transition-all duration-600">
      
        {(!imgLoaded ) && (
            <SkeletonCards
           
            />
          )}

        <img
          src={realImgSrc}
          alt="Profile"
          className="w-full h-full object-cover rounded-lg"
          onLoad={() => setImgLoaded(true)}
        />

        <div className="mt-2">
          <h3 className="font-bold">{`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}</h3>
          <p className="text-muted-foreground text-sm font-semibold">{mentor.mentorDetails.profession}</p>
        </div>

        <div className="flex justify-between items-center rounded-lg p-2 w-full bg-muted mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Experience</span>
            <span className="font-semibold text-xs">{mentor.mentorDetails.experience}+ years</span>
          </div>
          <div className="flex flex-col">
            <div className="group rounded-full hover:drop-shadow-xl flex justify-center items-center w-8 h-8 bg-background border border-muted-foreground overflow-hidden">
              <ChevronRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;
