import { getCommentsByFeedbackId } from "@/lib/data";
import { isEmpty } from "lodash";
import CustomCard from "../UI/CustomCard";
import Comments from "./Comments";

type CommentsListProps = { feedbackId: string };

const CommentsList = async ({ feedbackId }: CommentsListProps) => {
  const { comments } = await getCommentsByFeedbackId({ id: feedbackId });

  const renderCommentList = () => {
    return comments?.map((item) => {
      item._id = item._id.toString();
      item.user._id = item.user._id.toString();
      return (
        <div
          key={item._id.toString()}
          className="border-b-[1px] border-cool-grey/[.25] pb-6 last:border-b-0 last:pb-0 md:pb-8"
        >
          <Comments {...item} isFirstComment={true} />
        </div>
      );
    });
  };

  const renderCustomCard = () => {
    return isEmpty(comments) ? null : (
      <CustomCard className="flex flex-col gap-6 md:gap-8">
        {renderCommentList()}
      </CustomCard>
    );
  };

  return renderCustomCard();
};

export default CommentsList;
