import { useEffect, useState } from "react";

const useAnimation = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return animate ? "component-fade-in" : "";
};

export default useAnimation;
