import { selectAuth } from '@/redux/slices/authSlice';
import { IBookingSchedule, ISocketResponse } from '@/types/mentor';
import convert24To12HourRange from '@/utils/convertTo12HourFormat';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const useSocketHandler = () => {
  const { user } = useSelector(selectAuth);

  const handleNewBookingSlotChange = (socketData: ISocketResponse, setAllocatedSlots: React.Dispatch<React.SetStateAction<IBookingSchedule>>) => {
    if (socketData.role === "mentor" && socketData.data.recieverId === user?.id) {
      if (!socketData.data?.bookingDetails) return;

      const formatedDate = format(socketData.data.bookingDetails.slot.date, "dd-MM-yyyy");
      const formatedSlot = convert24To12HourRange(socketData.data.bookingDetails.slot.time);

      setAllocatedSlots((prev: IBookingSchedule) => {
        const newSlots = { ...prev };
        if (newSlots[formatedDate][formatedSlot]) {
          newSlots[formatedDate][formatedSlot] = { isBooked: "booked" };
        }
        return newSlots;
      });
    }
  };

  return {
    handleNewBookingSlotChange,
  };
};

export default useSocketHandler;