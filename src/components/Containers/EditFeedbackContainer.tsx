import Typography from "@mui/material/Typography";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import React from "react";
import StyledButton from "../../components/Button/StyledButton";
import { useFeedbackState } from "../../context/FeedbackContext";
import IconLeft from "../../public/assets/shared/icon-arrow-left.svg";
import EmptyFeedback from "../EmptyFeedback/EmptyFeedback";
import EditFeedbackForm from "../FeedbackForm.tsx/EditFeedbackForm";
import LayoutContainer from "../UI/LayoutContainer";

const EditFeedbackContainer: React.FC = () => {
  const { back } = useRouter();
  const handleBackButton = () => back();
  const { feedbackData } = useFeedbackState();

  const renderUi = () => {
    if (isEmpty(feedbackData)) return <EmptyFeedback />;
    return <EditFeedbackForm feedbackData={feedbackData} />;
  };

  return (
    <LayoutContainer className="mt-8 w-[95%] m-auto md:!w-[50%]  ">
      <StyledButton
        className="btn-back-primary !p-0 mb-10"
        onClick={handleBackButton}
      >
        <IconLeft className="mr-4" />
        <Typography variant="h4" className="quaternary-text  capitalize">
          go back
        </Typography>
      </StyledButton>
      {renderUi()}
    </LayoutContainer>
  );
};

export default EditFeedbackContainer;
