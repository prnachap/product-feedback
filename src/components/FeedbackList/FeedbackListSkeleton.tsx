import FeedbackCardSkeleton from "../FeedbackCard/FeedbackCardSkeleton";

const FeedbackListSkeleton = async () => {
  const renderFeedbackList = () => {
    return [1, 2, 3]?.map((item) => {
      return <FeedbackCardSkeleton key={item} />;
    });
  };

  return <div>{renderFeedbackList()}</div>;
};

export default FeedbackListSkeleton;
