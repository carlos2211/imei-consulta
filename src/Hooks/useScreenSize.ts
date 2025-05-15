import { useEffect, useState } from "react";

interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      setScreenSize({
        isMobile: width < 600,
        isTablet: width >= 600 && width <= 1000,
        isDesktop: width > 1000,
      });
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // ejecuta al montar

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return screenSize;
};

export default useScreenSize;
