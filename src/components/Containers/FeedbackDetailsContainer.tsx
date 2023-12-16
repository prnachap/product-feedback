import { getFeedbackById } from "@/lib/data";
import { notFound } from "next/navigation";
import BackButton from "../Button/BackButton";
import StyledButton from "../Button/StyledButton";
import CommentsList from "../Comments/CommentsList";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import CommentBox from "../FormUI/CommentBox";
import LayoutContainer from "../UI/LayoutContainer";
import { Suspense } from "react";
import CommentsSkeleton from "../Comments/CommentsSkeleton";

const FeedbackDetailsContainer = async ({
  feedbackId,
}: {
  feedbackId: string;
}) => {
  const data = await getFeedbackById({ id: feedbackId });

  if (!data) {
    notFound();
  }

  const renderEditButton = () => {
    return <StyledButton className="btn-edit">Edit Feedback</StyledButton>;
  };

  return (
    <LayoutContainer className="!w-[95%] mt-6">
      <div className="flex justify-between items-center z-20 mb-6 sticky top-0 md:top-10 lg:top-14">
        <BackButton />
        {renderEditButton()}
      </div>
      <div className="relative z-10 h-[80vh] overflow-auto">
        <FeedbackCard {...data} />
        <div className="mt-6">
          <Suspense key={feedbackId} fallback={<CommentsSkeleton />}>
            <CommentsList feedbackId={feedbackId} />
          </Suspense>
        </div>
        <div className="mt-6">
          <CommentBox />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default FeedbackDetailsContainer;
