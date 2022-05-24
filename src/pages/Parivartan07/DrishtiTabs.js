import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import StepProcessTable from "./DrishtiCal";
import DrishtiCal from "./DrishtiCal";
import FinancialYear from "./FinancialYear";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";

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
    var history = useHistory();
    var s_id = localStorage.getItem('tr_id')

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    let [completeData, setcompleteData] = useState("");
    const [Madd, setMadd] = useState(false);
    const [validate, setvalidate] = useState(false)

    const [validateTab1, setvalidateTab1] = React.useState(false);
    const [validateTab2, setvalidateTab2] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const OnValidate = (e) => {
        setValue(1);
        setvalidate(e);
    }

    const OnValidate1 = (e) => {
        setValue(2);
        setvalidateTab1(e);
    }

    const OnValidate2 = (e) => {
        setValue(3);
        setvalidateTab2(e);
    }

    useEffect(() => {
        if (!s_id) {
            history.push("Not_support");
        }

        getDataOff();
    }, []);

    const getDataOff = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptionsget = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(`https://parivartan.transganization.com/nodejs/masters/vilakshanMapTab2/user/${s_id}`, requestOptionsget)
            .then((response) => response.json())
            .then((resData) => {
                console.log(resData.data);
                setcompleteData(resData.data);
                if (resData.status == 200) {
                    console.log("Data Added succesfully");
                    // setValue(1);
                    // setvalidate(e);
                }
            })
            .catch((error) => console.log("error", error));
    }
    return (
        <section class="content" style={{ backgroundColor: "white" }}>

            <div class="body_scroll">
                <div className="block-header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-12">
                            <h2>Vilakshan Map & Process</h2>
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
                    <Tabs value={value} onChange={handleChange} textColor="primary" variant="standard" indicatorColor="primary" width={5} aria-label="primary tabs example" >
                        <Tab label="Drishti Calculator" className="col-2 font-weight-bold" {...a11yProps(0)} />
                        {/* <Tab label="Vilakshan Journey " className="col-2 font-weight-bold" {...a11yProps(1)} /> */}
                        {/* {validateTab1 ? (<Tab label="Month On Month Calculator Of Financial Year" className="col-2 font-weight-bold" {...a11yProps(1)} />) : <Tab label="Month On Month Calculator Of Financial Year " disabled className="col-2 font-weight-bold" {...a11yProps(1)} />} */}
                        {/* {validateTab2 ? (<Tab label="Step By Step Process" className="col-2 font-weight-bold" {...a11yProps(2)} />) : <Tab label="Step By Step Process" disabled className="col-2 font-weight-bold" {...a11yProps(2)} />} */}
                        <Tab label="Month On Month Calculator Of Financial Year" className="col-2 font-weight-bold" {...a11yProps(1)} />
                        {/* <Tab label="Month On Month Calculator Of Financial Year" className="col-2 font-weight-bold" {...a11yProps(1)} /> */}
                        {/* {completeData.length > 0 ? (<Tab label="Step By Step Process" className="col-2 font-weight-bold" {...a11yProps(2)} />
            ) : null} */}



                        {/* {validate ? (<Tab label="Step By Step Process Table" className="col-3 font-weight-bold" {...a11yProps(1)} />) : (<Tab label="Step By Step Process Table" disabled className="col-3 font-weight-bold" {...a11yProps(1)} />)} */}


                    </Tabs>
                    {/* </AppBar> */}
                    <TabPanel value={value} index={0}>
                        <DrishtiCal OnValidate={OnValidate} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FinancialYear OnValidate1={OnValidate1} />
                    </TabPanel>
                    {/* <TabPanel value={value} index={2}>
                        <StepProcessTable OnValidate2={OnValidate2} />
                    </TabPanel> */}
                </div>
            </div>
        </section>
    );
}
