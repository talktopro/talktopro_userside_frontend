import { AxiosError } from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { changeTokenExpiry } from "@/redux/slices/authSlice";

const useErrorHandler = () => {
  const dispatch = useDispatch();

  const handleError = (
    error: AxiosError | any,
    message: string = "Something went wrong, Please try again later!",
  ) => {
    if (error.status === 401 || error.response?.status === 401) {
      dispatch(changeTokenExpiry(true));
    } else if (error.status === 429) { // to handle rate limit error
      toast.error("Too many requests from this IP, please try again after 1 minutes");
    } else {
      toast.error(message);
    };
  };

  return {
    handleError,
  };
};

export default useErrorHandler;