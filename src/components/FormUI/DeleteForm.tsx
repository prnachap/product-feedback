"use client";

import { deleteFeedback } from "@/actions/feedback.action";
import StyledButton from "../Button/StyledButton";

const DeleteForm = ({ feedbackId }: { feedbackId: string }) => {
  const deleteAction = deleteFeedback.bind(null, feedbackId);

  return (
    <form action={deleteAction} id="delete-feedback">
      <StyledButton form="delete-feedback" className="btn-danger" type="submit">
        Delete
      </StyledButton>
    </form>
  );
};

export default DeleteForm;
