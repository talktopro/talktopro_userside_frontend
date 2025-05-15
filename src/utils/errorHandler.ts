import { AxiosError } from "axios";

export const extractErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        const responseData = error.response?.data;

        if (Array.isArray(responseData?.errors)) {
            return responseData.errors[0] || "An unknown error occurred";
        }

        if (typeof responseData?.message === "string") {
            return responseData.message;
        }

        if (typeof responseData?.error === "string") {
            return responseData.error;
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "An unknown error occurred";
};
