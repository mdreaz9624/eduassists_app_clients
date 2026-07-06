import connected from "../../../assets/connectedHE.PNG";
import Kangaroo from "../../../assets/KangarooGlobal.PNG";
import kcoverses from "../../../assets/KCOverses.PNG";
import tensai from "../../../assets/tensaiStudy.PNG";
import doftify from "../../../assets/DroptifyLogo_final.JPG";
import eduexpress from "../../../assets/eduExpress.PNG";

const SupportedCompanies = () => {
  const companies = [
    { name: "ConnectedHE", logo: connected },
    { name: "KangarooGlobal", logo: Kangaroo },
    { name: "KCOverses", logo: kcoverses },
    { name: "TensaiStudyAbroad", logo: tensai },
    { name: "Droptify", logo: doftify },
    { name: "EduExpress", logo: eduexpress }
  ];

  return (
    <section className="py-14 bg-base-100 overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-primary">
          Supported Companies
        </h2>
        <p className="text-base-content text-lg mt-2">
          Trusted by top brands & businesses across the country.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative overflow-hidden w-full">
        <div
          className="
            flex gap-12 px-6
            w-max
            animate-[scroll_40s_linear_infinite]
            hover:[animation-play-state:paused]
          "
        >
          {[...companies, ...companies].map((item, index) => (
            <div
              key={index}
              className="
                flex items-center justify-center
                bg-base-200
                rounded-xl shadow
                w-40 h-24
                p-4
                flex-shrink-0
              "
            >
              <img
                src={item.logo}
                alt={item.name}
                className="
                  max-h-12
                  max-w-[120px]
                  object-contain
                  grayscale
                  hover:grayscale-0
                  transition duration-300
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* Inline Tailwind keyframes */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default SupportedCompanies;
