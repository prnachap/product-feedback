"use client";

import { FeedbackSummary, FeedbackType } from "../../..";
import StatusCard from "./StatusCard";

type StatusCardListProps = {
  status: FeedbackType["status"];
  description: string;
  feedbackList: FeedbackSummary[];
};
const StatusCardList = ({
  status,
  description,
  feedbackList,
}: StatusCardListProps) => {
  const sectionTitle = `${status} (${feedbackList?.length ?? 0})`;

  const renderFeedbackList = () => {
    return feedbackList?.map((feedback, index) => {
      return <StatusCard key={`${feedback.title}-${index}`} {...feedback} />;
    });
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h3 className="text-american-blue-100 !tertiary-text capitalize">
          {sectionTitle}
        </h3>
        <p className="body-text capitalize">{description}</p>
      </div>
      <div className="flex flex-col gap-4 md:gap-6">{renderFeedbackList()}</div>
    </div>
  );
};

export default StatusCardList;
