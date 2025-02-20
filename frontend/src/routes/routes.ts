export const ROUTES = {
    HOME: "/",

    AUTH: {
        LOGIN: "/login",
        SIGNUP: "/signup",
        FORGOT_PASSWORD: "/forgot-password",
    },

    PROFESSIONALS: {
        LIST: "/professionals",
        DETAILS: (id: string = ":id") => `/professionals/${id}`,
    },

    BOOKINGS: "/bookings",
};
