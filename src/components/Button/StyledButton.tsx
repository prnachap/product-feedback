type StyledButtonProps = {
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

const StyledButton: React.FC<StyledButtonProps> = ({
  className,
  children,
  type = "button",
  ...restProps
}) => {
  return (
    <button className={className} type={type} {...restProps}>
      {children}
    </button>
  );
};

export default StyledButton;
