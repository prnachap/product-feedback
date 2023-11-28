import { motion } from "framer-motion";
import React, { useState } from "react";

type AnimatedHamburgerIconProps = {
  animate: string;
};

const hamburgerVariant = {
  initial: {
    opacity: 1,
    d: "M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z",
    rotate: 0,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  final: {
    opacity: 1,
    rotate: "180deg",
    transformOrigin: "center",
    d: "M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

const AnimatedHamburgerIcon: React.FC<AnimatedHamburgerIconProps> = ({
  animate,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen((prev) => !prev)}>
      <motion.svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
        <g fill="#FFF" fillRule="evenodd">
          <motion.path
            initial="initial"
            animate={open ? "final" : "initial"}
            variants={hamburgerVariant}
          />
        </g>
      </motion.svg>
    </div>
  );
};

export default AnimatedHamburgerIcon;
