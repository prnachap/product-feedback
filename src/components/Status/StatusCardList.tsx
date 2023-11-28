import { Box, Typography } from "@mui/material";
import React from "react";
import { FeedbackType } from "../..";
import StatusCard from "./StatusCard";

type StatusCardListProps = {
  feedbackList: FeedbackType[];
};
const StatusCardList: React.FC<StatusCardListProps> = ({ feedbackList }) => {
  const renderFeedbackList = () => {
    return feedbackList.map((feedback, index) => {
      return <StatusCard key={`${feedback.title}-${index}`} {...feedback} />;
    });
  };

  return (
    <Box>
      <Box className="mb-6 md:mb-8">
        <Typography
          variant="h3"
          className="text-american-blue-100 !tertiary-text"
        >
          Planned (2)
        </Typography>
        <Typography variant="body1" className="body-text">
          Ideas prioritized for research
        </Typography>
      </Box>
      <Box className="flex flex-col gap-4 md:gap-6">{renderFeedbackList()}</Box>
    </Box>
  );
};

export default StatusCardList;
