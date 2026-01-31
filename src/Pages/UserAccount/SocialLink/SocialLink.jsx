// import React from 'react';
// import {  FaGoogle, FaFacebook } from "react-icons/fa";
// import useAuth from '../../../hooks/useAuth';

// // import { error } from 'firebase-functions/logger';
// const SocialLink = () => {

//     const {signInWithGoogle,signInWithFacebook, loading} = useAuth();

//     const handleGoogleLogin = () => {
//         if(loading) return;
//         signInWithGoogle()
//             .then(result => {
//                 console.log(result.user)
//             })
//             .catch(error=>{
//                 // console.log(error)
//                 if (error.code !== 'auth/cancelled-popup-request') {
//                     console.error("Login Error:", error.message);
//                 }
//             })
//         // console.log("Google login clicked");
//         // alert("Google login - Firebase integration required");
//     };

//     const handleFacebookLogin = () => {
//         signInWithFacebook()
//             .then(result =>{
//                 console.log(result.user)
//             })
//             .catch(error=>
//                 console.log(error)
//             )
//         console.log("Facebook login clicked");
//         alert("Facebook login - Firebase integration required");
//     };
//     return (
//         <div>
//             <div className="space-y-3 mb-6">
//                 <button
//                     type="button"
//                     onClick={handleGoogleLogin}
//                     className="btn btn-outline w-full gap-2 hover:bg-red-50"
//                 >
//                     <FaGoogle className="text-red-500 text-lg" />
//                     Continue with Google
//                 </button>

//                 <button
//                     type="button"
//                     onClick={handleFacebookLogin}
//                     className="btn btn-outline w-full gap-2 hover:bg-blue-50"
//                 >
//                     <FaFacebook className="text-blue-600 text-lg" />
//                     Continue with Facebook
//                 </button>
//             </div>


//         </div>
//     );
// };

// export default SocialLink;

// new code deep


import { FaGoogle, FaFacebook } from "react-icons/fa";
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SocialLink = () => {
    const { signInWithGoogle, signInWithFacebook, loading } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        if(loading) return;
        
        try {
            const result = await signInWithGoogle();
            if (result && result.success) {
                toast.success("Logged in with Google!");
                navigate("/");
            }
        } catch (error) {
            console.error("Google login error:", error);
            if (error.code !== 'auth/cancelled-popup-request') {
                toast.error(error.message || "Failed to login with Google");
            }
        }
    };

    const handleFacebookLogin = async () => {
        if(loading) return;
        
        try {
            const result = await signInWithFacebook();
            if (result && result.success) {
                toast.success("Logged in with Facebook!");
                navigate("/");
            }
        } catch (error) {
            console.error("Facebook login error:", error);
            if (error.code !== 'auth/cancelled-popup-request') {
                toast.error(error.message || "Failed to login with Facebook");
            }
        }
    };

    return (
        <div>
            <div className="space-y-3 mb-6">
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="btn btn-outline w-full gap-2 hover:bg-red-50"
                >
                    <FaGoogle className="text-red-500 text-lg" />
                    Continue with Google
                </button>

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
