import axios from "axios";

export const handleApiError = (error: any): string => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        // If the error follows { errors: [{ message: "..." }] } format
        if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
            return data.errors[0].message;
        }

        // If the error follows { message: "..." } format
        if (typeof data?.message === "string") {
            return data.message;
        }

        return "Something went wrong!";
    }
    return "Network error. Please try again.";
};
