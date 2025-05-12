import dummy from "@/assets/avatar/user.png";
import { Badge } from "@/components/common/Badge";
import { FC, JSX, useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import BookingCalendar from "@/components/user/BookingCalendar";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import apiClient from "@/api/axiosInstance";
import { IMentorDetailsWithSlots, IMentorProfileDetailsApiResponse } from "@/types/user";
import { Check, MessageCircleMore, Share2, Star } from "lucide-react";
import MentorProfileSkeleton from "@/components/common/skeletons/MentorProfile";
import { toast } from "sonner";
import SlotResponseConverter from "@/utils/slotResponseConverter";
import PaymentSuccess from "@/components/common/PaymentSuccess";
import CustomTooltip from "@/components/common/CustomTooltip";

const ProfessionalDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<IMentorDetailsWithSlots | null>();
  const [loading, setLoading] = useState<boolean>(!mentor);
  const bucketName = import.meta.env.VITE_S3BUCKET_NAME;
  const [showPaymentSuccess, setShowPaymentSuccess] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!mentor) {
      const fetchMentor = async () => {
        try {
          setLoading(true);
          const { data } = await apiClient.get<IMentorProfileDetailsApiResponse>(`/mentor/${id}`);
          const convertedSlots = SlotResponseConverter(data.data.slots);
          setMentor({ ...data.data, slots: convertedSlots });
        } catch (error) {
          toast.error("Failed to collect mentor details");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchMentor();
    }
  }, [id]);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      })
  };

  if (showPaymentSuccess) {
    return (
      <PaymentSuccess />
    );
  };

  interface ITriggerSlots {
    trigger: JSX.Element;
  }
  const TriggerSlots: FC<ITriggerSlots> = ({ trigger }) => {
    return (
      <Drawer>
        <DrawerTrigger>{trigger}</DrawerTrigger>
        <DrawerContent>
          <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
            <DrawerHeader>
              <DrawerTitle className="text-center mt-5">
                Select Date and Time
              </DrawerTitle>
              <DrawerDescription className="text-center">
                Choose your appointment date and time from the calendar.
              </DrawerDescription>
              <div className="flex justify-center items-center gap-2">
                <div className="w-3 h-3 bg-white border border-gray-300 rounded" />
                <span className="text-sm">Available</span>
                <div className="w-3 h-3 bg-purple-500 border border-purple-500 rounded ml-3" />
                <span className="text-sm">Selected</span>
                <div className="w-3 h-3 bg-gray-400 border border-gray-700 rounded ml-3" />
                <span className="text-sm">Not Available</span>
              </div>
              {mentor && (
                <BookingCalendar mentor={mentor} setShowPaymentSuccess={setShowPaymentSuccess} />
              )}
            </DrawerHeader>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };
  return (
    loading || !mentor ? (
      <MentorProfileSkeleton />
    ) : (
      <>
        <div className="w-full min-h-fit p-5">
          <div className="w-full block sm:flex">
            <div className="sm:min-w-[22%] max-w-[21rem] p-5 aspect-[3.5/4]">
              <img
                src={
                  mentor.profileImg
                    ? `https://${bucketName}.s3.amazonaws.com/${import.meta.env.VITE_PROFILE_IMAGE_FOLDER}/${mentor.profileImg}`
                    : dummy
                }
                alt="Mentor profile"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="w-full sm:w-[80%] sm:p-5 not-sm:py-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex gap-1">
                    <h1 className="text-2xl font-bold not-sm:mt-5">
                      {`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}
                    </h1>
                    <CustomTooltip
                      content={isCopied ? "Link copied!" : `Share ${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name} profile`}
                      trigger={
                        <button className="not-sm:mt-5" onClick={handleShareClick}>
                          {isCopied ? (
                            <Check strokeWidth={1.5} size={20} className="text-green-500" />
                          ) : (
                            <Share2 strokeWidth={1.5} size={20} />
                          )}
                        </button>
                      }
                    />
                  </div>
                  <p className="opacity-70">{mentor.mentorDetails.profession}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  <Star
                    className="text-yellow-400"
                    fill="#f6e05e"
                    size={18}
                  />
                </div>
                <span className="text-sm opacity-70 ml-2">0 Reviews</span>
              </div>
              <div className="mt-10">
                <h2 className="text-lg font-semibold">Skills & Expertise</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mentor.mentorDetails.skills.map(
                    (content: string, key: number) => (
                      <Badge content={content} key={key} />
                    )
                  )}
                </div>
              </div>
              <div className="not-sm:hidden">
                <TriggerSlots
                  trigger={
                    <div className="mt-6 flex flex-wrap gap-3 ">
                      <Button className="cursor-pointer">Book a Session</Button>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          <hr className="h-2 px-5" />
          <div className="w-full block sm:flex flex-row-reverse">
            <div className="w-full sm:w-[80%] sm:p-5 sm:px-15 not-sm:pt-4">
              <h2 className="text-lg font-semibold">
                About{" "}
                {`${mentor.mentorDetails.first_name} ${mentor.mentorDetails.last_name}`}
              </h2>
              <p className="mt-2 opacity-70">{mentor.mentorDetails.about}</p>

              <hr className="border-t my-5" />

              <h2 className="text-lg font-semibold">Languages</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {mentor.mentorDetails.languages.map(
                  (content: string, key: number) => (
                    <Badge content={content} key={key} />
                  )
                )}
              </div>

              <hr className="border-t my-5" />

              <h2 className="text-lg font-semibold">Reviews</h2>
              <div className="mt-2 flex items-center bg-muted/50 text-muted-foreground rounded-lg h-20 justify-center">
                <MessageCircleMore className="h-5 w-5 mr-2" />
                <span>No reviews found</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:hidden">
          <TriggerSlots
            trigger={
              <div className="flex py-3 w-full flex-wrap gap-3 not-sm:fixed not-sm:bottom-0 not-sm:z-10 not-sm:w-screen not-sm:bg-background not-sm:pt-3 not-sm:border-t-1 not-sm:px-4">
                <Button className="cursor-pointer w-full">Book a Session</Button>
              </div>
            }
          />
        </div>
      </>
    )
  );
};

export default ProfessionalDetailsPage;
