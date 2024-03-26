"use client";

import StyledButton from "@/components/Button/StyledButton";
import CreateFeedbackBar from "@/components/CreateFeedbackBar.tsx/CreateFeedbackBar";
import EmptyFeedback from "@/components/EmptyFeedback/EmptyFeedback";
import FeedbackLogo from "@/components/LogoCard/FeedbackLogo";
import NavbarMobile from "@/components/Navbar/NavbarMobile";
import RoadmapCard from "@/components/RoadmapCard/RoadmapCard";
import TagsCard from "@/components/TagsCard/TagsCard";
import LayoutContainer from "@/components/UI/LayoutContainer";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <LayoutContainer className="flex flex-col sticky z-40 md:gap-8 lg:flex-row">
      <div className="hidden z-40 sticky md:top-10 md:flex md:flex-row md:justify-between md:gap-3 lg:top-14 lg:max-h-[30rem] lg:flex-col lg:gap-5">
        <FeedbackLogo />
        <TagsCard />
        <RoadmapCard status={[]} />
      </div>
      <div className="flex flex-col w-full sticky top-28 ">
        <NavbarMobile status={[]} />
        <div className="z-40 sticky top-[82.5px] md:top-[242px] lg:top-14">
          <CreateFeedbackBar />
        </div>
        <div className="z-10 mt-8 w-[95%] m-auto md:w-full min-h-[60vh] max-h-[76vh] md:mt-6 overflow-auto">
          <EmptyFeedback title={error.message}>
            <StyledButton className="btn-tertiary mt-4" onClick={() => reset()}>
              Try again
            </StyledButton>
          </EmptyFeedback>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Error;
