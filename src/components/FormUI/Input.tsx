import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`customInput  bg-[#F7F8FD] ${className} }`}
        {...props}
      ></input>
    );
  }
);

Input.displayName = "Input";

export default Input;
