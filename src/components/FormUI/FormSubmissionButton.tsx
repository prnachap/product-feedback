import clsx from "clsx";
import { useFormStatus } from "react-dom";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import StyledButton from "../Button/StyledButton";

const FormSubmissionButton = ({
  title,
  form,
  isLoading,
  className,
}: {
  title: string;
  form?: string;
  isLoading?: boolean;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <StyledButton
      form={form}
      className={clsx(
        `btn-primary !min-h-[40px] flex items-center justify-center ${className}`
      )}
      type="submit"
      disabled={pending}
    >
      {pending || isLoading ? <AnimatedLoader className="bg-white" /> : title}
    </StyledButton>
  );
};

export default FormSubmissionButton;
