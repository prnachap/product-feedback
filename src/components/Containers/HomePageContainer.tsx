import { getRoadMapStatistics } from "@/data/feedback.data";
import { Suspense } from "react";
import CreateFeedbackBar from "../CreateFeedbackBar.tsx/CreateFeedbackBar";
import FeedbackList from "../FeedbackList/FeedbackList";
import FeedbackListSkeleton from "../FeedbackList/FeedbackListSkeleton";
import FeedbackLogo from "../LogoCard/FeedbackLogo";
import NavbarMobile from "../Navbar/NavbarMobile";
import RoadmapCard from "../RoadmapCard/RoadmapCard";
import RoadmapCardSkeleton from "../RoadmapCard/RoadmapCardSkeleton";
import TagsCard from "../TagsCard/TagsCard";
import LayoutContainer from "../UI/LayoutContainer";

const HomePageContainer = async ({
  category,
  sortBy,
}: {
  category: string;
  sortBy: string;
}) => {
  const status = await getRoadMapStatistics();
  return (
    <LayoutContainer className="flex flex-col sticky z-40 md:gap-8 lg:flex-row">
      <div className="hidden z-40 sticky md:top-10 md:flex md:flex-row md:justify-between md:gap-3 lg:top-14 lg:max-h-[30rem] lg:flex-col lg:gap-5">
        <FeedbackLogo />
        <TagsCard />
        <Suspense fallback={<RoadmapCardSkeleton />}>
          <RoadmapCard status={status} />
        </Suspense>
      </div>
      <div className="flex flex-col w-full sticky top-28 ">
        <NavbarMobile />
        <div className="z-40 sticky top-[82.5px] md:top-[242px] lg:top-14">
          <CreateFeedbackBar />
        </div>
        <div className="z-10 mt-8 w-[95%] m-auto md:w-full min-h-[60vh] max-h-[76vh] md:mt-6 overflow-auto">
          <Suspense key={sortBy + category} fallback={<FeedbackListSkeleton />}>
            <FeedbackList sortBy={sortBy} category={category} />
          </Suspense>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default HomePageContainer;
