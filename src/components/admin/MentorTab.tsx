interface IMentorTabProps {
  activeTab: "approved" | "requests";
  setActiveTab: React.Dispatch<React.SetStateAction<"approved" | "requests">>;
}

const MentorTab: React.FC<IMentorTabProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-5">
      <span
        className={`cursor-pointer transition-all duration-300 font-semibold ${
          activeTab === "approved"
            ? "opacity-100 border-b-1 border-purple-500"
            : "opacity-40"
        }`}
        onClick={() => setActiveTab("approved")}
      >
        Approved
      </span>
      <span
        className={`cursor-pointer transition-all duration-300 font-semibold ${
          activeTab === "requests"
            ? "opacity-100 border-b-1 border-purple-500"
            : "opacity-40"
        }`}
        onClick={() => setActiveTab("requests")}
      >
        Requests
      </span>
    </div>
  );
};

export default MentorTab;
