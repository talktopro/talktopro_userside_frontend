interface IMentorTabProps {
  activeTab: "approved" | "requests" | "reject";
  changeTab: (value: "approved" | "requests" | "reject") => void;
  isLoading: boolean;
}

const MentorTab: React.FC<IMentorTabProps> = ({
  activeTab,
  changeTab,
  isLoading,
}) => {
  return (
    <div className="flex gap-5">
      <span
        className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"
          } transition-all duration-300 font-semibold ${activeTab === "approved"
            ? "opacity-100 border-b-1 border-purple-500"
            : "opacity-40"
          }`}
        onClick={() =>
          !isLoading && activeTab !== "approved" && changeTab("approved")
        }
      >
        Approved
      </span>
      <span
        className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"
          } transition-all duration-300 font-semibold ${activeTab === "requests"
            ? "opacity-100 border-b-1 border-purple-500"
            : "opacity-40"
          }`}
        onClick={() =>
          !isLoading && activeTab !== "requests" && changeTab("requests")
        }
      >
        Requests
      </span>
      <span
        className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"
          } transition-all duration-300 font-semibold ${activeTab === "reject"
            ? "opacity-100 border-b-1 border-purple-500"
            : "opacity-40"
          }`}
        onClick={() =>
          !isLoading && activeTab !== "reject" && changeTab("reject")
        }
      >
        Rejected
      </span>
    </div>
  );
};

export default MentorTab;
