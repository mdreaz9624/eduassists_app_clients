

import React from "react";
import logo from "../../../src/assets/EduAssistLogo-removebg-preview.png";

const SupRideLogo = () => {
  return (
    <div className="flex items-center gap-2">
      
      {/* Logo Image */}
      <div className="shrink-0">
        <img
          src={logo}
          alt="EduAssists Logo"
          className="w-8 h-8 md:w-10 md:h-10 object-contain"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-0.5 md:gap-1">
          
          {/* EDU circles */}
          <div className="flex gap-0.5 md:gap-1">
            {["E", "D", "U"].map((letter, idx) => (
              <div
                key={idx}
                className="bg-red-600 text-white rounded-full 
                w-5 h-5 md:w-6 md:h-6 
                flex items-center justify-center 
                font-bold text-[9px] md:text-xs shadow-sm"
              >
                {letter}
              </div>
            ))}
          </div>

          {/* assists text */}
          <div className="text-sm md:text-xl font-extrabold text-[#FFDF00] leading-none">
            assists
          </div>
        </div>

        {/* Tagline - Hidden on very small screens */}
        <div className="text-[#AA6C39] text-[6px] md:text-[8px] font-bold tracking-widest uppercase hidden sm:block leading-tight">
          Your Global Education Partner
        </div>
      </div>
    </div>
  );
};

export default SupRideLogo;