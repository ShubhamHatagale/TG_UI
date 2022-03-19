import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Vilakshan from "./vilakshan";
import Dashboard from "./Dashboard";
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

export default function Parivartan5Tabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <section class="content" style={{backgroundColor:"white"}}>
      <div class="body_scroll">
        <div className="block-header">
          <div className="row">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>Vilakshan</h2>
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
        <Vilakshan />
        {/* <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Vilakshan" {...a11yProps(0)} />
              <Tab label="Dashboard" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Vilakshan />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Dashboard />
          </TabPanel>
        </div> */}
      </div>
    </section>
  );
}
