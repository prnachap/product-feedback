import React from "react";

type CustomCardProps = {
  className?: string;
  children?: React.ReactNode;
};

const CustomCard: React.FC<CustomCardProps> = ({ children, className }) => {
  return (
    <div
      className={`p-6 md:px-8 md:py-[28px] bg-white rounded-lg shadow-none ${className} `}
    >
      {children}
    </div>
  );
};

export default CustomCard;
