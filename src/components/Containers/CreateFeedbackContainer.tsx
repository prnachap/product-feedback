import BackButton from "../Button/BackButton";
import CreateFeedbackForm from "../FeedbackForm.tsx/CreateFeedbackForm";
import LayoutContainer from "../UI/LayoutContainer";

const CreateFeedbackContainer = () => {
  return (
    <LayoutContainer className="mt-8 w-[90%] md:w-full">
      <BackButton />
      <CreateFeedbackForm />
    </LayoutContainer>
  );
};

export default CreateFeedbackContainer;
