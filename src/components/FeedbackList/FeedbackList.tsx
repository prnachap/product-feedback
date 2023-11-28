import { END_POINTS } from "@/constants";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { FeedbackApiResType } from "../../..";
import EmptyFeedback from "../EmptyFeedback/EmptyFeedback";
import FeedbackCard from "../FeedbackCard/FeedbackCard";

const getFeedbackData = async (): Promise<{
  data: FeedbackApiResType[];
}> => {
  try {
    const res = await fetch(END_POINTS.GET_FEEDBACKS, {
      cache: "no-store",
    });
    return { data: await res.json() };
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }
};

const FeedbackList = async () => {
  const { data } = await getFeedbackData();

  if (!Array.isArray(data)) return <EmptyFeedback />;

  const renderFeedbackList = () => {
    return data?.map((item) => {
      return <FeedbackCard key={item._id} {...item} />;
    });
  };

  return <div className="">{renderFeedbackList()}</div>;
};

export default FeedbackList;
