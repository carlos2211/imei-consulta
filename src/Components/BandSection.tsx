import React, { useState, useEffect } from "react";
import Frame1D from "../assets/img/Frame1D.png";
import Frame2D from "../assets/img/Frame2D.png";
import Frame3D from "../assets/img/Frame3D.png";
import Frame1M from "../assets/img/Frame1M.png";
import Frame2M from "../assets/img/Frame2M.png";
import Frame3M from "../assets/img/Frame3M.png";
import useIsMobile from "../Hooks/useIsMobile"; 
import { translations } from "../utils/translation";

interface Bands {
  language: "ES" | "EN";
}

const Bands: React.FC<Bands> = ({ language }) => {
  const  isMobile = useIsMobile(501);
   const t = translations[language];

  const Frame1 = isMobile ? Frame1M : Frame1D;
  const Frame2 = isMobile ? Frame2M : Frame2D;
  const Frame3 = isMobile ? Frame3M : Frame3D;

  return (
    <div className="w-full max-w-screen-lg text-center m-2 flex flex-col items-center gap-6">
      <span className="text-2xl font-bold">{t.faqs[1]}</span>
      <img src={Frame1} alt="Frame 1" className="w-full h-auto max-w-full" />
      <img src={Frame2} alt="Frame 2" className="w-full h-auto max-w-full" />
      <img src={Frame3} alt="Frame 3" className="w-full h-auto max-w-full" />
    </div>
  );
};

export default Bands;
