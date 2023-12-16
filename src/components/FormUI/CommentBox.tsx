"use client";

import { addComments } from "@/lib/actions";
import { CommentFormSchema } from "@/lib/schema";
import { getRemainingWordCount } from "@/utils/formElementUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import StyledButton from "../Button/StyledButton";
import CustomCard from "../UI/CustomCard";

type CommentFormInput = z.TypeOf<typeof CommentFormSchema>;

const CommentBox: React.FC = () => {
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormInput>({
    resolver: zodResolver(CommentFormSchema),
  });
  const comment = watch("comment");
  const params = useParams();
  const [formSubmissionStatus, setFormSubmissionStatus] = useState<{
    success: boolean;
    error: string | null;
  }>({ success: false, error: null });

  const onSubmit: SubmitHandler<CommentFormInput> = async (data) => {
    setFormSubmissionStatus({
      ...formSubmissionStatus,
      error: null,
      success: false,
    });

    const status = await addComments({
      comments: data.comment,
      feedbackId: params.feedbackid as string,
    });
    reset();
    setFormSubmissionStatus({ ...formSubmissionStatus, ...status });
  };

  return (
    <CustomCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="w-full flex flex-col">
          <label
            htmlFor="comment"
            className="tertiary-text text-american-blue-100 mb-6"
          >
            Add Comment
          </label>
          <textarea
            id="comment"
            {...register("comment")}
            rows={5}
            className="customInput bg-[#F7F8FD]"
            aria-describedby="comment-error"
            disabled={isSubmitting}
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
        <div className="flex justify-between items-center mt-4">
          <p className="body-text">
            {getRemainingWordCount(comment)} characters left
          </p>
          <StyledButton
            disabled={isSubmitting}
            className="btn-primary disabled:bg-cool-grey"
            type="submit"
          >
            {isSubmitting ? "Saving..." : "Post Comment"}
          </StyledButton>
        </div>
      </form>
    </CustomCard>
  );
};

export default CommentBox;
