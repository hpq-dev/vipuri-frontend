import { motion, useAnimationControls } from "framer-motion";
import door_img from "../assets/door.png";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export const Door: React.FC<{
  isOpen: boolean;
  isMounted: boolean;
}> = ({ isOpen, isMounted }) => {
  const controls = useAnimationControls();
  const [isClosedVisual, setIsClosedVisual] = useState(false);

  useEffect(() => {
    controls.start({ y: isOpen ? "-98%" : "-1%" });
  }, [isOpen, controls]);

  return (
    <motion.img
      src={door_img}
      alt="door"
      animate={controls}
      initial={{ y: "-100%" }}
      transition={
        isMounted ? { duration: 1, ease: "easeInOut" } : { duration: 0 }
      }
      onUpdate={(latest) => {
        const y =
          typeof latest.y === "string" ? parseFloat(latest.y) : latest.y;
        setIsClosedVisual(y <= -97.5);
      }}
      className={clsx(
        "absolute left-0 top-0 z-10 h-full w-full object-cover",
        isClosedVisual && "brightness-[0.6]"
      )}
    />
  );
};
