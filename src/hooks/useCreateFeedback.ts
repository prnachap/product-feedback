import { useMutation } from "@tanstack/react-query";
import { AxiosErrorType, FeedbackApiResType } from "..";
import { FORM_INITIAL_STATE } from "../constants";
import { createFeedback } from "../services";

const useCreateFeedback = () => {
  return useMutation<
    FeedbackApiResType,
    AxiosErrorType<FeedbackApiResType>,
    typeof FORM_INITIAL_STATE
  >({ mutationFn: createFeedback, onSuccess: () => {}, onError: () => {} });
};

export default useCreateFeedback;
