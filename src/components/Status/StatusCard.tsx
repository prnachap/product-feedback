import clsx from "clsx";
import { gte, isEqual, lt } from "lodash";
import Link from "next/link";
import { FeedbackSummary } from "../../..";
import ArrowUpIcon from "../../../public/assets/shared/icon-arrow-up.svg";
import CommentIcon from "../../../public/assets/shared/icon-comments.svg";
import Chip from "../Chip/Chip";
import Status from "./Status";

type StatusCardProps = FeedbackSummary;

const StatusCard = ({
  _id,
  title,
  category,
  description,
  totalComments,
  totalVotes,
  status,
}: StatusCardProps) => {
  const borderClassNames = isEqual(status, "in-progress")
    ? "border-color-inprogress"
    : isEqual(status, "planned")
    ? "border-color-planned"
    : "border-color-live";

  return (
    <div className={`p-8 bg-white rounded-lg border-t-8 ${borderClassNames}`}>
      <Status name={status} />
      <div className="mt-2 mb-4">
        <Link href={`/feedback/${_id}`}>
          <h3 className="mb-1 text-american-blue-100 tertiary-text hover:text-indigo-1000 transition-all ease-in-out">
            {title}
          </h3>
        </Link>
        <p className="body-one-text">{description}</p>
      </div>
      <div className="mb-4">
        <Chip
          className={clsx({
            capitalize: gte(category?.length, 3),
            uppercase: lt(category?.length, 3),
          })}
        >
          {category}
        </Chip>
      </div>

      <div className="flex justify-between">
        <Chip
          className="gap-2 body-three-text flex-row items-center"
          disabled={true}
        >
          <ArrowUpIcon />
          <span>{totalVotes ?? 0}</span>
        </Chip>
        <div className="flex items-center gap-2 justify-self-end">
          <CommentIcon />
          <span className="font-semibold">{totalComments ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
