import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import { dummyDataOne, dummyDataThree, dummyDataTwo } from "../../constants";
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
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

const RoadmapTabs = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box className="md:hidden">
      <Box className="sticky top-[80px] z-50 border-b-2 border-[#8C92B3]border-opacity-5">
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <StyledTab label="planned" />
          <StyledTab label="in-progress" />
          <StyledTab label="live" />
        </StyledTabs>
      </Box>
      <Box className="px-3 relative h-[70vh] overflow-auto z-10">
        <Box className="py-6">
          <TabPanel value={value} index={0}>
            <StatusCardList feedbackList={dummyDataOne} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <StatusCardList feedbackList={dummyDataTwo} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <StatusCardList feedbackList={dummyDataThree} />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default RoadmapTabs;
