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
    MENTOR: {
        DASHBOARD: "/mentor/dashboard",
        BOOKINGS: "/mentor/bookings",
        SLOT_MANAGEMENT: "/mentor/slot-management",
        ANALYTICS: "/mentor/analytics",
        ACCOUNT_SETTINGS: "/mentor/account-settings",
        NOTIFICATION_SETTINGS: "/mentor/notification-settings",
        REGISTER: "/mentor/register",
    },

    ADMIN: {
        LOGIN: "/admin/login",
        BOOKINGS: "/admin/bookings"
    }
};
