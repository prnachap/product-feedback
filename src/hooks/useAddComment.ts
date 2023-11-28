import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosErrorType, FeedbackApiResType } from "..";
import { addComment } from "../services";

const useMutationCrud = ({
  feedbackId,
}: {
  feedbackId: string | undefined;
}) => {
  const queryClient = useQueryClient();
  return useMutation<
    FeedbackApiResType,
    AxiosErrorType<FeedbackApiResType>,
    { content: string; feedbackId: string }
  >({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feedback", feedbackId],
      });
    },
  });
};

export default useMutationCrud;
