import React, { useState } from "react";
import { translations } from "../utils/translation";

interface FaqAccordionProps {
  language: "ES" | "EN";
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ language }) => {
  const t = translations[language];

  const faqs = [
  {
    question: t.faqs[0],
    answer: (
      <div className="text-left space-y-4">
        <div>
          <h3 className="font-bold text-lg">{t.faqs[2]}</h3>
          <hr className="my-2 border-gray-300" />
          <p>
           {t.faqs[3]}
          </p>

        </div>
        <div>
          <h3 className="font-bold text-lg">
            {t.faqs[4]}
          </h3>
            
          <hr className="my-2 border-gray-300" />
          <p>
           {t.faqs[5]}
          </p>
          <div  className="flex flex-col items-center">
          <button
            className="red-button px-4 mt-6" 
            onClick={() => window.open("https://www.clarochile.cl/personas/inscribe-imei/", "_blank")}
          >
            {t.faqs[8]}
          </button>

          </div>

        </div>
        <div>
          <h3 className="font-bold text-lg">{t.faqs[6]}</h3>
          <hr className="my-2 border-gray-300" />
          <p>
            {t.faqs[7]}
          </p>
        </div>
      </div>
    ),
  },
];

const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const toggle = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index)); 
    } else {
      setOpenIndexes([...openIndexes, index]); 
    }
  };

  return (
    <div className="w-full  py-3 px-0">
      <div className="w-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white shadow-md border-t border-gray-200 mb-4"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-4 flex justify-between items-center text-xl font-bold bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors"
            >
              <span className="text-center w-full">{faq.question}</span>
              <span className="w-7 h-7 flex items-center justify-center text-[#008C67] text-lg">
                {openIndexes.includes(index) ? "−" : "+"}
              </span>
            </button>
            {openIndexes.includes(index) && (
              <div className="px-6 py-4 bg-gray-100 text-sm text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
