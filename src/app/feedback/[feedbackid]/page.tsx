import FeedbackDetailsContainer from "@/components/Containers/FeedbackDetailsContainer";

const FeedbackDetailsPage = ({
  params,
}: {
  params: { feedbackid: string };
}) => {
  const feedbackId = params.feedbackid;
  return (
    <main>
      <FeedbackDetailsContainer feedbackId={feedbackId} />
    </main>
  );
};

export default FeedbackDetailsPage;
