import { FaUserEdit, FaFileInvoiceDollar, FaPlaneDeparture, FaHome } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";

const HowItWorks = () => {
  const steps = [
    {
      title: "Expert Counseling",
      desc: "Receive personalized online or physical guidance to choose the right university and course for your future.",
      icon: <MdOutlineSupportAgent className="text-5xl text-primary" />,
    },
    {
      title: "Visa Processing",
      desc: "Our dedicated team handles your documentation and visa application, ensuring a smooth and hassle-free process.",
      icon: <FaFileInvoiceDollar className="text-5xl text-primary" />,
    },
    {
      title: "Flight Reservation",
      desc: "We assist with flight bookings to ensure you get the best student rates and a comfortable journey to your destination.",
      icon: <FaPlaneDeparture className="text-5xl text-primary" />,
    },
    {
      title: "Accommodation",
      desc: "Find a safe and affordable home abroad with our student-friendly accommodation search services.",
      icon: <FaHome className="text-5xl text-primary" />,
    },
  ];

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary">How EduAssists Works</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          <p className="text-lg text-base-content/80 mt-4">
            Your journey from home to your dream university in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-lg p-8 text-center border border-transparent hover:border-primary/30 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <div className="p-4 bg-primary/10 rounded-full">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-slate-800">{step.title}</h3>
              <p className="text-base-content/70 leading-relaxed italic">
                "{step.desc}"
              </p>
              
              {/* Optional: Step indicator */}
              <div className="mt-6 text-xs font-black text-primary/20 uppercase tracking-widest">
                Step 0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;