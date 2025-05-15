import React, { JSX, useState } from "react";
import imgBandsD from "../assets/img/imgBandsD.png";
import imgBandsM from "../assets/img/imgBandsM.png";
import FaqAccordion from "./FaqAccordion";
import Stages from "./Stages";
import Bands from "./BandSection";
// import useIsMobile from "../Hooks/useIsMobile";
import { translations } from "../utils/translation";
import useScreenSize from "../Hooks/useScreenSize";

const Home = () => {
  const [showInitialContent, setShowInitialContent] = useState(true);
  const [componenteFinal, setComponenteFinal] = useState<JSX.Element | null>(
    null
  );
  const [language, setLanguage] = useState<"ES" | "EN">("ES");
  const { isMobile, isTablet, isDesktop } = useScreenSize();
  const t = translations[language];

  const ImgBands = isMobile ? imgBandsM : imgBandsD;

  const handleResetConsulta = () => {
    setComponenteFinal(null);
    setShowInitialContent(true);
  };

  return (
    <div className="text-center p-10 flex flex-col items-center gap-4">
      {showInitialContent ? (
        <>
          <h1 className="text-4xl font-bold text-black-500">{t.home.title}</h1>
          
          {/* DESCOMENTAR PARA ACTIVAR ELECCION IDIOMA */}
          {/* <span className="text-lg">{t.home.selectLang}</span>
          <div className="relative inline-block">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "ES" | "EN")}
              className="border px-4 py-2 rounded-xl min-w-72 appearance-none bg-white text-black pr-10"
            >
              <option value="ES">Español</option>
              <option value="EN">English</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-700">
              ▼
            </div>
          
          </div> */}

          <Stages
            language={language}
            onRenderFinal={(componente) => {
              const componenteConReset = React.cloneElement(componente, {
                onReset: handleResetConsulta,
              });

              setComponenteFinal(componenteConReset);
              setShowInitialContent(false);
            }}
          />

          <FaqAccordion language={language} />
          <Bands language={language} />

          <div className="w-full max-w-screen-lg text-center m-2 flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold text-black">
              {t.home.bandTitle}
            </h1>
            <span className="max-w-xl">
              {t.home.bandText}&nbsp;
              <a
                href="https://www.clarochile.cl/personas/5g/"
                className="text-[#009CB1] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.clarochile.cl/personas/5g/
              </a>
            </span>
            <img
              src={ImgBands}
              alt="Bandas"
              className="w-full h-auto max-w-full"
            />
          </div>
        </>
      ) : (
        componenteFinal && <div className="w-full">{componenteFinal}</div>
      )}
    </div>
  );
};

export default Home;
