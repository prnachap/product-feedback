import CommentsSkeleton from "@/components/Comments/CommentsSkeleton";
import FeedbackCardSkeleton from "@/components/FeedbackCard/FeedbackCardSkeleton";
import CommentBoxSkeleton from "@/components/FormUI/CommentBoxSkeleton";
import CustomCard from "@/components/UI/CustomCard";
import LayoutContainer from "@/components/UI/LayoutContainer";

const loading = () => {
  return (
    <LayoutContainer className="!w-[95%] mt-6">
      <div className="flex justify-between items-center z-20 mb-6 sticky top-0 md:top-10 lg:top-14">
        <div className="loader-animation w-12 h-5 rounded-md bg-gray-200"></div>
        <div className="loader-animation w-20 h-5 rounded-md bg-gray-200"></div>
      </div>
      <div className="relative z-10 h-[80vh] overflow-auto">
        <FeedbackCardSkeleton />
        <div className="mt-6">
          <CommentsSkeleton />
        </div>
        <div className="mt-6">
          <CommentBoxSkeleton />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default loading;
