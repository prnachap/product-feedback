import StyledButton from "@/components/Button/StyledButton";
import EmptyFeedback from "@/components/EmptyFeedback/EmptyFeedback";
import LayoutContainer from "@/components/UI/LayoutContainer";
import Link from "next/link";

const page = () => {
  return (
    <LayoutContainer className="flex flex-col sticky z-40 md:gap-8 lg:flex-row">
      <div className="z-10 mt-8 w-[95%] m-auto md:w-full min-h-[60vh] max-h-[76vh] md:mt-6 overflow-auto">
        <EmptyFeedback title={"Something went wrong!!"}>
          <Link href="/auth/login">
            <StyledButton className="btn-tertiary mt-4">
              Back to login
            </StyledButton>
          </Link>
        </EmptyFeedback>
      </div>
    </LayoutContainer>
  );
};

export default page;
