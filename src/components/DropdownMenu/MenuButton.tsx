import { AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import AnimatedDropdownIcon from "../AnimatedSvgIcons/AnimatedDropdownIcon";
import MenuList from "./MenuList";

type SortByDropdownProps<T> = {
  options: T[];
  children?: React.ReactNode;
};

function SortByDropdown<T extends string | number>({
  options,
}: SortByDropdownProps<T>) {
  const [selectedMenuOption, setSelectedMenuOption] = useState(options[0]);
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);

  const onClickOutside = () => setOpenMenu(false);
  useClickOutside({ ref: dropdownRef, onClickOutside });

  const animate = openMenu ? "animate" : "initial";

  const handleMenu = () => setOpenMenu(!openMenu);
  const handleMenuList = (option: T) => {
    setSelectedMenuOption(option);
    setOpenMenu(false);
  };

  const renderDropdownList = () => {
    return (
      <AnimatePresence>
        {openMenu && (
          <div className="w-[200px] absolute top-12 -z-10">
            <MenuList<T>
              value={selectedMenuOption}
              onChange={handleMenuList}
              listItems={options}
            />
          </div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center bg-american-blue-200 text-white text-[0.8125rem] md:text-sm rounded-lg"
        onClick={handleMenu}
      >
        <span className="font-normal">Sort By:</span>
        <span className="font-bold ml-1 capitalize">{selectedMenuOption}</span>
        <span className="mt-1 ml-[2px] md:ml-1">
          <AnimatedDropdownIcon animate={animate} />
        </span>
      </button>
      {renderDropdownList()}
    </div>
  );
}

export default SortByDropdown;
