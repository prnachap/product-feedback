"use client";

import { deleteFeedback } from "@/actions/feedback.action";
import FormSubmissionButton from "./FormSubmissionButton";

const DeleteForm = ({ feedbackId }: { feedbackId: string }) => {
  const deleteAction = deleteFeedback.bind(null, feedbackId);

  return (
    <form action={deleteAction} id="delete-feedback">
      <FormSubmissionButton
        title="Delete"
        form="delete-feedback"
        className="btn-danger"
      />
    </form>
  );
};

export default DeleteForm;
