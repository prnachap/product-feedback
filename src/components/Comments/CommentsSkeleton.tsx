"use client";

import CustomCard from "../UI/CustomCard";

const CommentsSkeleton = () => {
  return (
    <CustomCard className="loader-animation flex flex-col gap-6 md:gap-8">
      <div className="grid grid-cols-[40px,2fr,1fr] gap-4 items-start md:gap-x-8 md:gap-y-4">
        <div>
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        </div>
        <div>
          <div className="h-5 w-40 rounded-md bg-gray-200 mb-2"></div>
          <div className="h-5 w-40 rounded-md bg-gray-200"></div>
        </div>
        <div className="h-5 w-9 rounded-md bg-gray-200 justify-self-end"></div>
        <div className="md:col-start-2 col-span-full">
          <div className="w-full h-28 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </CustomCard>
  );
};

export default CommentsSkeleton;
