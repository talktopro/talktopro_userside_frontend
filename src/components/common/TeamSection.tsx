import { teamMembers } from "@/constants/footerData"
import { Avatar, AvatarImage } from "../ui/avatar";

const TeamSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-5 mt-15">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">Our Team</h2>
        <div className="w-20 sm:w-24 h-1 bg-purple-600 mx-auto"></div>
      </div>
      <p className="text-center text-muted-foreground mb-12">
        These people work on making our product the best.
      </p>

      <div className="flex gap-2 not-sm:gap-1 flex-wrap justify-center">
        {teamMembers.map((member) => (
          <div className="flex border w-sm rounded-sm p-3 gap-3 hover:bg-muted transition-colors">
            <div className="flex items-center">
              <Avatar className="rounded-sm">
                <AvatarImage src={member.image} />
              </Avatar>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="font-semibold text-sm mb-1">
                {member.name}
              </h3>
              <p className="text-sm not-sm:text-xs text-muted-foreground">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;