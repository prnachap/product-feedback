import RoadmapNavSkeleton from "@/components/Navbar/RoadmapNavSkeleton";
import RoadmapTabsSkeleton from "@/components/RoadmapTabs/RoadmapTabsSkeleton";
import StatusCardListSkeleton from "@/components/Status/StatusCardListSkeleton";
import LayoutContainer from "@/components/UI/LayoutContainer";

const loading = () => {
  return (
    <LayoutContainer>
      <div className="z-40 sticky top-0 md:top-10 lg:top-14 w-full">
        <RoadmapNavSkeleton />
      </div>
      <div className="hidden gap-x-0 w-[95%] md:w-full md:grid md:grid-cols-3 md:gap-x-2.5 lg:gap-x-8 pt-8 h-[80vh] overflow-auto">
        <StatusCardListSkeleton />
        <StatusCardListSkeleton />
        <StatusCardListSkeleton />
      </div>
      <RoadmapTabsSkeleton />
    </LayoutContainer>
  );
};

export default loading;
