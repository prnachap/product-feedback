"use client";

import CustomCard from "../UI/CustomCard";

const CommentBoxSkeleton = () => {
  return (
    <CustomCard className="loader-animation">
      <div className="w-full flex flex-col">
        <div className="w-80 h-5 rounded-md bg-gray-200 mb-4"></div>
        <div className="w-full h-36 rounded-md bg-gray-200"></div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="w-28 h-6 rounded-md bg-gray-200"></p>
        <div className="w-24 h-5 rounded-md bg-gray-200"></div>
      </div>
    </CustomCard>
  );
};

export default CommentBoxSkeleton;
