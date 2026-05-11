import { Outlet } from "react-router-dom";
import Navber from "../../SharedPage/Navber/Navber";
import loginandregistration from "../../assets/login&registration.jpg"// Removed one "../"

const AuthLayout = () => {
    return (
        <div>
            <Navber></Navber>
            {/* <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={loginandregistration}
                        className="max-w-sm rounded-lg shadow-2xl"
                        alt="Authentication visual"
                    />
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div> */}
            <Outlet />
        </div>
    );
};

export default AuthLayout;