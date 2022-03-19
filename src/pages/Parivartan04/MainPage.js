import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Plyground from "../Parivartan04/busiPlayground";
import NonNegotiables from "../Parivartan04/NonNegotiables";
import UrjaCharitra from "../Parivartan04/UrjaChar";
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
  const [validateTab1, setvalidateTab1] = React.useState(false);
  const [validateTab2, setvalidateTab2] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onvalidateTab1 = () => {
    setValue(1);
    setvalidateTab1(true);
    setvalidateTab2(true);

  }
  const onvalidateTab2 = () => {
    setValue(2);
    setvalidateTab2(true);
  }

  return (
    <section class="content" style={{backgroundColor:"white"}}>
      <div class="body_scroll">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Playground</h2>
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
            <Tabs value={value} onChange={handleChange} textColor="primary" variant="standard" indicatorColor="primary" width={5} aria-label="primary tabs example">
              <Tab className="col-3 font-weight-bold" label="Playground Business Model" {...a11yProps(0)} />
              {/* <Tab label="Urja Charitra" {...a11yProps(1)} />
              <Tab label="Non Negotiables" {...a11yProps(2)} /> */}
              {/* <Tab label="Non Negotiables" {...a11yProps(2)} /> */}
              {/* {validateTab1 ? (<Tab label="Playground Business Model" {...a11yProps(0)} />) : (<Tab label="Playground Business Model" disabled {...a11yProps(0)} />)} */}
             
              {validateTab1 ? (<Tab label="Urja Charitra" className="col-2 font-weight-bold" {...a11yProps(1)} />) : (<Tab label="Urja Charitra" disabled className="col-2 font-weight-bold" {...a11yProps(1)} />)}

              {validateTab2 ? (<Tab label="Non Negotiables" className="col-2 font-weight-bold" {...a11yProps(2)} />) : (<Tab label="Non Negotiables" disabled className="col-2 font-weight-bold" {...a11yProps(2)} />)}


            </Tabs>
          {/* </AppBar> */}
          <TabPanel value={value} index={0}>
            <Plyground onvalidateTab1={onvalidateTab1} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UrjaCharitra onvalidateTab2={onvalidateTab2} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <NonNegotiables />
          </TabPanel>
        </div>
      </div>
    </section>
  );
}
