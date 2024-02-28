"use client";

import { postRepliesToComment } from "@/actions/feedback.action";
import { CommentFormSchema } from "@/schema/feedback.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import StyledButton from "../Button/StyledButton";
type CommentFormInput = z.TypeOf<typeof CommentFormSchema>;

type ReplyBoxProps = { commentId: string };
const ReplyBox = ({ commentId }: ReplyBoxProps) => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<CommentFormInput>({
    resolver: zodResolver(CommentFormSchema),
  });
  const [formSubmissionStatus, setFormSubmissionStatus] = useState<{
    success: boolean;
    error: string | null;
  }>({ success: false, error: null });
  const { feedbackid } = useParams<{ feedbackid: string }>();

  const onSubmit: SubmitHandler<CommentFormInput> = async (data) => {
    setFormSubmissionStatus({
      ...formSubmissionStatus,
      error: null,
      success: false,
    });
    const result = await postRepliesToComment({
      feedbackId: feedbackid,
      commentId,
      content: data.comment,
    });
    setFormSubmissionStatus({
      ...formSubmissionStatus,
      ...result,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row md:justify-between gap-4"
    >
      <fieldset className="w-full flex flex-col">
        <textarea
          id="comment"
          rows={5}
          {...register("comment")}
          className="customInput bg-[#F7F8FD]"
          aria-describedby="comment-error"
        ></textarea>
        {errors.comment && (
          <div
            id="comment-error"
            aria-live="polite"
            aria-atomic="true"
            className="error-text"
          >
            {errors.comment.message}
          </div>
        )}
        {formSubmissionStatus.error && (
          <div aria-live="polite" aria-atomic="true" className="error-text">
            {formSubmissionStatus.error}
          </div>
        )}
      </fieldset>
      <div className="flex justify-end md:block">
        <StyledButton
          className="btn-primary disabled:bg-cool-grey"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Post Reply"}
        </StyledButton>
      </div>
    </form>
  );
};

export default ReplyBox;
