// import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
// import { AuthContext } from "./AuthContext";
// import { auth } from "../../firebase/firebase.init";
// import { useEffect, useState } from "react";

// const googleProvider = new GoogleAuthProvider();

// const facebookProvider = new FacebookAuthProvider();

// const AuthProvider = ({ children }) => {

//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);


//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);

//     }

//     const signIn = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);

//     }

//     const signInWithGoogle = () => {
//         setLoading(true);
//         return signInWithPopup(auth, googleProvider)
//     }

//     const signInWithFacebook = () => {
//         setLoading(true);
//         return signInWithPopup(auth, facebookProvider)
//     }

//     const logOut = () => {
//         setLoading(true);
//         return signOut(auth);
//     }



//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             console.log('User state changed:', currentUser);
//             setLoading(false);
//         });

//         // Correct cleanup: just return the unsubscribe function itself
//         return () => unsubscribe();
//     }, []);


//     const authInfo = {
//         user,
//         loading,
//         createUser,
//         signIn,
//         signInWithGoogle,
//         signInWithFacebook,
//         logOut,


//     }
//     return (

//         <AuthContext value={authInfo}>
//             {children}


//         </AuthContext>
//     );
// }


// export default AuthProvider;



// new  Code deepseek,,,,,111111


// import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { AuthContext } from "./AuthContext";
// import { auth } from "../../firebase/firebase.init";
// import { useEffect, useState } from "react";

// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [userData, setUserData] = useState(null); // Added userData state
//     const [loading, setLoading] = useState(true);

//     // Save user data to localStorage
//     const saveUserData = (userInfo) => {
//         try {
//             const existingUsers = JSON.parse(localStorage.getItem('eduassists_users')) || [];
//             const userIndex = existingUsers.findIndex(u => u.uid === userInfo.uid);

//             if (userIndex >= 0) {
//                 existingUsers[userIndex] = { ...existingUsers[userIndex], ...userInfo };
//             } else {
//                 existingUsers.push(userInfo);
//             }

//             localStorage.setItem('eduassists_users', JSON.stringify(existingUsers));
//             localStorage.setItem('current_user', JSON.stringify(userInfo));
//         } catch (error) {
//             console.error("Error saving user data:", error);
//         }
//     };

//     // Get user data from localStorage
//     const getUserData = (uid) => {
//         try {
//             const users = JSON.parse(localStorage.getItem('eduassists_users')) || [];
//             return users.find(u => u.uid === uid) || null;
//         } catch (error) {
//             console.error("Error getting user data:", error);
//             return null;
//         }
//     };

//     // Create user with email/password and additional data
//     const createUser = async (email, password, additionalData = {}) => {
//         setLoading(true);
//         try {
//             const result = await createUserWithEmailAndPassword(auth, email, password);

//             // Prepare user data
//             const userData = {
//                 uid: result.user.uid,
//                 email: email,
//                 displayName: additionalData.fullName || additionalData.name || "User",
//                 photoURL: additionalData.photoURL || `https://ui-avatars.com/api/?name=${additionalData.fullName || additionalData.name || "User"}&background=random`,
//                 role: additionalData.role || "student",
//                 phone: additionalData.phone || "",
//                 district: additionalData.district || "",
//                 area: additionalData.area || "",
//                 createdAt: new Date().toISOString(),
//                 lastLogin: new Date().toISOString(),
//                 status: "active"
//             };

//             // Update Firebase profile
//             await updateProfile(result.user, {
//                 displayName: userData.displayName,
//                 photoURL: userData.photoURL
//             });

//             // Save user data
//             saveUserData(userData);

//             // Update state
//             setUser(result.user);
//             setUserData(userData);

//             return { success: true, user: result.user, userData };
//         } catch (error) {
//             console.error("Registration error:", error);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Sign in with email/password
//     const signIn = async (email, password) => {
//         setLoading(true);
//         try {
//             const result = await signInWithEmailAndPassword(auth, email, password);

//             // Get user data
//             const storedUserData = getUserData(result.user.uid);

//             if (storedUserData) {
//                 // Update last login
//                 const updatedUserData = {
//                     ...storedUserData,
//                     lastLogin: new Date().toISOString()
//                 };
//                 saveUserData(updatedUserData);
//                 setUserData(updatedUserData);
//             } else {
//                 // Create basic user data if not found
//                 const basicUserData = {
//                     uid: result.user.uid,
//                     email: result.user.email,
//                     displayName: result.user.displayName || "User",
//                     photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName || "User"}&background=random`,
//                     role: "student",
//                     lastLogin: new Date().toISOString()
//                 };
//                 saveUserData(basicUserData);
//                 setUserData(basicUserData);
//             }

//             setUser(result.user);
//             return { success: true, user: result.user };
//         } catch (error) {
//             console.error("Login error:", error);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Sign in with Google
//     const signInWithGoogle = async () => {
//         setLoading(true);
//         try {
//             const result = await signInWithPopup(auth, googleProvider);

//             let storedUserData = getUserData(result.user.uid);

//             if (!storedUserData) {
//                 storedUserData = {
//                     uid: result.user.uid,
//                     email: result.user.email,
//                     displayName: result.user.displayName,
//                     photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName}&background=random`,
//                     role: "student",
//                     phone: "",
//                     provider: "google",
//                     createdAt: new Date().toISOString(),
//                     lastLogin: new Date().toISOString(),
//                     status: "active"
//                 };
//                 saveUserData(storedUserData);
//             } else {
//                 const updatedUserData = {
//                     ...storedUserData,
//                     lastLogin: new Date().toISOString()
//                 };
//                 saveUserData(updatedUserData);
//                 storedUserData = updatedUserData;
//             }

//             setUser(result.user);
//             setUserData(storedUserData);
//             return { success: true, user: result.user, userData: storedUserData };
//         } catch (error) {
//             console.error("Google login error:", error);
//             if (error.code !== 'auth/cancelled-popup-request') {
//                 throw error;
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Sign in with Facebook
//     const signInWithFacebook = async () => {
//         setLoading(true);
//         try {
//             const result = await signInWithPopup(auth, facebookProvider);

//             let storedUserData = getUserData(result.user.uid);

//             if (!storedUserData) {
//                 storedUserData = {
//                     uid: result.user.uid,
//                     email: result.user.email,
//                     displayName: result.user.displayName,
//                     photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName}&background=random`,
//                     role: "student",
//                     phone: "",
//                     provider: "facebook",
//                     createdAt: new Date().toISOString(),
//                     lastLogin: new Date().toISOString(),
//                     status: "active"
//                 };
//                 saveUserData(storedUserData);
//             } else {
//                 const updatedUserData = {
//                     ...storedUserData,
//                     lastLogin: new Date().toISOString()
//                 };
//                 saveUserData(updatedUserData);
//                 storedUserData = updatedUserData;
//             }

//             setUser(result.user);
//             setUserData(storedUserData);
//             return { success: true, user: result.user, userData: storedUserData };
//         } catch (error) {
//             console.error("Facebook login error:", error);
//             if (error.code !== 'auth/cancelled-popup-request') {
//                 throw error;
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Logout
//     const logOut = async () => {
//         setLoading(true);
//         try {
//             await signOut(auth);
//             setUser(null);
//             setUserData(null);
//             localStorage.removeItem('current_user');
//             return { success: true };
//         } catch (error) {
//             console.error("Logout error:", error);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Auth state listener
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);

//                 const storedUserData = getUserData(currentUser.uid);

//                 if (storedUserData) {
//                     setUserData(storedUserData);
//                     localStorage.setItem('current_user', JSON.stringify(storedUserData));
//                 } else {
//                     const basicUserData = {
//                         uid: currentUser.uid,
//                         email: currentUser.email,
//                         displayName: currentUser.displayName || "User",
//                         photoURL: currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || "User"}&background=random`,
//                         role: "student",
//                         lastLogin: new Date().toISOString()
//                     };
//                     saveUserData(basicUserData);
//                     setUserData(basicUserData);
//                     localStorage.setItem('current_user', JSON.stringify(basicUserData));
//                 }
//             } else {
//                 setUser(null);
//                 setUserData(null);
//                 localStorage.removeItem('current_user');
//             }
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     const authInfo = {
//         user,
//         userData, // Added userData
//         loading,
//         createUser,
//         signIn,
//         signInWithGoogle,
//         signInWithFacebook,
//         logOut
//     };

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

// another new code 222222

// import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { AuthContext } from "./AuthContext";
// import { auth } from "../../firebase/firebase.init";
// import { useEffect, useState } from "react";

// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Save user data to localStorage
//     const saveUserData = (userInfo) => {
//         try {
//             const existingUsers = JSON.parse(localStorage.getItem('eduassists_users')) || [];
//             const userIndex = existingUsers.findIndex(u => u.uid === userInfo.uid);

//             if (userIndex >= 0) {
//                 existingUsers[userIndex] = { ...existingUsers[userIndex], ...userInfo };
//             } else {
//                 existingUsers.push(userInfo);
//             }

//             localStorage.setItem('eduassists_users', JSON.stringify(existingUsers));
//             localStorage.setItem('current_user', JSON.stringify(userInfo));
//             return userInfo;
//         } catch (error) {
//             console.error("Error saving user data:", error);
//             return null;
//         }
//     };

//     // Get user data from localStorage
//     const getUserData = (uid) => {
//         try {
//             const users = JSON.parse(localStorage.getItem('eduassists_users')) || [];
//             const userData = users.find(u => u.uid === uid);

//             // If not found in localStorage, check current_user
//             if (!userData) {
//                 const currentUser = JSON.parse(localStorage.getItem('current_user'));
//                 if (currentUser && currentUser.uid === uid) {
//                     return currentUser;
//                 }
//             }
//             return userData || null;
//         } catch (error) {
//             console.error("Error getting user data:", error);
//             return null;
//         }
//     };

//     // Create user with email/password and additional data
//     const createUser = async (email, password, additionalData = {}) => {
//         setLoading(true);
//         try {
//             const result = await createUserWithEmailAndPassword(auth, email, password);

//             // Prepare user data
//             const userData = {
//                 uid: result.user.uid,
//                 email: email,
//                 displayName: additionalData.fullName || additionalData.name || "User",
//                 photoURL: additionalData.photoURL || `https://ui-avatars.com/api/?name=${additionalData.fullName || additionalData.name || "User"}&background=random`,
//                 role: additionalData.role || "student",
//                 phone: additionalData.phone || "",
//                 district: additionalData.district || "",
//                 area: additionalData.area || "",
//                 createdAt: new Date().toISOString(),
//                 lastLogin: new Date().toISOString(),
//                 status: "active"
//             };

//             // Update Firebase profile
//             await updateProfile(result.user, {
//                 displayName: userData.displayName,
//                 photoURL: userData.photoURL
//             });

//             // Save user data
//             const savedData = saveUserData(userData);

//             // Update state
//             setUser(result.user);
//             setUserData(savedData);

//             return { success: true, user: result.user, userData: savedData };
//         } catch (error) {
//             console.error("Registration error:", error);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Sign in with email/password
//     const signIn = async (email, password) => {
//         setLoading(true);
//         try {
//             const result = await signInWithEmailAndPassword(auth, email, password);

//             // Get user data
//             let storedUserData = getUserData(result.user.uid);

//             if (!storedUserData) {
//                 // Create basic user data if not found
//                 storedUserData = {
//                     uid: result.user.uid,
//                     email: result.user.email,
//                     displayName: result.user.displayName || "User",
//                     photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName || "User"}&background=random`,
//                     role: "student",
//                     lastLogin: new Date().toISOString()
//                 };
//             } else {
//                 // Update last login
//                 storedUserData.lastLogin = new Date().toISOString();
//             }

//             // Save user data
//             const savedData = saveUserData(storedUserData);

//             // Update state
//             setUser(result.user);
//             setUserData(savedData);

//             return { success: true, user: result.user, userData: savedData };
//         } catch (error) {
//             console.error("Login error:", error);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Sign in with Google
//     const signInWithGoogle = async () => {
//         setLoading(true);
//         try {
//             const result = await signInWithPopup(auth, googleProvider);

//             let storedUserData = getUserData(result.user.uid);

//             if (!storedUserData) {
//                 // Create new user data for Google sign-in
//                 storedUserData = {
//                     uid: result.user.uid,
//                     email: result.user.email,
//                     displayName: result.user.displayName,
//                     photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName}&background=random`,
//                     role: "student",
//                     phone: "",
//                     provider: "google",
//                     createdAt: new Date().toISOString(),
//                     lastLogin: new Date().toISOString(),
//                     status: "active"
//                 };
//             } else {
//                 // Update last login
//                 storedUserData.lastLogin = new Date().toISOString();
//             }

//             // Save user data
//             const savedData = saveUserData(storedUserData);

//             // Update state
//             setUser(result.user);
//             setUserData(savedData);

//             return { success: true, user: result.user, userData: savedData };
//         } catch (error) {
//             console.error("Google login error:", error);
//             if (error.code !== 'auth/cancelled-popup-request') {
//                 throw error;
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Sign in with Facebook
//     const signInWithFacebook = async () => {
//         setLoading(true);
//         try {
//             const result = await signInWithPopup(auth, facebookProvider);

//             let storedUserData = getUserData(result.user.uid);

//             if (!storedUserData) {
//                 // Create new user data for Facebook sign-in
//                 storedUserData = {
//                     uid: result.user.uid,
//                     email: result.user.email,
//                     displayName: result.user.displayName,
//                     photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName}&background=random`,
//                     role: "student",
//                     phone: "",
//                     provider: "facebook",
//                     createdAt: new Date().toISOString(),
//                     lastLogin: new Date().toISOString(),
//                     status: "active"
//                 };
//             } else {
//                 // Update last login
//                 storedUserData.lastLogin = new Date().toISOString();
//             }

//             // Save user data
//             const savedData = saveUserData(storedUserData);

//             // Update state
//             setUser(result.user);
//             setUserData(savedData);

//             return { success: true, user: result.user, userData: savedData };
//         } catch (error) {
//             console.error("Facebook login error:", error);
//             if (error.code !== 'auth/cancelled-popup-request') {
//                 throw error;
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Logout
//     const logOut = async () => {
//         setLoading(true);
//         try {
//             await signOut(auth);
//             setUser(null);
//             setUserData(null);
//             localStorage.removeItem('current_user');
//             return { success: true };
//         } catch (error) {
//             console.error("Logout error:", error);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Auth state listener - FIXED to properly sync userData
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);

//                 // Try to get user data from localStorage
//                 let storedUserData = getUserData(currentUser.uid);

//                 if (!storedUserData) {
//                     // Create basic user data if not found
//                     storedUserData = {
//                         uid: currentUser.uid,
//                         email: currentUser.email,
//                         displayName: currentUser.displayName || "User",
//                         photoURL: currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || "User"}&background=random`,
//                         role: "student",
//                         lastLogin: new Date().toISOString()
//                     };
//                     saveUserData(storedUserData);
//                 }

//                 setUserData(storedUserData);
//                 localStorage.setItem('current_user', JSON.stringify(storedUserData));
//             } else {
//                 setUser(null);
//                 setUserData(null);
//                 localStorage.removeItem('current_user');
//             }
//             setLoading(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     const authInfo = {
//         user,
//         userData,
//         loading,
//         createUser,
//         signIn,
//         signInWithGoogle,
//         signInWithFacebook,
//         logOut
//     };

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;


// new code 33333

import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase/firebase.init";
import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Save user data to localStorage
    const saveUserData = (userInfo) => {
        try {
            const existingUsers = JSON.parse(localStorage.getItem('eduassists_users')) || [];
            const userIndex = existingUsers.findIndex(u => u.uid === userInfo.uid);

            if (userIndex >= 0) {
                existingUsers[userIndex] = { ...existingUsers[userIndex], ...userInfo };
            } else {
                existingUsers.push(userInfo);
            }

            localStorage.setItem('eduassists_users', JSON.stringify(existingUsers));
            localStorage.setItem('current_user', JSON.stringify(userInfo));

            // Also save referral data if exists
            const referredBy = localStorage.getItem('referred_by');
            if (referredBy && userInfo.uid) {
                const referralData = {
                    referralCode: referredBy,
                    referredUserId: userInfo.uid,
                    referredUserName: userInfo.displayName || userInfo.email,
                    referralDate: new Date().toISOString(),
                    status: 'pending'
                };

                const existingReferrals = JSON.parse(localStorage.getItem('eduassists_referrals')) || [];
                existingReferrals.push(referralData);
                localStorage.setItem('eduassists_referrals', JSON.stringify(existingReferrals));

                // Clear the referral after saving
                localStorage.removeItem('referred_by');
            }

            return userInfo;
        } catch (error) {
            console.error("Error saving user data:", error);
            return null;
        }
    };

    // Get user data from localStorage
    const getUserData = (uid) => {
        try {
            const users = JSON.parse(localStorage.getItem('eduassists_users')) || [];
            const userData = users.find(u => u.uid === uid);

            // If not found in localStorage, check current_user
            if (!userData) {
                const currentUser = JSON.parse(localStorage.getItem('current_user'));
                if (currentUser && currentUser.uid === uid) {
                    return currentUser;
                }
            }
            return userData || null;
        } catch (error) {
            console.error("Error getting user data:", error);
            return null;
        }
    };

    // Update user data
    const updateUserData = async (uid, updates) => {
        try {
            const existingUsers = JSON.parse(localStorage.getItem('eduassists_users')) || [];
            const userIndex = existingUsers.findIndex(u => u.uid === uid);

            if (userIndex >= 0) {
                existingUsers[userIndex] = { ...existingUsers[userIndex], ...updates };
                localStorage.setItem('eduassists_users', JSON.stringify(existingUsers));

                // Update current_user if it's the same user
                const currentUser = JSON.parse(localStorage.getItem('current_user'));
                if (currentUser && currentUser.uid === uid) {
                    localStorage.setItem('current_user', JSON.stringify({ ...currentUser, ...updates }));
                }

                // Update state if this is the current user
                if (user && user.uid === uid) {
                    setUserData(prev => ({ ...prev, ...updates }));
                }

                return { success: true, updatedData: existingUsers[userIndex] };
            }
            return { success: false, error: "User not found" };
        } catch (error) {
            console.error("Error updating user data:", error);
            return { success: false, error: error.message };
        }
    };

    // Create user with email/password and additional data
    const createUser = async (email, password, additionalData = {}) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Prepare user data - Make sure role is saved properly
            const userData = {
                uid: result.user.uid,
                email: email,
                displayName: additionalData.fullName || additionalData.name || "User",
                photoURL: additionalData.photoURL || `https://ui-avatars.com/api/?name=${additionalData.fullName || additionalData.name || "User"}&background=random`,
                role: additionalData.role || "student", // This is crucial for role-based navigation
                phone: additionalData.phone || "",
                district: additionalData.district || "",
                area: additionalData.area || "",
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                status: "active",
                referralCode: `REF-${result.user.uid.substring(0, 8).toUpperCase()}`, // Generate referral code
                totalReferred: 0,
                earnedCommission: 0
            };

            // Update Firebase profile
            await updateProfile(result.user, {
                displayName: userData.displayName,
                photoURL: userData.photoURL
            });

            // Save user data
            const savedData = saveUserData(userData);

            // Update state
            setUser(result.user);
            setUserData(savedData);

            return {
                success: true,
                user: result.user,
                userData: savedData,
                role: savedData.role // Return role explicitly for navigation
            };
        } catch (error) {
            console.error("Registration error:", error);

            // Enhanced error handling
            let errorMessage = "Failed to create account. Please try again.";
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = "Email already in use. Please use a different email.";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Password is too weak. Please use at least 6 characters.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Invalid email address.";
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = "Email/password accounts are not enabled. Please contact support.";
                    break;
                default:
                    errorMessage = error.message || errorMessage;
            }

            const enhancedError = new Error(errorMessage);
            enhancedError.code = error.code;
            throw enhancedError;
        } finally {
            setLoading(false);
        }
    };

    // Sign in with email/password
    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);

            // Get user data
            let storedUserData = getUserData(result.user.uid);

            if (!storedUserData) {
                // Create basic user data if not found
                storedUserData = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName || "User",
                    photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName || "User"}&background=random`,
                    role: "student", // Default to student if not found
                    lastLogin: new Date().toISOString(),
                    status: "active"
                };
            } else {
                // Update last login
                storedUserData.lastLogin = new Date().toISOString();
            }

            // Save user data
            const savedData = saveUserData(storedUserData);

            // Update state
            setUser(result.user);
            setUserData(savedData);

            return {
                success: true,
                user: result.user,
                userData: savedData,
                role: savedData.role // Return role for navigation
            };
        } catch (error) {
            console.error("Login error:", error);

            // Enhanced error handling
            let errorMessage = "Invalid email or password.";
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Incorrect password. Please try again.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many failed attempts. Please try again later.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "This account has been disabled. Please contact support.";
                    break;
                default:
                    errorMessage = error.message || errorMessage;
            }

            const enhancedError = new Error(errorMessage);
            enhancedError.code = error.code;
            throw enhancedError;
        } finally {
            setLoading(false);
        }
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);

            let storedUserData = getUserData(result.user.uid);

            if (!storedUserData) {
                // Create new user data for Google sign-in
                storedUserData = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName}&background=random`,
                    role: "student", // Default role for Google sign-in
                    phone: "",
                    provider: "google",
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    status: "active",
                    referralCode: `REF-${result.user.uid.substring(0, 8).toUpperCase()}`,
                    totalReferred: 0
                };
            } else {
                // Update last login
                storedUserData.lastLogin = new Date().toISOString();
            }

            // Save user data
            const savedData = saveUserData(storedUserData);

            // Update state
            setUser(result.user);
            setUserData(savedData);

            return {
                success: true,
                user: result.user,
                userData: savedData,
                role: savedData.role
            };
        } catch (error) {
            console.error("Google login error:", error);

            // Enhanced error handling
            let errorMessage = "Google sign-in failed. Please try again.";
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = "Sign-in popup was closed. Please try again.";
                    break;
                case 'auth/popup-blocked':
                    errorMessage = "Sign-in popup was blocked by your browser. Please allow popups for this site.";
                    break;
                case 'auth/unauthorized-domain':
                    errorMessage = "This domain is not authorized. Please contact support.";
                    break;
                default:
                    if (error.code !== 'auth/cancelled-popup-request') {
                        errorMessage = error.message || errorMessage;
                    }
            }

            if (error.code !== 'auth/cancelled-popup-request') {
                const enhancedError = new Error(errorMessage);
                enhancedError.code = error.code;
                throw enhancedError;
            }
        } finally {
            setLoading(false);
        }
    };

    // Sign in with Facebook
    const signInWithFacebook = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, facebookProvider);

            let storedUserData = getUserData(result.user.uid);

            if (!storedUserData) {
                // Create new user data for Facebook sign-in
                storedUserData = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL || `https://ui-avatars.com/api/?name=${result.user.displayName}&background=random`,
                    role: "student", // Default role for Facebook sign-in
                    phone: "",
                    provider: "facebook",
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString(),
                    status: "active",
                    referralCode: `REF-${result.user.uid.substring(0, 8).toUpperCase()}`,
                    totalReferred: 0
                };
            } else {
                // Update last login
                storedUserData.lastLogin = new Date().toISOString();
            }

            // Save user data
            const savedData = saveUserData(storedUserData);

            // Update state
            setUser(result.user);
            setUserData(savedData);

            return {
                success: true,
                user: result.user,
                userData: savedData,
                role: savedData.role
            };
        } catch (error) {
            console.error("Facebook login error:", error);

            // Enhanced error handling
            let errorMessage = "Facebook sign-in failed. Please try again.";
            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    errorMessage = "Sign-in popup was closed. Please try again.";
                    break;
                case 'auth/popup-blocked':
                    errorMessage = "Sign-in popup was blocked by your browser. Please allow popups for this site.";
                    break;
                case 'auth/unauthorized-domain':
                    errorMessage = "This domain is not authorized. Please contact support.";
                    break;
                case 'auth/account-exists-with-different-credential':
                    errorMessage = "An account already exists with the same email address but different sign-in credentials.";
                    break;
                default:
                    if (error.code !== 'auth/cancelled-popup-request') {
                        errorMessage = error.message || errorMessage;
                    }
            }

            if (error.code !== 'auth/cancelled-popup-request') {
                const enhancedError = new Error(errorMessage);
                enhancedError.code = error.code;
                throw enhancedError;
            }
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            setUserData(null);
            localStorage.removeItem('current_user');
            return { success: true };
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    //forgot password

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Check if user is franchise
    const isFranchise = () => {
        return userData?.role === 'franchise';
    };

    // Check if user is student
    const isStudent = () => {
        return userData?.role === 'student' || !userData?.role;
    };

    // Get user role
    const getUserRole = () => {
        return userData?.role || 'student';
    };

    // Auth state listener - FIXED to properly sync userData
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Try to get user data from localStorage
                let storedUserData = getUserData(currentUser.uid);

                if (!storedUserData) {
                    // Create basic user data if not found
                    storedUserData = {
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName || "User",
                        photoURL: currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.displayName || "User"}&background=random`,
                        role: "student", // Default role
                        lastLogin: new Date().toISOString(),
                        status: "active"
                    };
                    saveUserData(storedUserData);
                }

                setUserData(storedUserData);
                localStorage.setItem('current_user', JSON.stringify(storedUserData));

                // Log for debugging
                console.log("User authenticated:", {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    role: storedUserData.role
                });
            } else {
                setUser(null);
                setUserData(null);
                localStorage.removeItem('current_user');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        userData,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        signInWithFacebook,
        logOut,
        updateUserData,
        isFranchise,
        isStudent,
        getUserRole,
        resetPassword
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;