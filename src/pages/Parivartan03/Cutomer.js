import React, { useEffect, useState } from "react";
import Tab1 from "../Parivartan03/CustomerTable";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import CustomeTabs from './tabs';
import Tab2Table from "./tab2table"
import Protected_Ui from "../Protected_Ui";
// import SideBar from "./SideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Form() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tab1Validate, settab1Validate] = useState(false);
  const [tab2Validate, settab2Validate] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const OnValidateTab1 = (e) => {
    setValue(1);
    settab1Validate(e);
  }
  const OnValidateTab2 = (e) => {
    setValue(2);
    settab2Validate(e);
  }

  return (
    <section class="content" style={{ backgroundColor: "white" }}>
      {/* <SideBar /> */}

      <div class="body_scroll">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Customer Mind Map </h2>
              <button
                className="btn btn-primary btn-icon mobile_menu"
                type="button"
              >
                <i className="zmdi zmdi-sort-amount-desc"></i>
              </button>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12">
               {/* <button
                className="btn btn-primary btn-icon float-right right_icon_toggle_btn"
                type="button"
              >
                <i className="zmdi zmdi-arrow-right"></i>
              </button> */}
            </div>
          </div>
        </div>
        <div className={classes.root} style={{ color: "#60C0C9" }}>

          {/* <AppBar position="static"> */}
          <Tabs
            value={value}
            textColor="primary" variant="standard" indicatorColor="primary" width={5} aria-label="primary tabs example"
            onChange={handleChange}
          >
            <Tab label="Tab 1"  {...a11yProps(0)} />
            {/* <Tab label="Tab 2" {...a11yProps(1)} /> */}
            {tab1Validate ? (<Tab label="Tab 2" className="col-2 font-weight-bold" {...a11yProps(1)} />) : (<Tab label="Tab 2" disabled className="col-2 font-weight-bold" {...a11yProps(1)} />)}
            {tab2Validate ? (<Tab label="Tab 3" className="col-2 font-weight-bold" {...a11yProps(2)} />) : (<Tab label="Tab 3" disabled className="col-2 font-weight-bold" {...a11yProps(2)} />)}

            {/* <Tab label="Tab 3" {...a11yProps(2)} /> */}
          </Tabs>
          {/* </AppBar> */}
          <TabPanel value={value} index={0}  >
            <Tab1 OnValidateTab1={OnValidateTab1} />
          </TabPanel>
          <TabPanel value={value} index={1} >
            <Tab2Table OnValidateTab2={OnValidateTab2} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CustomeTabs />
          </TabPanel>
        </div>
      </div>
    </section>
  );
}
