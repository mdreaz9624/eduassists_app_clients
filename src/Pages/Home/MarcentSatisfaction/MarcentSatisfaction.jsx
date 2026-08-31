


import { useEffect, useState } from "react";
// Assuming you have a relevant image, or update the path to a consultancy-themed one
import partnerPic from "../../../assets/customerSatisfied.jpg"; 
import { Link } from "react-router";

const MerchantSatisfaction = () => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => setFade(true), 100);
  }, []);

  return (
    <div data-aos="fade-right" className="my-10 px-4">
      <section
        className="
        bg-gradient-to-r from-[#002B5B] to-[#00A884] rounded-2xl
        py-16 px-6 shadow-2xl
      "
      >
        <div
          className={`
          max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center 
          transition-opacity duration-1000 ease-out
          ${fade ? "opacity-100" : "opacity-0"}
        `}
        >
          {/* Text Section */}
          <div className="text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Franchise Growth & Student Success is Our Core Mission
            </h2>

            <p className="text-lg text-gray-100 leading-relaxed">
              EduAssists is expanding its global footprint. We provide our 
              franchise partners with comprehensive training, high-value 
              resources, and 100% support in visa processing and university 
              placements. Join our network and empower students in every 
              corner of the country.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="btn bg-white text-[#002B5B] border-none font-bold hover:bg-gray-200 px-8">
                <Link to="/partnership">Become a Franchisee</Link>
              </button>

              <button className="btn bg-[#00F2A2] text-[#002B5B] border-none font-bold hover:bg-[#00c985] px-8">
                <Link to="/partnership">Partner with EduAssists</Link>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <div className="relative group">
              {/* Decorative background element */}
              <div className="absolute -inset-1 bg-white/20 rounded-xl blur transition duration-1000 group-hover:duration-200"></div>
              
              <img
                src={partnerPic}
                alt="EduAssists Global Partners"
                className="relative w-full max-w-md rounded-xl shadow-2xl
                transform transition-all duration-1000
                hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchantSatisfaction;