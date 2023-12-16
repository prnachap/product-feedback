"use client";

import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { CommentType } from "../../..";
import imageUrl from "../../../public/assets/user-images/image-elijah.jpg";
import { useContainerHeight } from "../../hooks/useContainerHeight";
import StyledButton from "../Button/StyledButton";
import ReplyBox from "../FormUI/ReplyBox";

type StyledBoxProps = BoxProps & { progress: number; isFirstComment: boolean };

const StyledBoxWithForwardRef = forwardRef(
  (props: StyledBoxProps, ref: ForwardedRef<HTMLElement>) => (
    <Box {...props} ref={ref} />
  )
);
StyledBoxWithForwardRef.displayName = "StyledBoxWithForwardRef";

const StyledBox = styled(StyledBoxWithForwardRef)(
  ({ progress, isFirstComment }) => {
    return {
      position: "relative",
      ...(isFirstComment && {
        "&::before": {
          content: '""',
          position: "absolute",
          top: "56px",
          left: "20px",
          width: "1px",
          height: `${progress}px`,
          background: "#8C92B3",
          opacity: "0.25",
        },
      }),
    };
  }
);

type CommentsProps = CommentType & { isFirstComment: boolean };

const Comments: React.FC<CommentsProps> = (props) => {
  const { _id, comments, content, user, replyTo, isFirstComment } = props;
  const [openReplyForm, setOpenReplyForm] = useState(false);
  const childContainerRef = useRef<HTMLDivElement>(null);
  const { heightDiffBetweenParentAndChild } = useContainerHeight({
    childRef: childContainerRef,
  });

  const buttonTitle = openReplyForm ? "Cancel" : "Reply";

  const handleReplyForm = () => setOpenReplyForm((prevState) => !prevState);

  const renderNestedComments = () => {
    if (isEmpty(comments)) return null;
    const className = isFirstComment ? "ml-12" : "ml-0";
    return (
      <div ref={childContainerRef} className={className}>
        {comments?.map((comment) => {
          return (
            <div key={comment._id} className="mt-8">
              <Comments {...comment} isFirstComment={false} />
            </div>
          );
        })}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <p className="body-text">
        {replyTo && (
          <span className="mr-1 text-purple-1000 font-bold">{`@${replyTo}`}</span>
        )}
        {content}
      </p>
    );
  };

  const renderInput = () => {
    return openReplyForm ? (
      <div className="md:col-start-2 col-span-full mt-4 md:mt-6">
        <ReplyBox commentId={_id} />
      </div>
    ) : null;
  };

  const renderReplyButton = () => {
    return (
      <StyledButton
        className="btn-reply justify-self-end"
        onClick={handleReplyForm}
      >
        {buttonTitle}
      </StyledButton>
    );
  };

  return (
    <StyledBox
      progress={heightDiffBetweenParentAndChild}
      isFirstComment={isFirstComment}
      className="before:hidden lg:before:block "
    >
      <div className="grid grid-cols-[40px,2fr,1fr] gap-4 items-start md:gap-x-8 md:gap-y-4 ">
        <div>
          <Image
            src={imageUrl}
            alt="user profic pic"
            height={40}
            width={40}
            className="rounded-full"
          />
        </div>
        <div>
          <h4 className="quaternary-text  text-american-blue-100">
            {user?.name ?? ""}
          </h4>
          <p className="body-text md:!text-[14px]">
            {`@${user?.username ?? ""}`}
          </p>
        </div>
        {renderReplyButton()}
        <div className="md:col-start-2 col-span-full">{renderContent()}</div>
        {renderInput()}
      </div>
      {renderNestedComments()}
    </StyledBox>
  );
};

export default Comments;
