import FeedbackLogoSkeleton from "@/components/LogoCard/FeedbackLogoSkeleton";
import RoadmapCardSkeleton from "@/components/RoadmapCard/RoadmapCardSkeleton";
import TagsCardSkeleton from "@/components/TagsCard/TagsCardSkeleton";
import LayoutContainer from "@/components/UI/LayoutContainer";

const loading = () => {
  return (
    <LayoutContainer className="flex flex-col sticky z-40 md:gap-8 lg:flex-row">
      <div className="hidden z-40 sticky md:top-10 md:flex md:flex-row md:justify-between md:gap-3 lg:top-14 lg:max-h-[30rem] lg:flex-col lg:gap-5">
        <FeedbackLogoSkeleton />
        <TagsCardSkeleton />
        <RoadmapCardSkeleton />
      </div>
    </LayoutContainer>
  );
};

export default loading;
