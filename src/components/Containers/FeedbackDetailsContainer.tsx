import { getFeedbackById } from "@/lib/data";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BackButton from "../Button/BackButton";
import StyledButton from "../Button/StyledButton";
import FeedbackCard from "../FeedbackCard/FeedbackCard";
import FeedbackCardSkeleton from "../FeedbackCard/FeedbackCardSkeleton";
import CommentBox from "../FormUI/CommentBox";
import LayoutContainer from "../UI/LayoutContainer";

const FeedbackDetailsContainer = async ({
  feedbackId,
}: {
  feedbackId: string;
}) => {
  const data = await getFeedbackById({ id: feedbackId });
  if (!data) {
    notFound();
  }

  // const router = useRouter();
  // const { query, isFallback } = router;
  // const { isAuthenticated } = useIsAuthorized();

  // const { data, isLoading, error, isFetching } = useFeebackData(
  //   query?.feedbackId as string
  // );

  // const {
  //   isLoading: isCommentLoading,
  //   error: commentError,
  //   mutateAsync,
  // } = useAddComment({ feedbackId: data?._id });

  // const showBackdrop = isCommentLoading || isFetching;

  // const handleBackButton = () => router.push(APP_ROUTES.HOME_PAGE);
  // const handleEditButton = () =>
  //   router.push(`/edit-feedback/${query.feedbackId}`);

  // if (isFallback || (isLoading && isEmpty(data))) {
  //   return (
  //     <LayoutContainer className="!w-[95%] h-[300px] md:h-[500px] mt-6 flex justify-center items-center">
  //       <CircularProgress color="secondary" />
  //     </LayoutContainer>
  //   );
  // }

  const renderEditButton = () => {
    return <StyledButton className="btn-edit">Edit Feedback</StyledButton>;
  };

  // const renderCommentBox = () => {
  //   return;
  //   <CommentBox mutate={mutateAsync} feedbackId={data._id} />;
  // };

  // const renderSnackbar = () => {
  //   const errorObj = error ? error : commentError;
  //   const errorMessage =
  //     errorObj?.response?.data?.error ??
  //     "Something went wrong please try again!";
  //   if (errorObj) {
  //     return <CustomSnackbar message={errorMessage} severity="error" />;
  //   }
  // };

  return (
    <LayoutContainer className="!w-[95%] mt-6">
      <div className="flex justify-between items-center z-20 mb-6 sticky top-0 md:top-10 lg:top-14">
        <BackButton />
        {renderEditButton()}
      </div>
      <div className="relative z-10 h-[80vh] overflow-auto">
        <Suspense fallback={<FeedbackCardSkeleton />}>
          <FeedbackCard {...data} />
        </Suspense>
        <div className="mt-6">
          {/* <CommentsList comments={data?.comments} /> */}
        </div>
        <div className="mt-6">
          <CommentBox />
        </div>
      </div>
      {/* <Backdrop showBackdrop={showBackdrop} /> */}
      {/* {renderSnackbar()} */}
    </LayoutContainer>
  );
};

export default FeedbackDetailsContainer;
