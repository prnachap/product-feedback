import { APP_ROUTES } from "@/constants";
import { getFeedbackById } from "@/data/feedback.data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BackButton from "../Button/BackButton";
import StyledButton from "../Button/StyledButton";
import CommentsList from "../Comments/CommentsList";
import CommentsSkeleton from "../Comments/CommentsSkeleton";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import CommentBox from "../FormUI/CommentBox";
import LayoutContainer from "../UI/LayoutContainer";

const FeedbackDetailsContainer = async ({
  feedbackId,
}: {
  feedbackId: string;
}) => {
  const result = await getFeedbackById({ id: feedbackId });
  const data = result?.[0];

  if (!data) {
    notFound();
  }

  const renderEditButton = () => {
    return (
      <Link href={`/feedback/${feedbackId}/edit`}>
        <StyledButton className="btn-edit">Edit Feedback</StyledButton>
      </Link>
    );
  };

  return (
    <LayoutContainer className="!w-[95%] mt-6">
      <div className="flex justify-between items-center z-20 mb-6 sticky top-0 md:top-10 lg:top-14">
        <BackButton href={APP_ROUTES.HOME_PAGE} />
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
