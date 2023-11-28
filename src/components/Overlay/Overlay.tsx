import { motion } from "framer-motion";
import React from "react";

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    type: "tween",
    duration: 2,
  },
  exit: {
    opacity: 0,
    type: "tween",
    duration: 0.5,
  },
};

type OverlayProps = { className?: string; children?: React.ReactNode };

const Overlay: React.FC<OverlayProps> = ({ className, children }) => {
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 h-full z-20 md:hidden ${className}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={overlayVariants}
    >
      {children}
    </motion.div>
  );
};

export default Overlay;
