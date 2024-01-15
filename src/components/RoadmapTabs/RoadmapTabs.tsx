"use client";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { FeedbackSummary } from "../../..";
import StatusCardList from "../Status/StatusCardList";

const COLOR_TYPES: Record<string, string> = {
  "0": "#F49F85",
  "1": "#AD1FEA",
  "2": "#62BCFA",
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

type StyledTabsProps = {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
};

type StyledTabProps = {
  label: string;
};

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ value }) => ({
  "& .MuiTabs-flexContainer": {
    justifyContent: "space-between",
  },
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: "4px",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: COLOR_TYPES[value],
  },
}));

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))({
  textTransform: "capitalize",
  fontWeight: 700,
  fontSize: "0.8125rem",
  fontFamily: "jost",
  color: "rgba(58, 67, 116, .4)",
  "&.Mui-selected": {
    color: "#3A4374",
  },
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const RoadmapTabs = ({
  plannedData,
  inProgressData,
  liveData,
}: {
  plannedData: FeedbackSummary[];
  inProgressData: FeedbackSummary[];
  liveData: FeedbackSummary[];
}) => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="md:hidden">
      <div className="sticky top-[80px] z-50 border-b-2 border-[#8C92B3]border-opacity-5">
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab label="planned" />
          <StyledTab label="in-progress" />
          <StyledTab label="live" />
        </StyledTabs>
      </div>
      <div className="px-3 relative h-[70vh] overflow-auto z-10">
        <div className="py-6">
          <TabPanel value={value} index={0}>
            <StatusCardList
              status={"planned"}
              description="ideas prioritized for research"
              feedbackList={plannedData}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <StatusCardList
              status={"in-progress"}
              description="currently being developed"
              feedbackList={inProgressData}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <StatusCardList
              status={"live"}
              description="Released features"
              feedbackList={liveData}
            />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default RoadmapTabs;
