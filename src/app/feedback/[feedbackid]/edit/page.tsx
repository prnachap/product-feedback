import EditFeedbackContainer from "@/components/Containers/EditFeedbackContainer";

const EditFeedback = ({ params }: { params: { feedbackid: string } }) => {
  return (
    <main>
      <EditFeedbackContainer feedbackId={params.feedbackid} />
    </main>
  );
};

export default EditFeedback;
