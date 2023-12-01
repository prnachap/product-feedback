"use client";
import BackButton from "@/components/Button/BackButton";
import StyledButton from "@/components/Button/StyledButton";
import EmptyFeedback from "@/components/EmptyFeedback/EmptyFeedback";
import LayoutContainer from "@/components/UI/LayoutContainer";
import Link from "next/link";

const error = ({ error }: { error: Error & { digest?: string } }) => {
  return (
    <LayoutContainer className="!w-[95%] mt-6 h-[70vh]">
      <div className="flex justify-between items-center z-20 mb-6 sticky top-0 md:top-10 lg:top-14">
        <BackButton />
      </div>
      <EmptyFeedback title={error.message}>
        <Link href={"/feedback"}>
          <StyledButton className="flex items-center gap-2 btn-primary mt-6 md:mt-12">
            Dashboard
          </StyledButton>
        </Link>
      </EmptyFeedback>
    </LayoutContainer>
  );
};

export default error;
