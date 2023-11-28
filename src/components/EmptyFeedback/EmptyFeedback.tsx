import PlusIcon from "../../../public/assets/shared/icon-plus.svg";
import EmptyImage from "../../../public/assets/suggestions/illustration-empty.svg";
import StyledButton from "../Button/StyledButton";

const defaultContent = {
  title: "There is no feedback yet.",
  description:
    "Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.",
  isErrorButton: false,
};

type EmptyFeedbackProps = Partial<typeof defaultContent> & {
  reset?: () => void;
};

const EmptyFeedback = ({
  title = defaultContent.title,
  description = defaultContent.description,
  isErrorButton = defaultContent.isErrorButton,
  reset,
}: EmptyFeedbackProps) => {
  const renderButton = () => {
    if (isErrorButton) return null;
    return (
      <StyledButton className="flex items-center gap-2 btn-primary mt-6 md:mt-12">
        <PlusIcon />
        <span>Add Feedback</span>
      </StyledButton>
    );
  };

  return (
    <div className="bg-white w-full rounded-lg h-full flex flex-col justify-center items-center py-8 lg:py-4">
      <div className="mb-6 md:mb-12">
        <EmptyImage />
      </div>
      <h1 className="primary-text capitalize">{title}</h1>
      {!isErrorButton && (
        <p className="body-text w-[58%] text-center mt-3 md:mt-4 first-letter:capitalize">
          {description}
        </p>
      )}
      {renderButton()}
    </div>
  );
};

export default EmptyFeedback;
