import { getFeedbackSummary } from "@/data/feedback.data";
import { isEmpty } from "lodash";
import PlusIcon from "../../../public/assets/shared/icon-plus.svg";
import StyledButton from "../Button/StyledButton";
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

  if (isEmpty(data))
    return (
      <EmptyFeedback
        title="There is no feedback yet."
        description="Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app."
      >
        <StyledButton className="flex items-center gap-2 btn-primary mt-6 md:mt-12">
          <PlusIcon />
          <span>Add Feedback</span>
        </StyledButton>
      </EmptyFeedback>
    );

  const renderFeedbackList = () => {
    return data?.map((item) => {
      return <FeedbackCard key={item._id} {...item} />;
    });
  };

  return <div>{renderFeedbackList()}</div>;
};

export default FeedbackList;
