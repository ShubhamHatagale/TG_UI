import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomerSegmentation from "../BuisnessModel/customerSegment";
import Plyground from "../BuisnessModel/plyground"
import ValueProposition from "../BuisnessModel/valueProposition"
import CompetitionSheet from "./compettionSheet"
import StategyMap from "../BuisnessModel/strategyMap"
import FinalizeCompetition from "../BuisnessModel/finalizeCompetition"

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [validate, setvalidate] = useState(false)
  const [validateTab1, setvalidateTab1] = useState(false)
  const [validateTab2, setvalidateTab2] = useState(false)
  const [validateTab3, setvalidateTab3] = useState(false)
  const [validateTab4, setvalidateTab4] = useState(false)

  const [Strategyvalidate, setStrategyvalidate] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const OnValidate = (e) => {
    setValue(3);
    setvalidate(e);
  }
  const OnValidateStrategy = (e) => {
    setValue(5);
    setStrategyvalidate(e);
  }

  const OnValidateTab1 = (e) => {
    // alert("hi shubh")

    setValue(1);
    setvalidateTab1(e);
  }
  const OnValidateTab2 = (e) => {
    setValue(2);
    setvalidateTab2(e);
  }
  const OnValidateTab3 = (e) => {
    setValue(3);
    setvalidateTab3(e);
  }
  const OnValidateTab4 = (e) => {
    setValue(4);
    setvalidateTab4(e);
  }
  return (
    <section class="content" style={{ backgroundColor: "white" }}>

      <div class="body_scroll">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Value Proposition</h2>
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
        <div className={classes.root}>
          {/* <AppBar position="static"> */}
          <Tabs value={value} textColor="primary" variant="standard" indicatorColor="primary" width={5} aria-label="primary tabs example" onChange={handleChange} >
            <Tab className="col-3 font-weight-bold" label="Customer Segmentation" {...a11yProps(0)} />
            {/* <Tab label="Playground Business Model" {...a11yProps(1)} /> */}
            {/* <Tab label="Value Proposition" {...a11yProps(2)} /> */}
            {/* <Tab label="Competition Sheet" {...a11yProps(3)} />
              <Tab label="Strategy Map" {...a11yProps(4)} /> */}
            {/* {validateTab1 ? (<Tab label="Customer Segmentation" {...a11yProps(0)} />) : (<Tab label="Customer Segmentation" disabled {...a11yProps(0)} />)} */}
            {validateTab1 ? (<Tab label="Playground Business Model" className="ml-2 font-weight-bold" {...a11yProps(1)} />) : (<Tab label="Playground Business Model" disabled className="ml-2 font-weight-bold" {...a11yProps(1)} />)}
            {validateTab2 ? (<Tab label="Value Proposition" className="ml-2 font-weight-bold" {...a11yProps(2)} />) : (<Tab label="Value Proposition" disabled className="ml-2 font-weight-bold" {...a11yProps(2)} />)}

            {validateTab3 ? (<Tab label="Competition Sheet" className="ml-2 font-weight-bold" {...a11yProps(3)} />) : (<Tab label="Competition Sheet" disabled className="ml-2 font-weight-bold" {...a11yProps(3)} />)}
            {validateTab4 ? (<Tab label="Finalize Competition Sheet" className="ml-2 font-weight-bold" {...a11yProps(4)} />) : (<Tab label="Finalize Competition Sheet" disabled className="ml-2 font-weight-bold" {...a11yProps(4)} />)}

            {Strategyvalidate ? (<Tab label="Strategy Map" className="ml-2 font-weight-bold" {...a11yProps(5)} />) : (<Tab label="Strategy Map" disabled className="ml-2 font-weight-bold" {...a11yProps(5)} />)}

          </Tabs>
          {/* </AppBar> */}
          <TabPanel value={value} index={0}>
            <CustomerSegmentation OnValidateTab1={OnValidateTab1} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Plyground OnValidateTab2={OnValidateTab2} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ValueProposition OnValidateTab3={OnValidateTab3} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CompetitionSheet OnValidateTab4={OnValidateTab4} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <FinalizeCompetition OnValidateStrategy={OnValidateStrategy} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <StategyMap />
          </TabPanel>
        </div>
      </div>
    </section>
  );
}
