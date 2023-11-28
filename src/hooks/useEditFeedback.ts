import { useMutation } from "@tanstack/react-query";
import { AxiosErrorType, FeedbackApiResType } from "..";
import { FORM_INITIAL_STATE } from "../constants";
import { editFeedback } from "../services";

const useEditFeedback = () => {
  return useMutation<
    FeedbackApiResType,
    AxiosErrorType<FeedbackApiResType>,
    typeof FORM_INITIAL_STATE & { feedbackId: string }
  >({ mutationFn: editFeedback, onSuccess: () => {}, onError: () => {} });
};

export default useEditFeedback;
