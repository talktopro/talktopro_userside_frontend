import MentorCard from "@/components/MentorCard";

const AllProfessionalsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 px-10 py-20">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <MentorCard key={index} />
      ))}
    </div>

  );
};

export default AllProfessionalsPage;
