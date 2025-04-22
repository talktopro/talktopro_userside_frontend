export const ROUTES = {
    HOME: "/",

    AUTH: {
        LOGIN: "/login",
        SIGNUP: "/signup",
        FORGOT_PASSWORD: "/forgot-password",
        CHANGE_PASSWORD: "/change-password",
        SIGNUP_OTP_VERIFY: "/signup/verify-otp",
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
        PRICING: "/mentor/pricing",
        ANALYTICS: "/mentor/analytics",
        ACCOUNT_SETTINGS: "/mentor/account-settings",
        NOTIFICATION_SETTINGS: "/mentor/notification-settings",
        REGISTER: "/mentor/register",
    },

    ADMIN: {
        LOGIN: "/admin/login",
        SETTINGS: "/admin/settings",
        DASHBOARD: "/admin/dashboard",
        BOOKINGS: "/admin/bookings",
        USERS: "/admin/users",
        MENTORS: "/admin/mentors",
    }
};
