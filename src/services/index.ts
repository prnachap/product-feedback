import axios from "axios";
import { CommentPayloadType, FeedbackApiResType } from "../..";
import { END_POINTS, FORM_INITIAL_STATE } from "../constants";

export const getCurrentLoggedInUser = async (): Promise<
  FeedbackApiResType[]
> => {
  const {
    data: { data },
  } = await axios.get(END_POINTS.GET_USER, { withCredentials: true });
  return data;
};

export const getAllFeedbacks = async (): Promise<FeedbackApiResType[]> => {
  const {
    data: { data },
  } = await axios.get(END_POINTS.GET_FEEDBACKS);
  return data;
};

export const getFeedbackById = async (
  id: string
): Promise<FeedbackApiResType> => {
  const {
    data: { data },
  } = await axios.get(`${END_POINTS.GET_FEEDBACKS}/${id}`);
  return data;
};

export const logoutUser = async (): Promise<{ success: boolean }> => {
  const { data: data } = await axios.post(
    `${END_POINTS.LOGOUT}`,
    {},
    {
      withCredentials: true,
    }
  );
  return data;
};

export const createFeedback = async (
  payload: typeof FORM_INITIAL_STATE
): Promise<FeedbackApiResType> => {
  const { data } = await axios.post(END_POINTS.CREATE_FEEDBACK, payload, {
    withCredentials: true,
  });
  return data;
};

export const editFeedback = async (
  payload: typeof FORM_INITIAL_STATE & { feedbackId: string }
): Promise<FeedbackApiResType> => {
  const { feedbackId, ...otherProps } = payload;
  const { data } = await axios.put(
    `${END_POINTS.CREATE_FEEDBACK}/${feedbackId}`,
    otherProps,
    { withCredentials: true }
  );
  return data;
};

export const deleteFeedback = async (payload: {
  feedbackId: string;
}): Promise<{ data: Record<string, string> }> => {
  const { feedbackId } = payload;
  const { data } = await axios.delete(
    `${END_POINTS.CREATE_FEEDBACK}/${feedbackId}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const addComment = async (
  payload: CommentPayloadType<string>
): Promise<FeedbackApiResType> => {
  const { feedbackId, content } = payload;

  const { data } = await axios.post(
    `${END_POINTS.ADD_COMMENT}/${feedbackId}`,
    { content },
    {
      withCredentials: true,
    }
  );
  return data;
};

export const addReply = async (payload: {
  content: string;
  feedbackId: string;
  commentId: string;
}): Promise<FeedbackApiResType> => {
  const { feedbackId, content, commentId } = payload;

  const { data } = await axios.post(
    `${END_POINTS.CREATE_FEEDBACK}/${feedbackId}/comments/${commentId}/replies`,
    { content },
    {
      withCredentials: true,
    }
  );
  return data;
};
