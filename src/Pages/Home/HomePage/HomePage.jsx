import EduAsistaAI from "../../../FunctionsAi/EduAssistaAI/EduAssistaAI";
import Bannar from "../Bannar/Bannar";
import CustomerFeedback from "../CustomerFeedback/CustomerFeedback";
import FaqComponent from "../FaqComponent/FaqComponent";
import HowItWorks from "../HowItWorks/HowItWorks";
import MarcentSatisfaction from "../MarcentSatisfaction/MarcentSatisfaction";
import OurServices from "../OurServices/OurServices";
import SupportedCompanies from "../SupportedCompanies/SupportedCompanies";
import FeaturesUniversity from "../../FeaturesUniversity/FeaturesUniversity"



const HomePage = () => {

    return (
        <div>
            <div>
                <Bannar></Bannar>
            </div>           
            <div>
                <EduAsistaAI></EduAsistaAI>
            </div>
            <div>
                <FeaturesUniversity></FeaturesUniversity>
            </div>
            <div className="mt-20">
                <HowItWorks></HowItWorks>
            </div>
            <div className="mt-20">
                <OurServices></OurServices>
            </div>
            <div className="mt-20">
                <SupportedCompanies></SupportedCompanies>
            </div>
            <div>
                <MarcentSatisfaction></MarcentSatisfaction>
            </div>
            <div className="mt-20">
                <CustomerFeedback></CustomerFeedback>
            </div>
            <div className="mt-20">
                <FaqComponent></FaqComponent>
            </div>

        </div>
    );

}

export default HomePage;