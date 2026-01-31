// import { use } from "react";
// import { AuthContext } from "../contents/AuthContext/AuthContext";



// const useAuth = () =>{
//     const authInfo = use(AuthContext);
//         return authInfo;
// };
// export default useAuth;

// new code deep

import { useContext } from "react";
import { AuthContext } from "../contents/AuthContext/AuthContext"; // Fixed path

const useAuth = () => {
    const authInfo = useContext(AuthContext);
    if (!authInfo) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authInfo;
};

export default useAuth;