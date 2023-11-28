import { useQuery } from "@tanstack/react-query";
import { AxiosErrorType, FeedbackApiResType } from "..";
import {
  FeedbackActionTypes,
  useFeedbackDispatch,
} from "../context/FeedbackContext";
import { getFeedbackById } from "../services";

export const useFeebackData = (feedbackId: string) => {
  const dispatch = useFeedbackDispatch();
  return useQuery<FeedbackApiResType, AxiosErrorType<FeedbackApiResType>>(
    ["feedback", feedbackId],
    () => getFeedbackById(feedbackId),
    {
      onSuccess: (data) => {
        dispatch({ type: FeedbackActionTypes.GET_FEEDBACK, payload: data });
      },
      refetchOnWindowFocus: false,
    }
  );
};
