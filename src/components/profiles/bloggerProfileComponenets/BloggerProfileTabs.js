import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import BloggerBlogTab from './BloggerBlogTab'
import BloggerRecipeTab from './BloggerRecipeTab';
import BloggerSavedTab from './BloggerSavedTab';

import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

function TabPanel(props) {
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
        <Box sx={{ }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static" sx={{ bgcolor: "white", boxShadow: "none" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab icon={<AutoStoriesIcon />} label="BLOGS" {...a11yProps(0)} />
          <Tab icon={<RestaurantMenuIcon />}  label="RECİPES" {...a11yProps(1)} />
          <Tab icon={<LoyaltyIcon />} label="SAVED" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        className=" h-screen w-full px-1"
        style={{ scrollbarWidth:"thin" }}
      >
       <TabPanel value={value} index={0} dir={theme.direction}>
          <BloggerBlogTab />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <BloggerRecipeTab  />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <BloggerSavedTab/>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

