import { useFormStatus } from "react-dom";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import StyledButton from "../Button/StyledButton";

const FormSubmissionButton = ({
  title,
  form,
}: {
  title: string;
  form: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <StyledButton
      form={form}
      className="btn-primary"
      type="submit"
      disabled={pending}
    >
      {pending ? <AnimatedLoader className="bg-white" /> : title}
    </StyledButton>
  );
};

export default FormSubmissionButton;
