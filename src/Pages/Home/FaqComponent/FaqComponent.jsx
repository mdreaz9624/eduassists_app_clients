import { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FaqComponent = () => {
  const [faqList, setFaqList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // Load FAQ JSON from public folder
  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqList(data))
      .catch(() => setFaqList([]));
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-16 bg-base-200">
      {/* Title Section */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3">
          <FaQuestionCircle className="text-4xl text-primary" />
          <h2 className="text-3xl font-bold text-primary">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-base-content text-lg mt-2">
          Find answers to the most common questions from our Students.
        </p>
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto px-6">
        {faqList.length === 0 ? (
          <p className="text-center text-muted">No FAQs available.</p>
        ) : (
          faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="mb-4 bg-base-100 shadow-md rounded-xl transition-all"
              >
                {/* Question Section */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 text-left flex items-center justify-between focus:outline-none"
                >
                  <span className="font-semibold text-lg">{item.question}</span>

                  {/* Smooth rotating arrow */}
                  <span
                    className={`text-primary text-xl transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Answer Section: Smooth Fade + Slide */}
                <div
                  className={`px-4 text-base-content/80 overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-40 opacity-100 py-2" : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default FaqComponent;


