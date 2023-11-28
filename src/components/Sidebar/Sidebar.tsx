import React from "react";
import { motion } from "framer-motion";
import RoadmapCard from "../RoadmapCard/RoadmapCard";
import TagsCard from "../TagsCard/TagsCard";
import Box from "@mui/material/Box";

const sidebarVariants = {
  initial: {
    x: "-100vw",
  },
  animate: {
    x: "0vw",
    transition: {
      type: "tween",
      duration: 0.5,
      delay: 0.1,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      type: "tween",
      duration: 0.5,
    },
  },
};

const Sidebar: React.FC = () => {
  return (
    <motion.div
      className="fixed top-40 left-0 h-full z-30 bg-ghost-white md:hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={sidebarVariants}
    >
      <Box className="flex flex-col gap-6 px-6 pt-6">
        <TagsCard />
        <RoadmapCard />
      </Box>
    </motion.div>
  );
};

export default Sidebar;
