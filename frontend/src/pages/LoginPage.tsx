import { useCallback } from "react";
import loginImage from "../assets/auth-image.png";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../components/PasswordInput";

type LoginValues = {
    email: string;
    password: string;
};

const initialValues: LoginValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

const LoginPage = () => {

    const handleLogin = useCallback((values: LoginValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(values);
        setSubmitting(false);
    }, []);

    return (
        <div className="h-screen flex bg-blue-white">
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${loginImage})` }}></div>
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <img src={logo} alt="Talk to pro logo" className="w-12 h-12 mb-4" />
                    <h2 className="text-2xl font-semibold mb-6">Log in to <span className="text-primary">Talk</span></h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                                    <Field id="email"
                                        type="email"
                                        name="email"
                                        className="w-full p-2 border border-[#E6E6E6] rounded-lg focus:outline-none"
                                        placeholder="Enter email"
                                    />
                                    <ErrorMessage name="email" component="div" className="mt-1 text-red-500 text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                                    <PasswordInput id="password" name="password" />
                                    <ErrorMessage name="password" component="div" className="mt-1 text-red-500 text-sm" />
                                    <div className="mt-1 text-right">
                                        <Link to={ROUTES.FORGOT_PASSWORD} className="text-sm hover:underline">Forgot password?</Link>
                                    </div>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 hover:cursor-pointer transition"
                                >Log in</button>
                                <div className="mt-4 text-center">
                                    <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
                                    <Link to={ROUTES.SIGNUP} className="text-sm font-semibold">
                                        Sign up
                                    </Link>
                                    <span className="text-sm text-gray-600"> now.</span>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="mt-4 text-center font-medium text-sm text-gray-500">
                        Or
                    </div>
                    <button className="mt-4 font-semibold w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-lg text-gray-700 hover:cursor-pointer hover:bg-gray-100">
                        <img src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png" alt="Google" className="h-5 w-5" />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage