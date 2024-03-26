"use client";

import { AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import AnimatedHamburgerIcon from "../AnimatedSvgIcons/AnimatedHamburgerIcon";
import Overlay from "../Overlay/Overlay";
import Sidebar from "../Sidebar/Sidebar";
import { RoadMapStatsType } from "../../..";

const NavbarMobile = ({ status }: { status: RoadMapStatsType[] }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const handleSideBar = () => setToggleSidebar((prevState) => !prevState);

  const renderSidebar = () => {
    return (
      <AnimatePresence mode="wait">
        {toggleSidebar && (
          <Fragment>
            <Overlay />
            <Sidebar status={status} />
          </Fragment>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="sticky top-0 z-30">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-full max-w-none px-3 py-4 flex justify-between items-center relative z-50 md:hidden">
        <div>
          <h2 className="secondary-text text-white">Frontend Mentor</h2>
          <span className="body-two-text text-white">Feedback board</span>
        </div>
        <div onClick={handleSideBar}>
          <AnimatedHamburgerIcon animate={"animate"} />
        </div>
      </div>
      {renderSidebar()}
    </div>
  );
};

export default NavbarMobile;
