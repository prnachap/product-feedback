import { getFeedbackById } from "@/lib/data";
import { notFound } from "next/navigation";
import BackButton from "../Button/BackButton";
import EditFeedbackForm from "../FeedbackForm.tsx/EditFeedbackForm";
import LayoutContainer from "../UI/LayoutContainer";

const EditFeedbackContainer = async ({
  feedbackId,
}: {
  feedbackId: string;
}) => {
  const feedbackData = await getFeedbackById({ id: feedbackId });

  if (!feedbackData) {
    notFound();
  }
  return (
    <LayoutContainer className="mt-8 w-[90%] md:w-full">
      <BackButton />
      <EditFeedbackForm feedbackData={feedbackData} />
    </LayoutContainer>
  );
};

export default EditFeedbackContainer;
