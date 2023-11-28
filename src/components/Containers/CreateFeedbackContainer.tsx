import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import React from "react";
import StyledButton from "../../components/Button/StyledButton";
import CreateFeedbackForm from "../../components/FeedbackForm.tsx/CreateFeedbackForm";
import IconLeft from "../../public/assets/shared/icon-arrow-left.svg";
import LayoutContainer from "../UI/LayoutContainer";

const CreateFeedbackContainer: React.FC = () => {
  const router = useRouter();
  const handleBackButton = () => router.back();

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
      <CreateFeedbackForm />
    </LayoutContainer>
  );
};

export default CreateFeedbackContainer;
