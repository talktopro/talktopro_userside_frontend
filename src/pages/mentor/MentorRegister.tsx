import AccountData from "@/components/mentor/AccountData";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import WaitingPeriod from "@/components/mentor/WaitingList";
import ApplicationRejected from "@/components/mentor/RejectedApplication";

const MentorResiterPage = () => {
  const { user } = useSelector(selectAuth);
  return (
    <>
      {user?.mentor_application_status === "Pending" &&
        user.mentorDetails?._id && (
          <WaitingPeriod
            applicationId={user.mentorDetails?._id}
            email={user.email}
            submissionDate={user.mentorDetails.createdAt}
            estimatedReviewTime={24}
          />
        )
      }
      {user?.mentor_application_status === "Rejected" &&
        user.mentorDetails?._id && (
          <ApplicationRejected
            applicationId={user.mentorDetails?._id}
            email={user.email}
            submissionDate={user.mentorDetails.createdAt}
            rejectionReason={user.mentor_rejected_reason}
          />
        )
      }
      {!user?.mentor_application_status && (
        <AccountData fromRegisterPage={true} />
      )}
    </>
  );
};

export default MentorResiterPage;
