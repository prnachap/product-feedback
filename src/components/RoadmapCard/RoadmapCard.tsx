import Link from "next/link";
import { status } from "../../constants";
import Status from "../Status/Status";
import CustomCard from "../UI/CustomCard";

const RoadmapCard: React.FC = () => {
  const renderStatus = () => {
    return status.map((status) => (
      <Status key={status} name={status} count={1} />
    ));
  };

  return (
    <CustomCard className="flex flex-col gap-6 !px-6 !pt-[19px] !pb-6 w-[15.9375rem] max-w-[15.9375rem]">
      <div className="flex justify-between items-center">
        <h3 className="tertiary-text text-american-blue-100">Roadmap</h3>
        <Link
          href="/roadmap"
          className="body-three-text underline text-indigo-1000"
        >
          View
        </Link>
      </div>
      <div className="flex flex-col items-start capitalize">
        {renderStatus()}
      </div>
    </CustomCard>
  );
};

export default RoadmapCard;
