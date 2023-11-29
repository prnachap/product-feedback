import clsx from "clsx";

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
  return (
    <button
      className={clsx(
        `flex py-1 px-4 rounded-md bg-alice-blue text-[0.8125rem] md:text-sm text-indigo-1000 font-semibold hover:bg-lavender-blue transition-all ease-in ${className}`,
        {
          "bg-indigo-1000 text-white": isActive,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Chip;
