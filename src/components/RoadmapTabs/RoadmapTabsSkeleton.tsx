import StatusCardListSkeleton from "../Status/StatusCardListSkeleton";

const RoadmapTabsSkeleton = () => {
  return (
    <div className="md:hidden loader-animation ">
      <div className="sticky top-[80px] z-50 border-b-2 border-[#8C92B3]border-opacity-5">
        <div className="h-10 w-80 bg-gray-200 rounded-sm" />
        <div className="h-10 w-80 bg-gray-200 rounded-sm" />
        <div className="h-10 w-80 bg-gray-200 rounded-sm" />
      </div>
      <div className="px-3 relative h-[70vh] overflow-auto z-10">
        <div className="py-6">
          <StatusCardListSkeleton />
        </div>
      </div>
    </div>
  );
};

export default RoadmapTabsSkeleton;
