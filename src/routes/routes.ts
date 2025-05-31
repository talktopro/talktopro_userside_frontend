export const ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT_US: "/contact-us",
    TERMS_AND_CONDITION: "/terms&condition",
    PRIVACY_AND_POLICY: "/privacy&policy",
    REFUND_POLICY: "/refund-policy",

    AUTH: {
        LOGIN: "/login",
        SIGNUP: "/signup",
        FORGOT_PASSWORD: "/forgot-password",
        CHANGE_PASSWORD: "/reset-password/:token",
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
        ABOUT: "/mentor/about",
        CONTACT_US: "/mentor/contact-us",
        TERMS_AND_CONDITION: "/mentor/terms&condition",
        PRIVACY_AND_POLICY: "/mentor/privacy&policy",
        REFUND_POLICY: "/mentor/refund-policy",
    },
};
