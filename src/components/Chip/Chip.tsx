"use client";
import clsx from "clsx";
import React from "react";
import { useFormStatus } from "react-dom";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";

type ChipProps = {
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Chip = (props: ChipProps) => {
  const { children, className, isActive, ...otherProps } = props;
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(
        `flex py-1 px-4 rounded-md bg-alice-blue text-[0.8125rem] md:text-sm text-indigo-1000 font-semibold hover:bg-lavender-blue transition-all ease-in ${className} disabled:pointer-events-none`,
        {
          "bg-indigo-1000 text-white": isActive,
          "h-10": pending,
          "pointer-events-none": pending,
        }
      )}
      type="submit"
      {...otherProps}
    >
      {pending ? <AnimatedLoader /> : children}
    </button>
  );
};

export default Chip;
