import StatusCardSkeleton from "./StatusCardSkeleton";

const StatusCardListSkeleton = () => {
  const renderFeedbackList = () => {
    return Array(2)
      .fill(0)
      ?.map((feedback, index) => {
        return (
          <StatusCardSkeleton
            key={`${feedback.title}-${index}`}
            {...feedback}
          />
        );
      });
  };

  return (
    <div className="loader-animation">
      <div className="mb-6 md:mb-8">
        <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
        <div className="h-5 w-48 bg-gray-200 rounded-md"></div>
      </div>
      <div className="flex flex-col gap-4 md:gap-6">{renderFeedbackList()}</div>
    </div>
  );
};

export default StatusCardListSkeleton;
