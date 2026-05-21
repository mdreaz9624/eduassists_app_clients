

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import SocialLink from "../SocialLink/SocialLink";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Added to check role from MongoDB
import { toast } from "react-hot-toast";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const { signIn, resetPassword } = useAuth();
    const axiosSecure = useAxiosSecure(); // Hook instance to make secure API calls
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm();

    // Demo credentials
    const demoCredentials = {
        email: "demo@eduassists.com",
        password: "demo1234"
    };

    // Login Submit
    const onSubmit = async (data) => {
        setLoading(true);

        try {
            // 1. Authenticate user with Firebase
            const result = await signIn(data.email, data.password);

            if (result.user) {
                // 2. Query MongoDB via your secure backend to discover this user's true role
                const response = await axiosSecure.get(`/users/role/${result.user.email}`);
                const dbRole = response.data.role;

                toast.success("Login successful!");

                // 3. Conditional Navigation based on MongoDB Role
                if (dbRole === "superadmin" || dbRole === "admin") {
                    navigate("/admin"); // Authorized dashboard path
                } else {
                    navigate("/"); // Fallback landing page for general students/franchises
                }
            }
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/user-not-found') {
                toast.error("User not found");
            } else if (error.code === 'auth/wrong-password') {
                toast.error("Wrong password");
            } else if (error.code === 'auth/invalid-credential') {
                toast.error("Invalid email or password");
            } else if (error.code === 'auth/too-many-requests') {
                toast.error("Too many attempts. Try later");
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Forgot Password
    const handleForgotPassword = async () => {
        const email = getValues("email");
        if (!email) {
            return toast.error("Please enter your email first");
        }

        try {
            setResetLoading(true);
            await resetPassword(email);
            toast.success("Password reset email sent");
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setResetLoading(false);
        }
    };

    // Fill Demo
    const fillDemoCredentials = () => {
        reset(demoCredentials);
        toast.success("Demo credentials filled!");
    };

    return (
        <section className="min-h-screen flex items-center justify-center mt-24 bg-base-200 px-4 py-8">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                {/* DEV MODE */}
                {import.meta.env.DEV && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mx-6 mt-4 rounded-r">
                        <div className="flex flex-col">
                            <strong className="text-yellow-700">EduAssists Login Mode:</strong>
                            <p className="text-sm mt-1 text-yellow-600">
                                Demo: <strong>{demoCredentials.email}</strong>
                            </p>
                            <button
                                type="button"
                                onClick={fillDemoCredentials}
                                className="text-xs text-yellow-700 underline mt-1 text-left font-medium hover:text-yellow-800"
                            >
                                Use Demo Credentials
                            </button>
                        </div>
                    </div>
                )}

                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center text-primary">
                        Login to EduAssists
                    </h2>
                    <p className="text-center text-base-content/70 mb-4">
                        Access your dashboard
                    </p>

                    {/* Social Login */}
                    <SocialLink />

                    <div className="divider">OR LOGIN WITH EMAIL</div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* EMAIL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email Address *</span>
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full pl-10"
                                    disabled={loading}
                                    {...register("email", { required: "Email is required" })}
                                />
                            </div>
                            {errors.email && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password *</span>
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pl-10 pr-10"
                                    disabled={loading}
                                    {...register("password", { required: "Password is required" })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        {/* FORGOT PASSWORD */}
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                disabled={resetLoading}
                                className="text-primary text-sm hover:underline"
                            >
                                {resetLoading ? "Sending..." : "Forgot Password?"}
                            </button>
                        </div>

                        {/* LOGIN BUTTON */}
                        <div className="form-control bg-[#e49308] rounded-xl mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary w-full text-white font-bold hover:bg-primary-focus"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    </form>

                    {/* FOOTER */}
                    <div className="text-center text-sm mt-6 pt-4 border-t">
                        <p>
                            Don't have an account?{" "}
                            <Link
                                to="/registration"
                                className="text-primary font-semibold hover:underline"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;