import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AxiosErrorType, FeedbackApiResType } from "..";
import { APP_ROUTES } from "../constants";
import { deleteFeedback } from "../services";

const useDeleteFeedback = () => {
  const router = useRouter();
  return useMutation<
    { data: Record<string, string> },
    AxiosErrorType<FeedbackApiResType>,
    { feedbackId: string }
  >({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      router.push(APP_ROUTES.HOME_PAGE);
    },
    onError: () => {},
  });
};

export default useDeleteFeedback;
