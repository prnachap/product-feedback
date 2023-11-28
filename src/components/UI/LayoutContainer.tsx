import React from "react";

type LayoutContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

const LayoutContainer = ({ children, className }: LayoutContainerProps) => {
  return (
    <div
      className={`w-full mx-auto md:mt-10 lg:mt-14 md:w-[90%] lg:max-w-5xl lg:w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
