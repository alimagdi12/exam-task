import React from "react";
import useAnimation from "./UseAnimation";

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

const AnimationWrapper: React.FC<AnimatedWrapperProps> = ({ children }) => {
  const animationClass = useAnimation();

  return <div className={animationClass}>{children}</div>;
};

export default AnimationWrapper;
