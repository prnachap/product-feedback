"use client";
import clsx from "clsx";
import { useFormStatus } from "react-dom";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";

interface ChipProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const Chip: React.FunctionComponent<ChipProps> = ({
  onClick,
  children,
  className,
  isActive,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(
        `flex py-1 px-4 rounded-md bg-alice-blue text-[0.8125rem] md:text-sm text-indigo-1000 font-semibold hover:bg-lavender-blue transition-all ease-in ${className} disabled:bg-gray-400`,
        {
          "bg-indigo-1000 text-white": isActive,
          "h-10": pending,
          "pointer-events-none": pending,
        }
      )}
      type="submit"
      onClick={onClick}
    >
      {pending ? <AnimatedLoader /> : children}
    </button>
  );
};

export default Chip;
