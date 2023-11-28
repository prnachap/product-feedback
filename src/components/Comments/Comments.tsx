import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FormikHelpers } from "formik";
import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import { useRouter } from "next/router";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import {
  AxiosErrorType,
  CommentType,
  FeedbackApiResType,
  ReplyPayloadType,
} from "../..";
import { useContainerHeight } from "../../hooks/useContainerHeight";
import useIsAuthorized from "../../hooks/useIsAuthorized";
import useReplyMutation from "../../hooks/useReplyMutation";
import imageUrl from "../../public/assets/user-images/image-elijah.jpg";
import { addReply } from "../../services";
import StyledButton from "../Button/StyledButton";
import ReplyBox, { INITIAL_VALUE } from "../FormUI/ReplyBox";

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
  const childContainerRef = useRef<HTMLElement>(null);
  const { heightDiffBetweenParentAndChild } = useContainerHeight({
    childRef: childContainerRef,
  });
  const { isAuthenticated } = useIsAuthorized();
  const {
    query: { feedbackId },
  } = useRouter();

  const { mutateAsync, isLoading, error } = useReplyMutation<
    FeedbackApiResType,
    AxiosErrorType<FeedbackApiResType>,
    ReplyPayloadType<string>
  >({
    feedbackId: feedbackId as string,
    queryFn: addReply,
    queryKey: "feedback",
  });

  const handleSubmit = async (
    values: typeof INITIAL_VALUE,
    actions: FormikHelpers<typeof INITIAL_VALUE>
  ) => {
    mutateAsync({
      feedbackId: feedbackId as string,
      commentId: _id,
      content: values.reply,
    }).then(() => {
      actions.resetForm();
      setOpenReplyForm(false);
    });
  };

  const buttonTitle = openReplyForm ? "Cancel" : "Reply";

  const handleReplyForm = () => setOpenReplyForm((prevState) => !prevState);

  const renderNestedComments = () => {
    if (isEmpty(comments)) return null;
    const className = isFirstComment ? "ml-12" : "ml-0";
    return (
      <Box ref={childContainerRef} className={className}>
        {comments?.map((comment, index) => {
          return (
            <Box key={comment._id} className="mt-8">
              <Comments {...comment} isFirstComment={false} />
            </Box>
          );
        })}
      </Box>
    );
  };

  const renderContent = () => {
    return (
      <Typography variant="body1" className="body-text">
        {replyTo && (
          <span className="mr-1 text-purple-1000 font-bold">{`@${replyTo}`}</span>
        )}
        {content}
      </Typography>
    );
  };

  const renderInput = () => {
    return openReplyForm ? (
      <Box className="md:col-start-2 col-span-full mt-4 md:mt-6">
        <ReplyBox
          feedbackId={feedbackId as string}
          commentId={_id}
          handleSubmit={handleSubmit}
        />
      </Box>
    ) : null;
  };

  const renderReplyButton = () => {
    if (!isAuthenticated) return;
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
    >
      <Box className="grid grid-cols-[40px,2fr,1fr] gap-4 items-start md:gap-x-8 md:gap-y-4 ">
        <Box>
          <Image
            src={imageUrl}
            alt="user profic pic"
            height={40}
            width={40}
            className="rounded-full"
          />
        </Box>
        <Box>
          <Typography
            variant="h4"
            className="quaternary-text  text-american-blue-100"
          >
            {user?.name ?? ""}
          </Typography>
          <Typography variant="body1" className="body-text md:!text-[14px]">
            {`@${user?.username ?? ""}`}
          </Typography>
        </Box>
        {renderReplyButton()}
        <Box className="md:col-start-2 col-span-full">{renderContent()}</Box>
        {renderInput()}
      </Box>
      {renderNestedComments()}
    </StyledBox>
  );
};

export default Comments;
