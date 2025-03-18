import { AxiosError } from "axios";

export const extractErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError && error.response?.data?.errors) {
        return error.response.data.errors[0] || "An unknown error occurred";
    } else if (error instanceof Error) {
        return error.message;
    }
    return "An unknown error occurred";
};
