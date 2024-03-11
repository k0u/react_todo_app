import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TaskList from "./TaskList";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ width: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
                style: {
                  backgroundColor: 'rgb(176, 196, 222)',
                  height: '10px'
                }
              }}
          >
            <Tab label="TODO" {...a11yProps(0)} />
            <Tab label="DONE" {...a11yProps(1)} />
          </Tabs>
      </Box>
      
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TaskList completed={false} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TaskList completed={true} />
        </TabPanel>
      
    </Box>
  );
}
