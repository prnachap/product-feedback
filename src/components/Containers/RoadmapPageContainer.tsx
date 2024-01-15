import { getFeedbackByStatus } from "@/lib/data";
import { Suspense } from "react";
import RoadmapNav from "../Navbar/RoadmapNav";
import RoadmapTabs from "../RoadmapTabs/RoadmapTabs";
import StatusCardList from "../Status/StatusCardList";
import StatusCardListSkeleton from "../Status/StatusCardListSkeleton";
import LayoutContainer from "../UI/LayoutContainer";

const RoadmapPageContainer = async () => {
  const plannedData = await getFeedbackByStatus("planned");
  const inProgressData = await getFeedbackByStatus("in-progress");
  const liveData = await getFeedbackByStatus("live");

  return (
    <LayoutContainer>
      <div className="z-40 sticky top-0 md:top-10 lg:top-14">
        <RoadmapNav />
      </div>
      <div className="hidden gap-x-0 w-[95%] md:w-full md:grid md:grid-cols-3 md:gap-x-2.5 lg:gap-x-8 pt-8 h-[80vh] overflow-auto">
        <Suspense fallback={<StatusCardListSkeleton />}>
          <StatusCardList
            status={"planned"}
            description="ideas prioritized for research"
            feedbackList={plannedData}
          />
        </Suspense>
        <Suspense fallback={<StatusCardListSkeleton />}>
          <StatusCardList
            status={"in-progress"}
            description="currently being developed"
            feedbackList={inProgressData}
          />
        </Suspense>
        <Suspense fallback={<StatusCardListSkeleton />}>
          <StatusCardList
            status={"live"}
            description="Released features"
            feedbackList={liveData}
          />
        </Suspense>
      </div>
      <RoadmapTabs
        plannedData={plannedData}
        inProgressData={inProgressData}
        liveData={liveData}
      />
    </LayoutContainer>
  );
};

export default RoadmapPageContainer;
