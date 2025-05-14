import React from "react";
import { translations } from "../../utils/translation";
import frown from "../../assets/img/frown.png";

interface UnregisteredDeviceProps {
  data: any;
}

const UnregisteredDevice = ({
  data,
  onReset,
}: {
  data: any;
  onReset: () => void;
}) => {
  const language = "EN";
  const t = translations[language];
  return (
    <div className="flex flex-col items-center mx-auto max-w-[900px] px-4">
      <img src={frown} alt="Frown" className="w-20 h-20 mx-auto " />
      <h1 className="text-2xl font-bold text-[#DA291C] text-center mt-10">
        <span className="block sm:inline">IMEI Consultado:</span>{" "}
        <span className="block sm:inline">{data.imeiNumber}</span>
      </h1>
      <div className="flex flex-col items-center gap-4 mt-4">
        <p className="text-lg">
          Tu equipo{" "}
          <span className="text-[#DA291C] font-bold">
            no se encuentra inscrito en el sistema y no puede funcionar en las
            redes móviles nacionales.
          </span>{" "}
          Si tu equipo lo trajiste desde el extranjero, lo debes inscribir.
          Ingresa a{" "}
          <a
            href="https://multibanda.cl/ia"
            className="text-[#0097A9] underline font-bold line"
          >
            multibanda.cl/ia
          </a>{" "}
          , para conocer el procedimiento.
        </p>
        <p className="text-lg">
          Si tu equipo fue adquirido en Chile y aparece como no inscrito, es
          porque no está homologado y quedará inhabilitado para su uso en las
          redes nacionales transcurrido el plazo de 30 días contado desde la
          fecha que insertes por primera vez un chip.
        </p>
        <p className="text-lg">
          Puedes solicitar a la empresa que te lo vendió que, de acuerdo a lo
          que indica la Ley del Consumidor, proceda a: La devolución del dinero
          o el cambio de equipo por uno homologado y eventualmente,
          indemnización de daños y perjuicios (esto último, en tribunales).
        </p>

        <div className="bg-[#F5F7FC] py-6 px-8 rounded-3xl mt-4 ">
          <p className="font-bold my-2">
            Todos los IMEI de los equipos móviles, tanto teléfonos como otros
            dispositivos, deberán estar inscritos en un sistema centralizado
            para poder operar en las redes nacionales.
          </p>
          <p>
            Multibanda SAE – Ver información detallada en{" "}
            <a
              href="https://multibanda.cl"
              className="text-[#0097A9] underline font-bold line"
            >
              https://multibanda.cl
            </a>
          </p>
        </div>
        <button
          className="red-button px-4 mt-6"
          onClick={() =>
            window.open(
              "https://www.clarochile.cl/personas/inscribe-imei/",
              "_blank"
            )
          }
        >
          Inscripción Administrativa
        </button>
        <button className="red-button " onClick={onReset}>
          Consultar otro IMEI
        </button>
      </div>
    </div>
  );
};

export default UnregisteredDevice;
