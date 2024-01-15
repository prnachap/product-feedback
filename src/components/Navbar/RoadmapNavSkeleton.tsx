const RoadmapNavSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-between px-3 gap-2 min-h-[5rem] max-h-[5rem] bg-gray-200 md:p-6 md:rounded-lg loader-animation">
      <div className="flex flex-col items-start gap-1">
        <div className="h-5 w-5 bg-gray-200 rounded-md"></div>
        <div className="h-5 w-10 bg-gray-200 rounded-md"></div>
      </div>
      <div>
        <div className="h-10 w-20 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default RoadmapNavSkeleton;
