import { Box, Typography } from "@mui/material";
import { isEmpty, isEqual } from "lodash";
import React from "react";
import { FeedbackType } from "../..";
import ArrowUpIcon from "../../public/assets/shared/icon-arrow-up.svg";
import CommentIcon from "../../public/assets/shared/icon-comments.svg";
import Chip from "../Chip/Chip";
import Status from "./Status";

type StatusCardProps = FeedbackType;

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  category,
  description,
  upVotes,
  comments,
  status,
}) => {
  const borderClassNames = isEqual(status, "in-progress")
    ? "border-color-inprogress"
    : isEqual(status, "planned")
    ? "border-color-planned"
    : "border-color-live";

  const totalComments = isEmpty(comments) ? 0 : comments.length;

  return (
    <Box className={`p-8 bg-white rounded-lg border-t-8 ${borderClassNames}`}>
      <Status name={status} />
      <Box className="mt-2 mb-4">
        <Typography
          variant="h3"
          className="mb-1 text-american-blue-100 tertiary-text hover:text-indigo-1000 transition-all ease-in-out"
        >
          {title}
        </Typography>
        <Typography variant="body1" className="body-one-text">
          {description}
        </Typography>
      </Box>
      <Box className="mb-4">
        <Chip>{category}</Chip>
      </Box>

      <Box className="flex justify-between">
        <Chip className="gap-2 body-three-text flex-row items-center">
          <ArrowUpIcon />
          <span>{upVotes}</span>
        </Chip>
        <Box className="flex items-center gap-2 justify-self-end">
          <CommentIcon />
          <span className="font-semibold">{totalComments}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default StatusCard;
