import clsx from "clsx";
import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        rows={5}
        className={clsx(`customInput bg-[#F7F8FD] ${className}`)}
        ref={ref}
        {...props}
      ></textarea>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
