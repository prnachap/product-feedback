import React from "react";
import RoadmapNav from "../Navbar/RoadmapNav";
import StatusCardList from "../Status/StatusCardList";
import RoadmapTabs from "../RoadmapTabs/RoadmapTabs";
import { dummyDataOne, dummyDataThree, dummyDataTwo } from "../../constants";
import Box from "@mui/material/Box";
import LayoutContainer from "../UI/LayoutContainer";

const RoadmapPageContainer: React.FC = () => {
  return (
    <LayoutContainer>
      <Box className="z-40 sticky top-0 md:top-10 lg:top-14">
        <RoadmapNav />
      </Box>
      <Box className="hidden gap-x-0 w-[95%] md:w-full md:grid md:grid-cols-3 md:gap-x-2.5 lg:gap-x-8 pt-8 h-[80vh] overflow-auto">
        <StatusCardList feedbackList={dummyDataOne} />
        <StatusCardList feedbackList={dummyDataTwo} />
        <StatusCardList feedbackList={dummyDataThree} />
      </Box>
      <RoadmapTabs />
    </LayoutContainer>
  );
};

export default RoadmapPageContainer;
