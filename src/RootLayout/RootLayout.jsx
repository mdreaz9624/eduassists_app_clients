import { Outlet } from "react-router-dom";
import Navber from "../SharedPage/Navber/Navber";
import Footer from "../SharedPage/Footer/Footer";



const RootLayout = () => {
    return (
        <div className="font-roboto max-w-7xl mx-auto">
            <Navber />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout;