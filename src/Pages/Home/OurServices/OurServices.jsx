import { 
  FaUserGraduate, 
  FaPassport, 
  FaPlaneArrival, 
  FaHotel, 
  FaBriefcase, 
  FaGlobeAmericas 
} from "react-icons/fa";

const OurServices = () => {
  const services = [
    {
      title: "Global University Admissions",
      desc: "Expert guidance in selecting and applying to top-tier universities across the UK, USA, Canada, and Europe.",
      icon: <FaUserGraduate className="text-5xl text-primary" />,
    },
    {
      title: "Visa Success Support",
      desc: "Comprehensive visa file preparation and interview coaching to ensure a high success rate for your student visa.",
      icon: <FaPassport className="text-5xl text-primary" />,
    },
    {
      title: "Scholarship Assistance",
      desc: "We help you identify and apply for merit-based and need-based scholarships to fund your education.",
      icon: <FaBriefcase className="text-5xl text-primary" />,
    },
    {
      title: "Pre-Departure Briefing",
      desc: "Essential guidance on culture, weather, and laws of your destination country before you fly.",
      icon: <FaGlobeAmericas className="text-5xl text-primary" />,
    },
    {
      title: "Travel & Flight Booking",
      desc: "Special student-discounted airfare and flight reservation services to make your travel affordable.",
      icon: <FaPlaneArrival className="text-5xl text-primary" />,
    },
    {
      title: "Accommodation Setup",
      desc: "Assistance in finding safe, comfortable, and affordable housing near your chosen campus.",
      icon: <FaHotel className="text-5xl text-primary" />,
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-r from-[#002B5B] to-[#00A884] rounded-2xl mx-4 my-8">
      <div className="text-center mb-12">
        {/* Changed text to white for better contrast against the gradient */}
        <h2 className="text-4xl font-bold text-white mb-2">Our Premium Services</h2>
        <p className="text-white/90 text-lg max-w-2xl mx-auto px-4">
          From your first counseling session to your first day on campus, EduAssists provides complete 360° support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
        {services.map((item, i) => (
          <div
            key={i}
            className="card bg-white shadow-xl p-8 text-center hover:scale-105 transition-all duration-300 border-b-4 border-primary"
          >
            <div className="flex justify-center mb-5">
              <div className="p-4 bg-primary/10 rounded-xl">
                {item.icon}
              </div>
            </div>

            <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
