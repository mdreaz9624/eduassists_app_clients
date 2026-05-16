
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import SocialLink from "../SocialLink/SocialLink";
import { toast } from "react-hot-toast";
import { useSearchParams } from 'react-router-dom';
import useAxiosSecure from "../../../hooks/useAxiosSecure";




const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { createUser } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const referralCode = searchParams.get('ref');

    const axiosSecure = useAxiosSecure();



    const demoCredentials = {
        fullName: "Ahsan Reaz",
        email: "demo@eduassists.com",
        phone: "01712345678",
        role: "student",
        password: "demo1234",
        confirmPassword: "demo1234",
        district: "Dhaka",
        area: "Dhanmondi"
    };

    if (referralCode) {
        localStorage.setItem('referred_by', referralCode);
    }

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const selectedRole = watch("role");
    const password = watch("password");

    //previous onSubmit 

    // const onSubmit = async (data) => {
    //     if (data.password !== data.confirmPassword) {
    //         toast.error("Passwords do not match!");
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         // Prepare user data
    //         const userData = {
    //             fullName: data.fullName,
    //             role: data.role,
    //             phone: data.phone,
    //             district: data.district,
    //             area: data.area,
    //             photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=random`
    //         };

    //         // Create user with additional data
    //         const result = await createUser(data.email, data.password, userData);

    //         if (result && result.success) {
    //             // Show success toast
    //             toast.success("Account created successfully!", {
    //                 duration: 3000,
    //                 position: "top-center",
    //                 style: {
    //                     background: "#F59E0B",
    //                     color: "#fff",
    //                     fontWeight: "bold"
    //                 }
    //             });

    //             // Redirect to login after 2 seconds
    //             setTimeout(() => {
    //                 navigate("/login");
    //             }, 2000);
    //         } else {
    //             toast.error("Registration failed. Please try again.");
    //         }
    //     } catch (error) {
    //         console.error("Registration error:", error);

    //         // User-friendly error messages
    //         if (error.code === 'auth/email-already-in-use') {
    //             toast.error("Email already in use. Please use a different email.");
    //         } else if (error.code === 'auth/weak-password') {
    //             toast.error("Password is too weak. Please use at least 6 characters.");
    //         } else if (error.code === 'auth/invalid-email') {
    //             toast.error("Invalid email address.");
    //         } else {
    //             toast.error(error.message || "Failed to create account. Please try again.");
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    //new onSubmit with referral code handling
    const onSubmit = async (data) => {

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {

            const userData = {
                fullName: data.fullName,
                role: data.role,
                phone: data.phone,
                district: data.district,
                area: data.area,
                photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=random`
            };

            // Firebase User Create
            const result = await createUser(
                data.email,
                data.password,
                userData
            );

            // MongoDB Save
            const saveUser = {
                name: data.fullName,
                email: data.email,
                role: data.role,
                phone: data.phone,
                district: data.district || "",
                area: data.area || "",
                photoURL: userData.photoURL,
                uid: result.user.uid,
                createdAt: new Date()
            };

            await axiosSecure.post('/users', saveUser);

            toast.success("Account created successfully!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.error(error.message);

        } finally {

            setLoading(false);
        }
    };


    const fillDemoCredentials = () => {
        reset(demoCredentials);
        toast.success("Demo credentials filled!");
    };

    return (
        <section className="min-h-screen flex items-center justify-center mt-24 bg-base-200 px-4 py-8">
            <div className="card w-full max-w-lg shadow-2xl bg-base-100 border-t-4 border-[#F59E0B]">
                {import.meta.env.DEV && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mx-6 mt-4 rounded flex justify-between items-center">
                        <div>
                            <strong className="text-blue-700 text-sm">🛠️ Join Our Global Network</strong>
                            <p className="text-xs text-blue-600">Dynamic Fields Enabled</p>
                        </div>
                        <button
                            onClick={fillDemoCredentials}
                            className="btn btn-xs btn-outline btn-info"
                            disabled={loading}
                        >
                            Fill Demo
                        </button>
                    </div>
                )}

                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center text-[#F59E0B]">Create Account</h2>
                    <p className="text-center text-base-content/70 mb-6 italic">Join EduAssists Global Network</p>

                    <SocialLink />

                    <div className="divider">OR</div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name *</span>
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    {...register("fullName", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 3,
                                            message: "Name must be at least 3 characters"
                                        }
                                    })}
                                    placeholder="Enter your full name"
                                    className="input input-bordered w-full pl-10"
                                    disabled={loading}
                                />
                            </div>
                            {errors.fullName && (
                                <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>
                            )}
                        </div>

                        {/* Email & Phone Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email *</span>
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Please enter a valid email address"
                                            }
                                        })}
                                        placeholder="example@email.com"
                                        className="input input-bordered w-full pl-10"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Phone *</span>
                                </label>
                                <div className="relative">
                                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="tel"
                                        {...register("phone", {
                                            required: "Phone number is required"
                                        })}
                                        placeholder="+880 1XXX-XXXXXX"
                                        className="input input-bordered w-full pl-10"
                                        disabled={loading}
                                    />
                                </div>
                                {errors.phone && (
                                    <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-[#F59E0B]">Register As *</span>
                            </label>
                            <select
                                {...register("role", { required: "Please select a role" })}
                                className="select select-primary w-full font-semibold"
                                disabled={loading}
                                style={{ borderColor: "#F59E0B" }}
                            >
                                <option value="" disabled>Select your status</option>
                                <option value="student">Student (Applicant)</option>
                                <option value="franchise">Franchise (Partner)</option>
                            </select>
                            {errors.role && (
                                <span className="text-red-500 text-xs mt-1">{errors.role.message}</span>
                            )}
                        </div>

                        {/* DYNAMIC FIELDS: Franchise */}
                        {selectedRole === "franchise" && (
                            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                                <h3 className="text-lg font-bold text-emerald-700 mb-3">Franchise Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">District *</span>
                                        </label>
                                        <div className="relative">
                                            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                {...register("district", {
                                                    required: selectedRole === "franchise" ? "District is required" : false
                                                })}
                                                placeholder="e.g. Dhaka"
                                                className="input input-bordered w-full pl-10"
                                                disabled={loading}
                                            />
                                        </div>
                                        {errors.district && (
                                            <span className="text-red-500 text-xs mt-1">{errors.district.message}</span>
                                        )}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Area Name *</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("area", {
                                                required: selectedRole === "franchise" ? "Area is required" : false
                                            })}
                                            placeholder="e.g. Uttara"
                                            className="input input-bordered w-full"
                                            disabled={loading}
                                        />
                                        {errors.area && (
                                            <span className="text-red-500 text-xs mt-1">{errors.area.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Passwords */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-medium">Password *</span>
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                        placeholder="Create password"
                                        className="input input-bordered w-full pl-10 pr-10"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        disabled={loading}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>
                                )}
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-medium">Confirm Password *</span>
                                </label>
                                <div className="relative">
                                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: value => value === password || "Passwords do not match"
                                        })}
                                        placeholder="Confirm password"
                                        className="input input-bordered w-full pl-10 pr-10"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        disabled={loading}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-2">
                                <input
                                    type="checkbox"
                                    {...register("terms", { required: "You must accept the terms and conditions" })}
                                    className="checkbox checkbox-sm bg-slate-700 text-white"
                                    disabled={loading}
                                    style={{ borderColor: "#F59E0B" }}
                                />
                                <span className="label-text text-sm text-red-700">
                                    I agree to the Terms & Conditions and Privacy Policy
                                </span>
                            </label>
                            {errors.terms && (
                                <span className="text-red-500 text-xs mt-1">{errors.terms.message}</span>
                            )}
                        </div>

                        {/* Submit Button - Golden Yellow */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn w-full text-white text-lg py-3 transition-all duration-300 hover:scale-105"
                                style={{
                                    background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                                    border: "none",
                                    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)"
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Creating Account...
                                    </>
                                ) : "Create Account"}
                            </button>
                        </div>
                    </form>

                    <div className="text-center text-sm mt-6 pt-4 border-t">
                        <p className="text-base-content/70">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#5a3f11] font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;