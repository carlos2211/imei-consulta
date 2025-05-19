import React, { JSX, useState } from "react";
import imgStage1D from "../assets/img/Stage1.png";
import imgStage2D from "../assets/img/Stage2.png";
import imgStage3D from "../assets/img/Stage3.png";
import useIsMobile from "../Hooks/useIsMobile";
import { translations } from "../utils/translation";
import EnrolledLockedDevice from "./Views/EnrolledLockedDevice";
import RegisteredUnlockedDevice from "./Views/RegisteredUnlockedDevice";
import UnregisteredDevice from "./Views/UnregisteredDevice";

import useScreenSize from "../Hooks/useScreenSize";

const Stages = ({
  language,
  onRenderFinal,
}: {
  language: "ES" | "EN";
  onRenderFinal: (componente: JSX.Element) => void;
}) => {
  const [imei, setImei] = useState("");
  // const isMobile = useIsMobile(640);
    const { isMobile, isTablet, isDesktop } = useScreenSize();
  const t = translations[language];

  const handleClick = async () => {
    if (!imei) {
      alert("Por favor, ingresa un IMEI.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imei", imei);
      formData.append("lang", language);

      const response = await fetch(
        "https://migracion.clarochilepromociones.com/consulta_imei/inc/registros.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      const data = result[1];

      if (data.estado_claro === "Equipo Desbloqueado" && data.baseOabi !== "") {
        onRenderFinal(
          <RegisteredUnlockedDevice
            data={data}
            onReset={() => {
              setImei("");
              onRenderFinal(<></>);
            }}
          />
        );
      } else if (
        data.estado_claro !== "Equipo Desbloqueado" &&
        data.tipoInscripcion
      ) {
        onRenderFinal(
          <EnrolledLockedDevice
            data={data}
            onReset={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
      } else {
        onRenderFinal(
          <UnregisteredDevice
            data={data}
            onReset={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
      }
      console.log("Respuesta de la API:", result);
    } catch (error) {
      console.error("Error al consultar el IMEI:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-10">
      {isMobile ? (
        <div className="relative flex flex-col items-start max-w-5xl w-full mb-10">
          <div className="absolute top-[32px] bottom-[115px] w-1 z-0 bg-[#008C67]" />
          <div className="flex flex-col gap-4 pl-2 w-full">
            {[1, 2, 3, 4].map((num, idx) => (
              <div key={num} className="flex items-start gap-4 relative">
                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#008C67] text-white flex items-center justify-center font-bold mt-1 ml-[-22px]">
                  {num}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-sm w-[120px] text-[#008C67] mt-2 h-14 font-bold leading-tight">
                    {t.steps[idx]}
                  </p>
                  {idx < 3 ? (
                    <img
                      src={[imgStage1D, imgStage2D, imgStage3D][idx]}
                      className="w-36 h-auto ml-40 mt-[-70px]"
                      alt={`Stage ${num}`}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 mt-[-60px] ml-36">
                      <label>{t.inputLabel}</label>

                      <input
                        className="border border-black px-2 py-1 rounded-xl w-40 h-10 text-center"
                        type="text"
                        value={imei}
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(/\D/g, "");
                          setImei(cleaned);
                        }}
                        onKeyDown={(e) => {
                          const allowedKeys = [
                            "Backspace",
                            "Tab",
                            "ArrowLeft",
                            "ArrowRight",
                            "Delete",
                          ];
                          if (
                            (e.ctrlKey || e.metaKey) &&
                            e.key.toLowerCase() === "v"
                          )
                            return;
                          if (
                            !/^\d$/.test(e.key) &&
                            !allowedKeys.includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault(); 
                          const pasted = e.clipboardData.getData("Text");
                          const cleaned = pasted.replace(/\D/g, ""); 
                          setImei((prev) => (prev + cleaned).substring(0, 15));
                        }}
                        placeholder={t.inputLabel}
                        maxLength={15}
                      />

                      <button
                        style={{ color: "#AF272F", borderColor: "#AF272F" }}
                        className="px-4 py-2 rounded-full border w-40 h-10"
                        onClick={handleClick}
                      >
                        {t.buttonText}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) 
      : isTablet ? (
        <div className="relative flex flex-col items-start max-w-5xl w-full mb-10">
          <div className="relative w-full max-w-5xl flex justify-between items-center ">
            <div className="absolute left-[12.5%] right-[12.5%] h-1 z-0 bg-[#008C67]" />
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="relative z-10 flex flex-col items-center w-1/4"
              >
                <div className="w-10 h-10 rounded-full bg-[#008C67] text-white flex items-center justify-center font-bold mb-2">
                  {num}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-6 w-full max-w-5xl text-center">
            <div>
              <p className="text-[#008C67] h-12">{t.steps[0]}</p>
              <img src={imgStage1D} alt="Stage 1" className="ml-4 w-37 mt-12" />
            </div>
            <div>
              <p className="text-[#008C67] h-12">{t.steps[1]}</p>
              <img src={imgStage2D} alt="Stage 2" className="ml-4 mt-12 w-37" />
            </div>
            <div>
              <p className="text-[#008C67] h-12">{t.steps[2]}</p>
              <img src={imgStage3D} alt="Stage 3" className="ml-4 mt-12 w-37" />
            </div>
            <div>
              <p className="text-[#008C67] h-12">{t.steps[3]}</p>
              <div className="flex flex-col items-center gap-2 mt-14 w">
                <input
                  className="border border-black px-2 py-1 rounded-xl w-32 h-10 text-center"
                  type="text"
                  value={imei}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "");
                    setImei(cleaned);
                  }}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                    ];
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v")
                      return;
                    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasted = e.clipboardData.getData("Text");
                    const cleaned = pasted.replace(/\D/g, ""); 
                    setImei((prev) => (prev + cleaned).substring(0, 15));
                  }}
                  placeholder={t.inputLabel}
                  maxLength={15}
                />

                <button className="red-button w-32 h-10" onClick={handleClick}>
                  {t.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ):
      (
        <div className="flex flex-col items-center w-full px-4">
          <div className="relative w-full max-w-5xl flex justify-between items-center ">
            <div className="absolute left-[12.5%] right-[12.5%] h-1 z-0 bg-[#008C67]" />
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="relative z-10 flex flex-col items-center w-1/4"
              >
                <div className="w-10 h-10 rounded-full bg-[#008C67] text-white flex items-center justify-center font-bold mb-2">
                  {num}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-6 w-full max-w-5xl text-center">
            <div>
              <p className="text-[#008C67] h-12">{t.steps[0]}</p>
              <img src={imgStage1D} alt="Stage 1" className="ml-12 w-37" />
            </div>
            <div>
              <p className="text-[#008C67] h-12">{t.steps[1]}</p>
              <img src={imgStage2D} alt="Stage 2" className="ml-12 w-37" />
            </div>
            <div>
              <p className="text-[#008C67] h-12">{t.steps[2]}</p>
              <img src={imgStage3D} alt="Stage 3" className="ml-12 w-37" />
            </div>
            <div>
              <p className="text-[#008C67] h-12">{t.steps[3]}</p>
              <div className="flex flex-col items-center gap-2 mt-5">
                <input
                  className="border border-black px-2 py-1 rounded-xl w-40 h-10 text-center"
                  type="text"
                  value={imei}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "");
                    setImei(cleaned);
                  }}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                    ];
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "v")
                      return;
                    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasted = e.clipboardData.getData("Text");
                    const cleaned = pasted.replace(/\D/g, ""); 
                    setImei((prev) => (prev + cleaned).substring(0, 15));
                  }}
                  placeholder={t.inputLabel}
                  maxLength={15}
                />

                <button className="red-button w-40 h-10" onClick={handleClick}>
                  {t.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stages;
