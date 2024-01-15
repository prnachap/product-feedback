const StatusCardSkeleton = () => {
  return (
    <div className="p-8 rounded-lg border-t-8 bg-gray-200 loader-animation">
      <div className="flex gap-2">
        <div className="h-2 w-8 rounded-full bg-gray-200"></div>
        <div className="h-6 w-14 bg-gray-200"></div>
      </div>
      <div className="mt-2 mb-4">
        <div className="mb-1 h-7 w-60 bg-gray-200"></div>
        <p className="h-14 w-60 bg-gray-200"></p>
      </div>
      <div className="mb-4">
        <div className="h-8 w-20 bg-gray-200 rounded-md"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-8 w-16 bg-gray-200 rounded-md"></div>
        <div className="h-8 w-16 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default StatusCardSkeleton;
