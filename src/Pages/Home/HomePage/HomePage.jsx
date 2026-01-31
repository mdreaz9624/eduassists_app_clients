import EduAsistaAI from "../../../FunctionsAi/EduAssistaAI/EduAssistaAI";
import FilterRow from "../../FiteringSystem/FilterRow";
import Bannar from "../Bannar/Bannar";
import CustomerFeedback from "../CustomerFeedback/CustomerFeedback";
import FaqComponent from "../FaqComponent/FaqComponent";
import HowItWorks from "../HowItWorks/HowItWorks";
import MarcentSatisfaction from "../MarcentSatisfaction/MarcentSatisfaction";
import OurServices from "../OurServices/OurServices";
import SupportedCompanies from "../SupportedCompanies/SupportedCompanies";


const HomePage = () => {

    return (
        <div>
            <div>
                <Bannar></Bannar>
            </div>
            <div>
                <FilterRow></FilterRow>
            </div>
            <div>
                <EduAsistaAI></EduAsistaAI>
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