import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import isEmpty from "lodash/isEmpty";
import { useRouter } from "next/router";
import { APP_ROUTES } from "../../constants/appRoutes";
import useAddComment from "../../hooks/useAddComment";
import { useFeebackData } from "../../hooks/useFeebackData";
import useIsAuthorized from "../../hooks/useIsAuthorized";
import IconLeft from "../../public/assets/shared/icon-arrow-left.svg";
import Backdrop from "../Backdrop/Backdrop";
import StyledButton from "../Button/StyledButton";
import CommentsList from "../Comments/CommentsList";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import EmptyFeedback from "../EmptyFeedback/EmptyFeedback";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import CommentBox from "../FormUI/CommentBox";
import LayoutContainer from "../UI/LayoutContainer";

const FeedbackDetailsContainer: React.FC = () => {
  const router = useRouter();
  const { query, isFallback } = router;
  const { isAuthenticated } = useIsAuthorized();

  const { data, isLoading, error, isFetching } = useFeebackData(
    query?.feedbackId as string
  );

  const {
    isLoading: isCommentLoading,
    error: commentError,
    mutateAsync,
  } = useAddComment({ feedbackId: data?._id });

  const showBackdrop = isCommentLoading || isFetching;

  const handleBackButton = () => router.push(APP_ROUTES.HOME_PAGE);
  const handleEditButton = () =>
    router.push(`/edit-feedback/${query.feedbackId}`);

  if (isFallback || (isLoading && isEmpty(data))) {
    return (
      <LayoutContainer className="!w-[95%] h-[300px] md:h-[500px] mt-6 flex justify-center items-center">
        <CircularProgress color="secondary" />
      </LayoutContainer>
    );
  }

  if (isEmpty(data)) {
    return (
      <LayoutContainer className="!w-[95%] mt-6 h-[70vh]">
        <EmptyFeedback />
      </LayoutContainer>
    );
  }

  const renderEditButton = () => {
    return isAuthenticated ? (
      <StyledButton className="btn-edit" onClick={handleEditButton}>
        Edit Feedback
      </StyledButton>
    ) : null;
  };

  const renderCommentBox = () => {
    return isAuthenticated ? (
      <CommentBox mutate={mutateAsync} feedbackId={data._id} />
    ) : null;
  };

  const renderSnackbar = () => {
    const errorObj = error ? error : commentError;
    const errorMessage =
      errorObj?.response?.data?.error ??
      "Something went wrong please try again!";
    if (errorObj) {
      return <CustomSnackbar message={errorMessage} severity="error" />;
    }
  };

  return (
    <LayoutContainer className="!w-[95%] mt-6">
      <Box className="flex justify-between items-center z-20 mb-6 sticky top-0 md:top-10 lg:top-14">
        <StyledButton
          className="btn-back-primary !p-0"
          onClick={handleBackButton}
        >
          <IconLeft className="mr-4" />
          <Typography variant="h4" className="quaternary-text  capitalize">
            go back
          </Typography>
        </StyledButton>
        {renderEditButton()}
      </Box>
      <Box className="relative z-10 h-[80vh] overflow-auto">
        <Box>
          <FeedbackCard {...data} />
        </Box>
        <Box className="mt-6">
          <CommentsList comments={data?.comments} />
        </Box>
        <Box className="mt-6">{renderCommentBox()}</Box>
      </Box>
      <Backdrop showBackdrop={showBackdrop} />
      {renderSnackbar()}
    </LayoutContainer>
  );
};

export default FeedbackDetailsContainer;
