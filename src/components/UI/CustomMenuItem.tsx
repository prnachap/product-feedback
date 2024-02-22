import clsx from "clsx";
import React from "react";

const CustomMenuItem = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        `flex justify-between items-center border-b-[1px] border-solid border-american-blue-100 border-opacity-10 last:border-none px-6 py-3 capitalize cursor-pointer hover:text-purple-1000 transition-all ${className}`
      )}
    >
      {children}
    </div>
  );
};

export default CustomMenuItem;
