


import React from "react";
import logo from "../../../src/assets/EduAssistLogo-removebg-preview.png";

const SupRideLogo = () => {
  return (
    <div className="flex flex-col items-center text-center font-roboto w-full px-2">
      
      {/* Main Logo Row */}
      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
        
        {/* Logo Image */}
        <div className="shrink-0">
          <img
            src={logo}
            alt="EduAssists Logo"
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
          />
        </div>

        {/* EDU + assists */}
        <div className="flex items-center gap-1">
          
          {/* EDU circles */}
          <div className="flex gap-1">
            {["E", "D", "U"].map((letter, idx) => (
              <div
                key={idx}
                className="bg-red-600 text-white rounded-full 
                w-6 h-6 sm:w-10 sm:h-10 
                flex items-center justify-center 
                font-bold text-xs sm:text-lg shadow-sm"
              >
                {letter}
              </div>
            ))}
          </div>

          {/* assists text */}
          <div className="text-lg sm:text-4xl font-extrabold text-[#FFDF00] leading-none">
            assists
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-[#AA6C39] text-[9px] sm:text-sm font-bold tracking-widest uppercase mt-1">
        Your Global Education Partner
      </div>
    </div>
  );
};

export default SupRideLogo;
