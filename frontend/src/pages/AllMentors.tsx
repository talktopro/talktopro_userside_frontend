import MentorCard from "@/components/MentorCard";
import Footer from "@/components/Footer";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

const AllMentors = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-wrap justify-center gap-7 pt-10 px-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
          return (
            <div onClick={() => navigate(`${ROUTES.MENTOR_DETAILS}`)}>
              <MentorCard />
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default AllMentors;
