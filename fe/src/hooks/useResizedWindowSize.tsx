import { useEffect, useState } from "react";

interface windowSizeCustomType {
  windowWidth: number;
  windowHeight: number;
}

const useResizedWindowSize = (): windowSizeCustomType => {
  const [windowSizeobj, setWindowSizeObj] = useState({
    windowWidth: document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight,
  });

  const handleResize = () => {
    setWindowSizeObj({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return () => window.removeEventListener("resize", () => {
        return null;
      });
    }
  }, []);
  return windowSizeobj;
}

export default useResizedWindowSize;