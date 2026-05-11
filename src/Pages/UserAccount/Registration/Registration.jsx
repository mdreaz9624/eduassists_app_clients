

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaMapMarkerAlt, FaFileUpload } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
// import SocialLink from "../SocialLink/SocialLink";

// const Registration = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const {createUser} = useAuth();

//   const demoCredentials = {
//     fullName: "Ahsan Reaz",
//     email: "demo@eduassists.com",
//     phone: "01712345678",
//     role: "customer", // Default to student
//     password: "demo1234",
//     confirmPassword: "demo1234",
//     district: "Dhaka",
//     area: "Dhanmondi"
//   };

//   const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

//   // Watch the "role" field to conditionally show inputs
//   const selectedRole = watch("role");
//   const password = watch("password");

//   const onSubmit = (data) => {
//     // If files are uploaded (Student role), they will be in data.documents[0]
//     console.log("Registration data object:", data);
//     alert(`Registration submitted!\nName: ${data.fullName}\nRole: ${data.role}`);
//     // console.log(createUser)
//     createUser(data.email, data.password)
//         .then(result =>{
//           console.log(result.createUser)
//         })
//         .catch(error => {
//           console.log(error);
//         })
//   };

//   const fillDemoCredentials = () => {
//     reset(demoCredentials);
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
//       <div className="card w-full max-w-lg shadow-2xl bg-base-100 border-t-4 border-primary">

//         {import.meta.env.DEV && (
//           <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mx-6 mt-4 rounded flex justify-between items-center">
//             <div>
//               <strong className="text-blue-700 text-sm">🛠️ Dev Mode</strong>
//               <p className="text-xs text-blue-600">Dynamic fields enabled</p>
//             </div>
//             <button onClick={fillDemoCredentials} className="btn btn-xs btn-outline btn-info">Fill Demo</button>
//           </div>
//         )}

//         <div className="card-body">
//           <h2 className="text-3xl font-bold text-center text-primary">Create Account</h2>
//           <p className="text-center text-base-content/70 mb-6 italic">Join EduAssists Global Network</p>

//           <SocialLink></SocialLink>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Full Name */}
//             <div className="form-control">
//               <label className="label"><span className="label-text font-medium">Full Name</span></label>
//               <div className="relative">
//                 <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input type="text" {...register("fullName", { required: "Full name is required" })} placeholder="Enter your name" className="input input-bordered w-full pl-10" />
//               </div>
//               {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName.message}</span>}
//             </div>

//             {/* Email & Phone Row */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="form-control">
//                 <label className="label"><span className="label-text font-medium">Email</span></label>
//                 <input type="email" {...register("email", { required: "Required" })} className="input input-bordered w-full" />
//               </div>
//               <div className="form-control">
//                 <label className="label"><span className="label-text font-medium">Phone</span></label>
//                 <input type="tel" {...register("phone", { required: "Required" })} className="input input-bordered w-full" />
//               </div>
//             </div>

//             {/* Role Selection */}
//             <div className="form-control">
//               <label className="label"><span className="label-text font-bold text-primary">Register As</span></label>
//               <select 
//                 {...register("role", { required: "Please select a role" })}
//                 className="select select-primary w-full font-semibold"
//                 defaultValue=""
//               >
//                 <option value="" disabled>Select your status</option>
//                 <option value="student">Student (Applicant)</option>
//                 <option value="franchise">Franchise (Partner)</option>
//                 <option value="admin">Admin</option>
//               </select>
//               {errors.role && <span className="text-red-500 text-xs mt-1">{errors.role.message}</span>}
//             </div>

