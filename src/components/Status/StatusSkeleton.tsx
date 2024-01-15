const StatusSkeleton = () => {
  return (
    <div className="flex justify-between w-full body-one-text text-dark-blue-gray capitalize">
      <div className="flex gap-4 justify-center items-center">
        <div className={`h-2 w-2 rounded-full bg-gray-200`}></div>
        <div className="h-4 w-10 rounded-md bg-gray-200"></div>
      </div>
      <div className="h-2 w-4 rounded-md bg-gray-200"></div>
    </div>
  );
};

export default StatusSkeleton;
