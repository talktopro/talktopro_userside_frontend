import MentorCard from "@/components/MentorCard";

const AllProfessionalsPage = () => {
  return (
      <div className="flex flex-wrap justify-center gap-7  px-10 pt-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
          return (
            <MentorCard />
          );
        })}
      </div>
  );
};

export default AllProfessionalsPage;
