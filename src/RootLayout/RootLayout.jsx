import { Outlet } from "react-router-dom";
import Navber from "../SharedPage/Navber/Navber";
import Footer from "../SharedPage/Footer/Footer";

// max-w-7xl mx-auto

const RootLayout = () => {
    return (
        <div className="font-roboto">
            <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Navber />
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout;