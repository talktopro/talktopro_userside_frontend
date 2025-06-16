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
    } else {
      toast.error(message);
    };
  };

  return {
    handleError,
  };
};

export default useErrorHandler;