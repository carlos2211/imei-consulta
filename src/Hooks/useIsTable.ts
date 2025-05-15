import { useEffect, useState } from "react";

const useIsTablet = (): boolean => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 600 && width <= 1000);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // evalúa al montar

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet;
};

export default useIsTablet;
