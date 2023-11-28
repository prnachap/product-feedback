import { status } from "../../constants";
import StatusSkeleton from "../Status/StatusSkeleton";
import CustomCard from "../UI/CustomCard";

const RoadmapCardSkeleton: React.FC = () => {
  const renderStatus = () => {
    return status.map((status) => <StatusSkeleton key={status} />);
  };

  return (
    <CustomCard
      className={`flex flex-col gap-6 !px-6 !pt-[19px] !pb-6 w-[15.9375rem] max-w-[15.9375rem] loader-animation 
    `}
    >
      <div className="flex justify-between items-center">
        <div className="h-5 w-10 bg-gray-200 rounded-md"></div>
        <div className="h-5 w-5 bg-gray-200 rounded-md"></div>
      </div>
      <div className="flex flex-col items-start capitalize gap-2">
        {renderStatus()}
      </div>
    </CustomCard>
  );
};

export default RoadmapCardSkeleton;
