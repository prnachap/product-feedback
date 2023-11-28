import Box from "@mui/material/Box";
import { isEmpty } from "lodash";
import React from "react";
import { CommentType } from "../..";
import CustomCard from "../UI/CustomCard";
import Comments from "./Comments";

type CommentsListProps = { comments: Array<CommentType> };

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  const renderCommentList = () => {
    return comments.map((item) => {
      return (
        <Box
          key={item._id}
          className="border-b-[1px] border-cool-grey/[.25] pb-6 last:border-b-0 last:pb-0 md:pb-8"
        >
          <Comments {...item} isFirstComment={true} />
        </Box>
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
