"use client";
import BackButton from "@/components/Button/BackButton";
import StyledButton from "@/components/Button/StyledButton";
import EmptyFeedback from "@/components/EmptyFeedback/EmptyFeedback";
import LayoutContainer from "@/components/UI/LayoutContainer";

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <LayoutContainer className="!w-[95%] mt-6 h-[70vh]">
      <div className="flex justify-between items-center z-20 mb-6 sticky top-0 md:top-10 lg:top-14">
        <BackButton />
      </div>
      <EmptyFeedback title={error.message}>
        <StyledButton className="btn-tertiary mt-4" onClick={() => reset()}>
          Try again
        </StyledButton>
      </EmptyFeedback>
    </LayoutContainer>
  );
};

export default error;
