import { getFeedbackSummary } from "@/lib/data";
import { isEmpty } from "lodash";
import EmptyFeedback from "../EmptyFeedback/EmptyFeedback";
import FeedbackCard from "../FeedbackCard/FeedbackCard";

const FeedbackList = async ({
  category,
  sortBy,
}: {
  category: string;
  sortBy: string;
}) => {
  const data = await getFeedbackSummary({ category, sortBy });

  if (isEmpty(data)) return <EmptyFeedback />;

  const renderFeedbackList = () => {
    return data?.map((item) => {
      return <FeedbackCard key={item._id} {...item} />;
    });
  };

  return <div>{renderFeedbackList()}</div>;
};

export default FeedbackList;
