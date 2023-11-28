import React from "react";
import CommentIcon from "../../../public/assets/shared/icon-comments.svg";
import Chip from "../Chip/Chip";
import CustomCard from "../UI/CustomCard";
import { shimmer } from "@/constants";

const FeedbackCardSkeleton: React.FC = () => {
  return (
    <CustomCard
      className={`loader-animation mb-4 last:mb-0 grid grid-cols-[3fr,1fr] md:grid-cols-[50px_3fr_100px] items-center gap-4 md:gap-10`}
    >
      <Chip className="gap-2 body-three-text md:flex-col justify-center items-center self-start justify-self-start md:justify-self-auto h-10 w-2 bg-gray-200"></Chip>
      <div className="flex flex-col col-span-full row-span-full  md:col-auto md:row-auto justify-center items-start gap-1">
        <div className="w-32 h-4 bg-gray-200 rounded-md"></div>
        <p className="w-52 h-8 bg-gray-200 rounded-md"></p>
        <div className="w-10 h-4 rounded-md bg-gray-200"></div>
      </div>
      <div className="flex items-center gap-2 justify-self-end">
        <CommentIcon />
        <div className="w-4 h-4 bg-gray-200 rounded-md"></div>
      </div>
    </CustomCard>
  );
};

export default FeedbackCardSkeleton;
