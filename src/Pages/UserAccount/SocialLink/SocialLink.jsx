


import { FaGoogle, FaFacebook } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SocialLink = () => {

    const {
        signInWithGoogle,
        signInWithFacebook,
        loading
    } = useAuth();

    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    // Save user to MongoDB
    const saveUserToDB = async (user, provider = "google") => {

        try {

            const saveUser = {

                name: user.displayName || "Unknown User",
                email: user.email,
                photoURL: user.photoURL || "",
                uid: user.uid,
                provider: provider,
                role: "student",
                createdAt: new Date()

            };

            await axiosSecure.post('/users', saveUser);

        } catch (error) {

            console.log("MongoDB Save Error:", error);

        }
    };

    // GOOGLE LOGIN
    const handleGoogleLogin = async () => {

        if (loading) return;

        try {

            const result = await signInWithGoogle();

            //check browser console for the result object to understand its structure
            // console.log(result);

            // Firebase user
            const user = result.user;

            // Save to MongoDB
            await saveUserToDB(user, "google");

            toast.success("Logged in with Google!");

            navigate("/");

        } catch (error) {

            console.error("Google login error:", error);

            if (error.code !== 'auth/cancelled-popup-request') {

                toast.error(
                    error.message || "Failed to login with Google"
                );

            }
        }
    };

    // FACEBOOK LOGIN
    const handleFacebookLogin = async () => {

        if (loading) return;

        try {

            const result = await signInWithFacebook();

            const user = result.user;

            // Save to MongoDB
            await saveUserToDB(user, "facebook");

            toast.success("Logged in with Facebook!");

            navigate("/");

        } catch (error) {

            console.error("Facebook login error:", error);

            if (error.code !== 'auth/cancelled-popup-request') {

                toast.error(
                    error.message || "Failed to login with Facebook"
                );

            }
        }
    };

    return (

        <div>

            <div className="space-y-3 mb-6">

                {/* GOOGLE */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="btn btn-outline w-full gap-2 hover:bg-red-50"
                >

                    <FaGoogle className="text-red-500 text-lg" />

                    Continue with Google

                </button>

                {/* FACEBOOK */}
                <button
                    type="button"
                    onClick={handleFacebookLogin}
                    disabled={loading}
                    className="btn btn-outline w-full gap-2 hover:bg-blue-50"
                >

                    <FaFacebook className="text-blue-600 text-lg" />

                    Continue with Facebook

                </button>

            </div>

        </div>
    );
};

export default SocialLink;