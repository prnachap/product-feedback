import Link from "next/link";
import { RoadMapStatsType } from "../../..";
import { APP_ROUTES } from "../../constants";
import Status from "../Status/Status";
import CustomCard from "../UI/CustomCard";

const RoadmapCard = async ({ status }: { status: RoadMapStatsType[] }) => {
  const renderStatus = () => {
    return status?.map((status) => (
      <Status key={status._id} name={status._id} count={status.count} />
    ));
  };

  return (
    <CustomCard className="flex flex-col gap-6 !px-6 !pt-[19px] !pb-6 w-[15.9375rem] max-w-[15.9375rem]">
      <div className="flex justify-between items-center">
        <h3 className="tertiary-text text-american-blue-100">Roadmap</h3>
        <Link
          href={APP_ROUTES.ROADMAP}
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
