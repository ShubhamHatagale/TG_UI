import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Reflection from './Reflection';
import Discovery from './Discovery';
import Rebirth from './Rebirth';
import Validate from './Validate'
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';

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
    borderColor: "divider",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [validate, setvalidate] = useState(false)
  const [validateDiscovery, setvalidateDiscovery] = useState(false)
  const [validateRebirth, setvalidateRebirth] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // useEffect(()=>{
  //   var myGetHeaders = new Headers();
  //   myGetHeaders.append("Content-Type", "application/json");
  //   var requestOptions = {
  //                   method: "GET",
  //                   headers:myGetHeaders,           
  //                   redirect: "follow",
  //               };
  //               fetch(`http://localhost:9002/masters/rebirth/`+`${1}`, requestOptions)
  //                   .then((response) => response.json())
  //                   .then((resData) => {                       
  //                       let MyValues=resData.data;
  //                       MyValues.map((item,key)=>{    
  //                         if(item.submit_flag==1){
  //                           setvalidate(true); 
  //                           console.log("validate",item.submit_flag)                       
  //                         }                          
  //                       })
  //                     })
  // },[])

  const OnValidate = (e) => {
    setValue(3);
    setvalidate(e);
  }
  const OnValidateFirst = (e) => {
    setValue(1)
    setvalidateDiscovery(e);

  }
  const OnValidateSecond = (e) => {
    setValue(2)
    setvalidateRebirth(e);

  }
  return (

    <section class="content" style={{ backgroundColor: "white" }}>

      <div class="body_scroll">
        <div className="block-header">
          <div className="row">
            <div class="col-lg-7 col-md-6 col-sm-12 font-weight-normal">
              {/* <h3>Soch - Spiritual Foundation</h3><div className="col-lg-7 col-md-6 col-sm-12"> */}
              <h2>Soch - Spiritual Foundation</h2>
              

            {/* <div style={{ marginTop: 10 }}>
              </div> */}
            <button class="btn btn-primary btn-icon mobile_menu" type="button"><i class="zmdi zmdi-sort-amount-desc"></i></button>
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
        <Tabs value={value} textColor="primary" variant="standard" indicatorColor="primary" width={5} aria-label="primary tabs example" onChange={handleChange} >
          <Tab className="col-3 font-weight-bold" label="Reflection" {...a11yProps(0)} />
          {/*<Tab className="col-3 font-weight-bold" label="Discovery" {...a11yProps(1)} />
            <Tab className="col-3 font-weight-bold" label="Rebirth" {...a11yProps(2)} /> */}
          {validateDiscovery ? (<Tab label="Discovery" className="col-2 font-weight-bold" {...a11yProps(1)} />) : (<Tab label="Discovery" className="col-2 font-weight-bold" disabled {...a11yProps(1)} />)}

          {validateRebirth ? (<Tab label="Rebirth" className="col-2 font-weight-bold"  {...a11yProps(2)} />) : (<Tab label="Rebirth" className="col-2 font-weight-bold" disabled {...a11yProps(2)} />)}

          {validate ? (<Tab label="Validate" className="col-2 font-weight-bold"  {...a11yProps(3)} />) : (<Tab label="Validate" className="col-2 font-weight-bold" disabled {...a11yProps(3)} />)}
        </Tabs>
        {/* </AppBar> */}
        <TabPanel value={value} index={0}>
          <Reflection OnValidateFirst={OnValidateFirst} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Discovery OnValidateSecond={OnValidateSecond} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Rebirth Onvalidate={OnValidate} />
        </TabPanel>
        <TabPanel value={value} index={3} >
          <Validate />
        </TabPanel>
      </div>
    </div>
    </section >
  );
}
