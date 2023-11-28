import { useQuery } from "@tanstack/react-query";
import { AxiosErrorType, FeedbackApiResType } from "..";
import { getAllFeedbacks } from "../services";

export const useAllFeedbackData = () => {
  return useQuery<
    Array<FeedbackApiResType>,
    AxiosErrorType<FeedbackApiResType>
  >(["all-feedbacks"], getAllFeedbacks);
};
