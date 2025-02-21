export const ROUTES = {
    HOME: "/",

    AUTH: {
        LOGIN: "/login",
        SIGNUP: "/signup",
        FORGOT_PASSWORD: "/forgot-password",
        CHANGE_PASSWORD: "/change-password",
        OTP_SIGNUP: "/signup/otp",
    },

    PROFESSIONALS: {
        LIST: "/professionals",
        DETAILS: (id: string = ":id") => `/professionals/${id}`,
    },

    BOOKINGS: "/bookings",
    ACCOUNT_SETTINGS: "/account-settings",
};
