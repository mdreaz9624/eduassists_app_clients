import { Outlet } from "react-router-dom";
import Navber from "../SharedPage/Navber/Navber";
import Footer from "../SharedPage/Footer/Footer";
import AdPopup from "../Pages/AdPopUp/AdPopup";

// max-w-7xl mx-auto

const RootLayout = () => {
    return (
        <div className="font-roboto">
            <div  className="max-w-7xl mx-auto">
                <Navber />
            </div>
            <AdPopup />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout;