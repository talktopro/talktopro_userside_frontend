import { ITableListMentor } from "@/interfaces/admin";
import { Star } from "lucide-react";
import { FC } from "react";
import { Badge } from "../common/Badge";

interface IMentorProfileDrawerProps {
  mentor: ITableListMentor;
}
const MentorProfileDrawer: FC<IMentorProfileDrawerProps> = ({ mentor }) => {
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;

  return (
    <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="w-full p-5 flex flex-col items-center">
        <div className="w-[10rem] aspect-[3.5/4] mb-4">
          <img
            src={`https://${bucketName}.s3.amazonaws.com/${mentor.profileImg}`}
            alt="Mentor profile"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        {/* Name - Centered below image */}
        <h1 className="text-2xl font-bold text-center">
          {`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}
        </h1>

        {/* Profession - Centered below name */}
        <p className="opacity-70 text-center mt-1">
          {mentor.mentorDetails.profession}
        </p>
        <div className="flex items-center">
          {Array(Math.floor(mentor.mentorDetails.rating))
            .fill(0)
            .map((_, index) => (
              <Star
                className="text-yellow-400"
                fill="#f6e05e"
                size={18}
                key={index}
              />
            ))}
        </div>

        {/* Specializations */}
        <div className="mt-6 w-full max-w-6xl">
          <h2 className="text-lg font-semibold">Specializations</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {mentor.mentorDetails.skills?.map((content, key) => (
              <Badge content={content} key={key} />
            ))}
          </div>
        </div>

        <hr className="w-full my-6" />

        {/* About Section */}
        <div className="w-full max-w-6xl">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="mt-2 opacity-70">
            {mentor.mentorDetails.about || "No description provided"}
          </p>
        </div>

        <hr className="w-full my-6" />

        {/* Languages Section */}
        <div className="w-full max-w-6xl">
          <h2 className="text-lg font-semibold">Languages</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {mentor.mentorDetails.languages?.map((content, key) => (
              <Badge content={content} key={key} />
            ))}
          </div>
        </div>

        <hr className="w-full my-6" />

        {/* Skills Section */}
        <div className="w-full max-w-6xl">
          <h2 className="text-lg font-semibold">Skills & Expertise</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {mentor.mentorDetails.skills?.map((content, key) => (
              <Badge content={content} key={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileDrawer;
