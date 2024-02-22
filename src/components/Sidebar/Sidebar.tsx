import { logoutAction } from "@/lib/actions";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import React from "react";
import RoadmapCard from "../RoadmapCard/RoadmapCard";
import TagsCard from "../TagsCard/TagsCard";
import CustomMenuItem from "../UI/CustomMenuItem";

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
        <div className="flex justify-between items-center">
          <CustomMenuItem className="flex !justify-start !border-none gap-2">
            <SettingsIcon />
            <span>Settings</span>
          </CustomMenuItem>
          <CustomMenuItem className="flex !justify-start gap-2 !border-none">
            <LogoutIcon />
            <form action={logoutAction}>
              <button type="submit">Logout</button>
            </form>
          </CustomMenuItem>
        </div>
        <TagsCard />
        <RoadmapCard />
      </Box>
    </motion.div>
  );
};

export default Sidebar;
