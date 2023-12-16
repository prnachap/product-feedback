import { addLikes } from "@/lib/actions";
import clsx from "clsx";
import { gte, lte } from "lodash";
import Link from "next/link";
import React from "react";
import { FeedbackSummary } from "../../..";
import ArrowUpIcon from "../../../public/assets/shared/icon-arrow-up.svg";
import CommentIcon from "../../../public/assets/shared/icon-comments.svg";
import Chip from "../Chip/Chip";
import CustomCard from "../UI/CustomCard";

const FeedbackCard: React.FC<FeedbackSummary> = ({
  _id,
  title,
  description,
  category,
  totalVotes,
  totalComments,
}) => {
  const feedbackHref = `/feedback/${_id}`;
  const updateVotesWithFeedbackId = addLikes.bind(null, _id);

  return (
    <CustomCard className="relative mb-4 last:mb-0 grid grid-cols-[3fr,1fr] md:grid-cols-[50px_3fr_100px] items-center gap-4 md:gap-10">
      <form action={updateVotesWithFeedbackId}>
        <Chip className="gap-2 body-three-text md:flex-col justify-center items-center self-start justify-self-start md:justify-self-auto">
          <ArrowUpIcon className="md:mt-1 [&>path]:!stroke-current transition-all duration-75 ease-in" />
          <span>{totalVotes}</span>
        </Chip>
      </form>
      <div className="flex flex-col col-span-full row-span-full  md:col-auto md:row-auto justify-center items-start gap-1">
        <Link href={feedbackHref}>
          <h3 className="tertiary-text first-letter:capitalize text-american-blue-100 hover:text-indigo-1000 transition-all ease-in-out cursor-pointer">
            {title}
          </h3>
        </Link>
        <p className="body-text">{description}</p>
        <Chip
          className={clsx("mt-2 pointer-events-none", {
            capitalize: gte(category?.length, 3),
            uppercase: lte(category?.length, 2),
          })}
        >
          {category}
        </Chip>
      </div>
      <div className="flex items-center gap-2 justify-self-end">
        <CommentIcon />
        <span className="font-semibold">{totalComments}</span>
      </div>
    </CustomCard>
  );
};

export default FeedbackCard;
