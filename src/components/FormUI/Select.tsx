import { useClickOutside } from "@/hooks/useClickOutside";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { gte, lt } from "lodash";
import React, { KeyboardEvent, useRef, useState } from "react";
import IconCheck from "../../../public/assets/shared/icon-check.svg";
import AnimatedDropdownIcon from "../AnimatedSvgIcons/AnimatedDropdownIcon";

type SelectProps = {
  options: string[];
  id?: string;
  value: string;
  onChange: (option: string) => void;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange">;

const SelectVariant = {
  initial: {
    opacity: 0,
    y: "-10px",
  },
  final: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: "-10px",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, id, value, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const animate = isOpen ? "animate" : "initial";
    const selectRef = useRef<HTMLDivElement | null>(null);

    useClickOutside({ ref: selectRef, onClickOutside });

    function onClickOutside() {
      setIsOpen(false);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div
        className={`relative bg-[#F7F8FD] rounded-md ${props.className}`}
        ref={selectRef}
      >
        <div
          ref={ref}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={id}
          aria-describedby={props["aria-describedby"]}
          tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={clsx(`customInput bg-[#F7F8FD])}`, {
            capitalize: gte(value?.length, 3),
            uppercase: lt(value?.length, 3),
          })}
        >
          {value}
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={SelectVariant}
              initial="initial"
              animate="final"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              role="listbox"
              className="absolute top-full mt-4 w-full border bg-white z-10 rounded-md"
            >
              {options.map((option, index) => (
                <div
                  key={index}
                  role="option"
                  aria-selected={option === value}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    `px-6 py-3 hover:text-purple-1000 cursor-pointer  border-b border-american-blue-100 border-opacity-20 last:border-none body-one-text text-dark-blue-gray transition-colors ease-in-out duration-75`,
                    {
                      capitalize: gte(option?.length, 3),
                      uppercase: lt(option?.length, 3),
                    }
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>{option}</div>
                    {option === value ? <IconCheck /> : null}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute right-4 top-6">
          <AnimatedDropdownIcon animate={animate} strokeColor={"#4661E6"} />
        </div>
      </div>
    );
  }
);
Select.displayName = "CustomDropdown";

export default Select;