//             {/* DYNAMIC FIELDS: Franchise (Merchant) */}
//             {selectedRole === "franchise" && (
//               <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-dashed border-primary/30">
//                 <div className="form-control col-span-2">
//                   <span className="text-xs font-bold text-primary uppercase mb-2">Franchise Details</span>
//                 </div>
//                 <div className="form-control">
//                   <label className="label"><span className="label-text font-medium">District</span></label>
//                   <div className="relative">
//                     <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//                     <input type="text" {...register("district", { required: "District required" })} placeholder="e.g. Dhaka" className="input input-sm input-bordered w-full pl-8" />
//                   </div>
//                 </div>
//                 <div className="form-control">
//                   <label className="label"><span className="label-text font-medium">Area Name</span></label>
//                   <input type="text" {...register("area", { required: "Area required" })} placeholder="e.g. Uttara" className="input input-sm input-bordered w-full" />
//                 </div>
//               </div>
//             )}

//             {/* DYNAMIC FIELDS: Student  */}
//             {selectedRole === "customer" && (
//               <div className="p-4 bg-blue-50 rounded-xl border border-dashed border-blue-300">
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text font-bold text-blue-700">Basic Documents (Zip/PDF)</span>
//                   </label>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-blue-100 transition-colors">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <FaFileUpload className="text-blue-500 mb-2" />
//                         <p className="text-xs text-gray-500 text-center px-2">Upload Academic Transcripts & Passport Copy</p>
//                       </div>
//                       <input type="file" {...register("documents")} className="hidden" />
//                     </label>
//                   </div>
//                   <p className="text-[10px] text-gray-400 mt-2">*Only PDF or ZIP files accepted for initial review.</p>
//                 </div>
//               </div>
//             )}

//             {/* Passwords */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                {/* Password input logic same as your original code but inside grid */}
//                <div className="form-control relative">
//                   <label className="label"><span className="label-text">Password</span></label>
//                   <input type={showPassword ? "text" : "password"} {...register("password", { required: true, minLength: 6 })} className="input input-bordered w-full pr-10" />
//                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[50px] text-gray-400">{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
//                </div>
//                <div className="form-control relative">
//                   <label className="label"><span className="label-text">Confirm</span></label>
//                   <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword", { validate: v => v === password || "Match failed" })} className="input input-bordered w-full pr-10" />
//                   <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[50px] text-gray-400">{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</button>
//                </div>
//             </div>

//             <div className="form-control mt-6">
//               <button type="submit" className="btn btn-primary w-full text-white">Create Account</button>
//             </div>
//           </form>

//           <div className="text-center text-sm mt-6 pt-4 border-t">
//             <p>Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link></p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Registration;





//another version of registration
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import SocialLink from "../SocialLink/SocialLink";
import { toast } from "react-hot-toast";
import { useSearchParams } from 'react-router-dom';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { createUser } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const referralCode = searchParams.get('ref');

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

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            // Prepare user data
            const userData = {
                fullName: data.fullName,
                role: data.role,
                phone: data.phone,
                district: data.district,
                area: data.area,
                photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.fullName)}&background=random`
            };

            // Create user with additional data
            const result = await createUser(data.email, data.password, userData);

            if (result && result.success) {
                // Show success toast
                toast.success("Account created successfully!", {
                    duration: 3000,
                    position: "top-center",
                    style: {
                        background: "#F59E0B",
                        color: "#fff",
                        fontWeight: "bold"
                    }
                });
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);

            // User-friendly error messages
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already in use. Please use a different email.");
            } else if (error.code === 'auth/weak-password') {
                toast.error("Password is too weak. Please use at least 6 characters.");
            } else if (error.code === 'auth/invalid-email') {
                toast.error("Invalid email address.");
            } else {
                toast.error(error.message || "Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const fillDemoCredentials = () => {
        reset(demoCredentials);
        toast.success("Demo credentials filled!");
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-8">
            <div className="card w-full max-w-lg shadow-2xl bg-base-100 border-t-4 border-[#F59E0B]">
                {import.meta.env.DEV && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mx-6 mt-4 rounded flex justify-between items-center">
                        <div>
                            <strong className="text-blue-700 text-sm">🛠️ Dev Mode</strong>
                            <p className="text-xs text-blue-600">Dynamic fields enabled</p>
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
                                    className="checkbox checkbox-sm"
                                    disabled={loading}
                                    style={{ borderColor: "#F59E0B" }}
                                />
                                <span className="label-text text-sm">
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