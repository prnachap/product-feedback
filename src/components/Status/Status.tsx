import { isEqual, isUndefined } from "lodash";

type StatusProps = {
  name: "planned" | "in-progress" | "live";
  count?: number;
  children?: React.ReactNode;
};

const Status: React.FC<StatusProps> = ({ name, count }) => {
  const bgColor = isEqual(name, "in-progress")
    ? "bg-purple-1000"
    : isEqual(name, "planned")
    ? "bg-vivid-tangerine"
    : "bg-maya-blue";
  return (
    <div className="flex justify-between w-full body-one-text text-dark-blue-gray capitalize">
      <div className="flex gap-4 justify-center items-center">
        <div className={`h-2 w-2 rounded-full ${bgColor}`}></div>
        <div>{name}</div>
      </div>
      {!isUndefined(count) && (
        <div className="font-bold text">{count ?? 0}</div>
      )}
    </div>
  );
};

export default Status;
